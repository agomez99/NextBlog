import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import CreatePost from '../components/CreatePost';
import Link from 'next/link';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SocialFollow from "../SocialFollow"
import Disqus from '../components/Disqus';


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
  return (
    <div>
      <Head>
        <title>Austines Blog</title>
      </Head>
      <Navbar expand="lg" variant="light" bg="light">
        <Navbar.Brand href="/">Blog</Navbar.Brand>
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
              <Link href="/users/login">
                <a style={{ float: "left" }}> Login</a>
              </Link>
            </div>
            :
            <button onClick={handleLogout}>Logout</button>
          }
        </div>
        </Container>
       
      </Navbar>
      <Row>

      <Col className="Col" xl={6}>
          <div className="col-xl">
            <div className="card1">
              <div className="card-body1">
                <h1 className="hdr">Blog</h1>
                {blogs.slice(0, 1).map(blog =>
                  <div className="blog-feature" text="left" p="5" rounded="none">
                    <img style={{ width: "100%", float: "right" }} src={blog.image} />
                    <div >
                      <Link href="/blog/[id]" as={'/blog/' + blog.id}>
                        <a >{blog.title}</a>
                      </Link>
                      <p>{"  "}</p>
                      {blogs[0].content.substring(0, 150)}...</div>
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
                        <div bg="black" p="1" rounded="none">
                          <img style={{ height: "100px", float: "right" }} src={blog.image} />
                            <p className="blog-list">{blog.title}</p>
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

    </div>

  )
}
export default Home;