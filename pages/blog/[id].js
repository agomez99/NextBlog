import { useEffect, useState } from 'react';
import fire from '../../config/fire-config';
import Link from 'next/link'
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import SocialFollow from '../../SocialFollow'
import 'bootstrap/dist/css/bootstrap.min.css';
import Disqus from '../../components/Disqus';
import { useRouter } from 'next/router'
import Image from 'next/image'

import {
  FacebookShareCount,
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  RedditShareButton,
  RedditIcon,
  TwitterIcon,
  LinkedinIcon,
  TwitterShareButton,
} from "react-share";
const Blog = (props) => {

  const [blog, setBlog] = useState(null);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');

  
  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
  const handleLogout = () => {
    fire.auth()
      .signOut()
      .then(() => {
        setNotification('Logged out')
        setTimeout(() => {
          setNotification('')
        }, 2000)
      });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    fire.firestore()
      .collection('blog')
      .add({
        title: title,
        content: content,
        image:image,
        date:date,
      });
    setTitle('');
    setContent('');
    setImage('');
    setDate('');
    setNotification('Blogpost changed');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }

  useEffect(() => {
    fire.firestore()
      .collection('blog')
      .doc(props.id)
      .get()
      .then(result => {
        setBlog(result.data())  
      })
      console.log(props.id)
  }, []);
  if (!blog) {
    return (
      <div >
      <h2 style={{fontSize:"1rem" , fontFamily:"sans-serif", textAlign:"center", marginTop:"25%"}}>Loading...</h2>
      </div>
    )
  }

  const router = useRouter()
  const {
    query: { id },
  } = router

  const shareButtonProps = {

    url:'https://agblog.vercel.app/blog/'+props.id,
    description: "My Blog As A Developer",
    title: "My Journey As A Web Developer.",
    image:"icon.png"
      
  };
  console.log(shareButtonProps);

  return (

    <div>
      <Navbar expand="lg" variant="light" bg="light">
        <Navbar.Brand href="/">Blog</Navbar.Brand>
        <Container className="d-flex flex-row-reverse">
          <SocialFollow />
        </Container>
        <div bg="grey-light" text="center" p="4" rounded="none">
          {notification}
          {!loggedIn
            ?
            <div>
              {/* <Link href="/users/register">
                    <a>Register</a>
                  </Link> |  */}
              <Link href="/users/login">
                <a style={{ float: "left" }}> Login</a>
              </Link>
            </div>
            :
            <button onClick={handleLogout}>Logout</button>
          }
        </div>
      </Navbar>



<Row>
<Col className="feature">
      <h2 style={{textAlign:"center"}}>{blog.title}</h2>
      <h2 style={{textAlign:"center"}}>{blog.date}</h2>
      <img src={blog.image} className="center" style={{height:"300px", }}/>
      <p className="blog-content-main">
        {blog.content}
      </p>

      {loggedIn
      ?
      <form onSubmit={handleSubmit}>
        <div>
          Title<br />
          <input type="text" value={blog.title} 
           onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          Date<br />
          <input type="text" value={blog.date} 
           onChange={({target}) => setDate(target.value)} />
        </div>
        <div>
          Content<br />
          <textarea value={blog.content} 
           onChange={({target}) => setContent(target.value)} />
        </div>
        <div>
         Image Url<br />
          <input type="text" value={blog.image} 
           onChange={({target}) => setImage(target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
      :
      <>
      </>
      }
      
      <Link href="/">
        <a>Back</a>
      </Link>
     </Col>
      </Row>

      <Col className="comment" xl={5}>
      <div className="share-btn"{...shareButtonProps} >
        <label>Share</label>{""}
      <EmailShareButton key={"email"} className={"btn"}  url={window.location.href} text={shareButtonProps.text} media={shareButtonProps.media} title={title}>
        <EmailIcon round size={50} />
      </EmailShareButton>
      <FacebookShareButton  key={"fb"} className={"btn"}   url={shareButtonProps.url} quote={shareButtonProps.description} title={shareButtonProps.title}  image={shareButtonProps.image}   windowWidth={660} windowHeight={700} >
        <FacebookIcon round size={50} />
      </FacebookShareButton>
      <FacebookShareCount url={shareButtonProps.url} >
      {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
            </FacebookShareCount>

      <LinkedinShareButton key={"linked"} className={"btn"} url={shareButtonProps.url} title={title}>
        <LinkedinIcon round size={50} />
      </LinkedinShareButton>
      <TwitterShareButton key={"twitter"} className={"btn"} title={shareButtonProps.title} url={shareButtonProps.url}  >
        <TwitterIcon round size={50} />
      </TwitterShareButton>
      <RedditShareButton key={"reddit"} className={"btn"} url={shareButtonProps.url}>
        <RedditIcon round size={50} />
      </RedditShareButton>
      </div>
      <Disqus />
</Col>
    </div>
  )
}
Blog.getInitialProps = ({ query }) => {
  return {
    id: query.id,
  }
}
export default Blog