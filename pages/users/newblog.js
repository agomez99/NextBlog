import { React, useState, useEffect } from 'react';
import CreatePost from '../../components/CreatePost'
import Link from 'next/link';
import fire from '../../config/fire-config';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom";

import { Container, Row, Col, Navbar,Button } from 'react-bootstrap';

const newblog = () => {
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
               <Navbar expand="lg" variant="light" bg="light">
        <Navbar.Brand href="/">Blog</Navbar.Brand>
        <Container  className="d-flex flex-row-reverse">
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
                    <Col xl={6}>
                        <CreatePost />
                        <Link href="/">
                            <a>Blogs</a>
                        </Link>
                    </Col>
                    <Col xl={6}>
                        <div className="blog-content" text="left" p="5" rounded="none">
                            <ul >
                                {blogs.slice(1, 20).map(blog =>
                                    <Link href="/blog/[id]" as={'/blog/' + blog.id}>
                                        <a className="card">
                                            <div className="card-body">
                                                <li key={blog.id} >
                                                    <div bg="black" p="1" rounded="none">
                                                        <img style={{ height: "50px", float: "right" }} src={blog.image} />
                                                        <p className="blog-list">{blog.title}{"-"}{blog.date}</p>

                                                        <p >{blog.content.substring(0, 100)}...</p>
                                                        <Button variant="danger" >Delete</Button>

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


export default newblog
