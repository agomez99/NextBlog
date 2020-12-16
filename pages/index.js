import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import CreatePost from '../components/CreatePost';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


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

<Container>
  <Row>
    <Col>
    

    <div bg="grey" text="center" p="4" rounded="none">
          <div bg="grey-light" text="center" p="4" rounded="none">
            <Head>
              <title>Blog App</title>
            </Head>
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
            }    </div>
          <h1>Blog</h1>
          {blogs.slice(0,1).map(blog =>
            <div bg="black" text="left" p="5" rounded="none">
            <img  style={{height:"50px", float:"right"}} src={blog.image}/>
                <div className="blog-list">{blogs[0].title}
                <p>{"  "}</p>
               {blogs[0].content.substring(0, 200)}...</div>
               </div>

          )}
          </div>

    </Col>
    {loggedIn && <CreatePost />}    

    <Col>
    
    <div bg="black" text="left" p="5" rounded="none">
            <ul >
              {blogs.slice(1,4).map(blog =>
                <li key={blog.id}>
                      <div bg="black" p="5" rounded="none">
                      <img  style={{height:"100px", float:"right"}} src={blog.image}/>
                        <Link href="/blog/[id]" as={'/blog/' + blog.id}>
                          <a itemProp="hello" className="blog-list">{blog.title}</a>
                        </Link>
                      <p style={{float:"right"}}className="blog-content">{blog.content.substring(0, 500)}...</p>
                     </div>
                </li>
              )}
            </ul>
            </div>
    </Col>
  </Row>
</Container>





    </div>
    
  )
}
export default Home;