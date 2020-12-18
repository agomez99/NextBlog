import { useEffect, useState } from 'react';
import fire from '../../config/fire-config';
import Link from 'next/link'
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import SocialFollow from '../../SocialFollow'
import 'bootstrap/dist/css/bootstrap.min.css';
import Disqus from '../../components/Disqus';
import {
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

  useEffect(() => {
    fire.firestore()
      .collection('blog')
      .doc(props.id)
      .get()
      .then(result => {
        setBlog(result.data())
      })
  }, []);
  if (!blog) {
    return (
      <div >
      <h2 style={{textAlign:"center", marginTop:"25%"}}>Loading...</h2>
      </div>
    )
  }
  const shareButtonProps = {
    url: "https://github.com/greglobinski/react-custom-share",
    network: "Facebook",
    text: "Give it a try - react-custom-share component",
    longtext:
      "Social sharing buttons for React. Use one of the build-in themes or create a custom one from the scratch."
  };

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
      <img src={blog.image} className="center" style={{height:"300px", }}/>
      <p>
        {blog.content}
      </p>
      <Link href="/">
        <a>Back</a>
      </Link>
</Col>
      </Row>

      <Col className="comment" xl={5}>
      <div className="share-btn"{...shareButtonProps} >
        <label>Share</label>{""}
      <EmailShareButton key={"email"} className={"btn"} >
        <EmailIcon round size={50} />
      </EmailShareButton>
      <FacebookShareButton  key={"fb"} className={"btn"} url="#">
        <FacebookIcon round size={50} />
      </FacebookShareButton>
      <LinkedinShareButton key={"linked"} className={"btn"} url="#">
        <LinkedinIcon round size={50} />
      </LinkedinShareButton>
      <TwitterShareButton key={"twitter"} className={"btn"} url="#">
        <TwitterIcon round size={50} />
      </TwitterShareButton>
      <RedditShareButton key={"reddit"} className={"btn"}url="#">
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