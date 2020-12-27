import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../../config/fire-config';
import CreatePost from '../../components/CreatePost';
import Link from 'next/link';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SocialFollow from "../../SocialFollow"
import Disqus from '../../components/Disqus';
import ReactDOM from "react-dom";


  const blogindex = () => {
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

              <Link href="/users/login">
                <a style={{ float: "left" }}> Login</a>
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

              <Link href="/users/newblog">
                <a style={{ float: "left" }}> New blog</a>
              </Link>
            </div>
            :
            
            <>
            </>

          }
          
        </div>
        </Container>
       
      </Navbar>
      <Row>

          <Col xl={12}>

            <div className="blog-content" text="left" p="5" rounded="none">
            <h1>All Blogs</h1>
              <ul >
                {blogs.slice(1, 100).map(blog =>
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


    </div>

  )
}
export default blogindex;