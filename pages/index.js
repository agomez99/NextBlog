import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import Layout from '../components/Layout'
import CreatePost from '../components/CreatePost';
import Link from 'next/link';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleAnalytics from "../components/googleAnalytics.js"
import Loading from '../components/Loading';


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
  if (!blogs) {
    return (
      <div >
        <h2 style={{ fontSize: "1rem", fontFamily: "sans-serif", textAlign: "center" }}>Loading...<Loading /></h2>
      </div>
    )
  }
  return (

    <div>
      <Head>
        <title>Austines Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleAnalytics />

      <Layout>

        <Row>
          <div className="Col" xl={6}>
            <h1 className="glowhead" style={{ marginBottom: "10%", textAlign: "center" }}>Welome to my blog!</h1>
            <div className="card-body1">
              {blogs.slice(0, 1).map(blog =>
                <div id="crosshair" className="blog-feature" >
                    <img className='feature-image'  key={blog.id}  src={blog.image} href="/blog/[id]" as={'/blog/' + blog.id} />
                    <Link href="/blog/[id]" as={'/blog/' + blog.id} >
                    <div className='d-flex'>
                      <p key={blog.id}  className='blog-title'>{blog.title}</p>
                      <p key={blog.id} className="blog-date" >{blog.date}</p>
                      </div>
                      <div className="blog-content-feature">
                        <p>{blogs[0].content.substring(0, 190)}..</p>
                        <div>
                        </div>
                      </div>
                    </Link>
                  </div>
              )}
            </div>
            {loggedIn && <CreatePost />}
          </div>
          <div className="olderblogs" >
            <div className="Col" xl={6}>
              <p className='d-flex  justify-content-center mt-5'>Older Blogs</p>

              <ul >
                {blogs.slice(1, 6).map(blog =>
                  <Link href="/blog/[id]" as={'/blog/' + blog.id } key={blog.id}>
                    <div className="card">
                      <div className="card-body">
                        <li key={blog.id} >
                          <div  className="blogcards">
                            <img style={{ height: "100px", display: "block", marginLeft: "auto", marginRight: "auto", borderRadius: "5px" }} src={blog.image} />
                            <p className="blog-list" style={{ textAlign: "center" }}>{blog.title}{"-"}</p>
                            <p className="blog-content-date">{blog.date}</p>
                            <p className="blog-content-body ">{blog.content.substring(0, 75)}...</p>
                          </div>
                        </li>
                      </div>
                    </div>
                  </Link>
                )}

              </ul>
              <Link href="/users/blogindex" legacyBehavior>
                <a style={{ float: "right", fontSize: "1.4rem", textDecoration: "none" }}>More Blogs</a>
              </Link>
            </div>
          </div>
        </Row>

      </Layout>

    </div>

  )
}
export default Home;
