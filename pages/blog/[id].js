import { useEffect, useState } from 'react';
import Head from 'next/head';
import fire from '../../config/fire-config';
import Link from 'next/link'
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import SocialFollow from '../../SocialFollow'
import 'bootstrap/dist/css/bootstrap.min.css';
import Disqus from '../../components/Disqus';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { Twitter, Facebook, Linkedin, } from 'react-social-sharing'

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
        image: image,
        date: date,
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
  }, []);
  if (!blog) {
    return (
      <div >
        <h2 style={{ fontSize: "1rem", fontFamily: "sans-serif", textAlign: "center", marginTop: "25%" }}>Loading...</h2>
      </div>
    )
  }

  const router = useRouter()
  const {
    query: { id },
  } = router

// console.log(props.id)

  return (

    <div>
      <Head>
        <title>Austines Blog</title>
        <meta property="og:url" content="https://agblog.vercel.app/" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Blog"/>
        <meta property="og:description"
          content="This a blog of my journey as developer"
        />
        <meta property="og:image" content="https://coverimages.igi-global.com/images-e-content-pro/metadata-in-publishing.png"/>
      
        <meta property="fb:app_id" content="134816985125175" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Austine's Blog "/>
        <meta name="twitter:description" content="My blog as Junior Developer"/>
        <meta name="twitter:image" content="https://coverimages.igi-global.com/images-e-content-pro/metadata-in-publishing.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
       </Head>
      <Navbar expand="lg" className="nav-bar">
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
      <Layout>
        <Row>
          <Col className="feature">
            <h2 style={{ textAlign: "center" }}>{blog.title}</h2>
            <h2 style={{ textAlign: "center" }}>{blog.date}</h2>
            <img src={blog.image} className="center" style={{ height: "300px", }} />
            <p className="blog-content-main">
              {blog.content}
            </p>
            {loggedIn
              ?
              <form onSubmit={handleSubmit}>
                <div>
                  Title<br />
                  <input type="text" value={blog.title}
                    onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                  Date<br />
                  <input type="text" value={blog.date}
                    onChange={({ target }) => setDate(target.value)} />
                </div>
                <div>
                  Content<br />
                  <textarea value={blog.content}
                    onChange={({ target }) => setContent(target.value)} />
                </div>
                <div>
                  Image Url<br />
                  <input type="text" value={blog.image}
                    onChange={({ target }) => setImage(target.value)} />
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
      </Layout>

      <Col className="comment" xl={5}>
      <div className="shareDiv" style={{ display:"flex", justifyContent:"center" }}>
              <label>Share</label>
              <Twitter link={"https://agblog.vercel.app/blog"+props.id} />   
              <Facebook  link={"https://agblog.vercel.app/blog"+props.id} /> 
              <Linkedin  link={"https://agblog.vercel.app/blog"+props.id} />              
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