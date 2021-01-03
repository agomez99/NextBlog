import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import CreatePost from '../components/CreatePost';
import Link from 'next/link';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SocialFollow from "../SocialFollow"
import Disqus from '../components/Disqus';
import Layout from '../components/Layout'


  const Home = () => {
  const [blogs, setBlogs] = useState([]);
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
  useEffect(() => {
    fire.firestore()
      .collection('blog')
      .onSnapshot(snap => {
        const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogs);
      });
  }, []);
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
  console.log(blogs)
  return (
    
    <div>
      <Head>
        <title>Austines Blog</title>
      </Head>
      <Navbar className="nav-bar" expand="lg" >
        <Navbar.Brand  href="/" className="brandH">Blog</Navbar.Brand>
        <Container  className="d-flex flex-row-reverse">
          <SocialFollow />
          <div bg="grey-light" text="center" p="4" rounded="none">
          {notification}
          {!loggedIn
            ?
            <div>
              {/* <Link href="/users/register">
                    <a>Register</a>
                  </Link> |  */}
                <Link href="/users/blogindex">
                <a style={{ float: "left",fontSize:"1.4rem", textDecoration:"none"  }}> Blogs</a>
              </Link>
              <Link href="/users/login">
                <a style={{ paddingLeft:"100px", fontSize:"1.4rem",textDecoration:"none" }}> Login</a>
              </Link>

            </div>
            :
            <button onClick={handleLogout}>Logout</button>

          }
          
        </div>
        <div bg="grey-light" text="center" p="4" rounded="none">
          {notification}
          {loggedIn
            ?
            <div>
              <Link href="/users/blogindex">
                <a style={{ float: "left",fontSize:"1.4rem", textDecoration:"none"   }}> Blogs</a>
              </Link>
              <Link href="/users/newblog">
                <a style={{ paddingLeft:"100px", float: "left", fontSize:"1.4rem", textDecoration:"none"   }}> New blog</a>
              </Link>
            </div>
            :
            
            <>
            </>

          }
          
        </div>
        </Container>
      </Navbar>
      <Layout>

      <Row>
      <Col className="Col" xl={6}>
          <div className="col-xl">
            <div className="card1">
              <div className="card-body1">
                {blogs.slice(0, 1).map(blog =>
                  <div id="crosshair" className="blog-feature" text="left" p="5" rounded="none">
                  <div>
                  <Link href="/blog/[id]" as={'/blog/' + blog.id} >
                        <p style={{fontSize:"1.9rem", float:"left"}}>{blog.title}</p>
                  </Link>
                  <Link href="/blog/[id]" as={'/blog/' + blog.id} >
                        <p style={{fontSize:"1.9rem", float:"right"}}>{blog.date}</p>
                  </Link>
                  <Link href="/blog/[id]" as={'/blog/' + blog.id}>
                      <img style={{ width: "100%" }} src={blog.image} href="/blog/[id]" as={'/blog/' + blog.id} />
                  </Link>
                  </div>
                    <div className="blog-content-main">
                      <Link href="/blog/[id]" as={'/blog/' + blog.id}>
                      <p>
                      {blogs[0].content.substring(0, 150)}...
                      </p>
                      </Link>
                      <div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
        {/* <Heart/> */}
          </div>
          {loggedIn && <CreatePost />}
          </Col>
          <Col xl={4}>
            <div className="blog-content" text="left" p="5" rounded="none">
              <ul >
                {blogs.slice(1, 6).map(blog =>
                  <Link href="/blog/[id]" as={'/blog/' + blog.id}>
                  <a className="card">
                    <div className="card-body">
                      <li key={blog.id} >
                        <div bg="black" p="1" rounded="none" className="blogcards">
                          <img style={{ height: "100px", float: "right" }} src={blog.image} />
                          <p className="blog-list">{blog.title}{"-"}{blog.date}</p>
                          <p >{blog.content.substring(0, 300)}...</p>
                        </div>
                      </li>
                    </div>
                  </a>
                  </Link>

                )}

              </ul>
            </div>
            </Col>
          </Row>
          <Col className="comment" xl={5}>
          <Disqus />
          </Col>
          </Layout>
    </div>

  )
}
export default Home;