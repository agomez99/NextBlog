import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import CreatePost from '../components/CreatePost';
import Link from 'next/link';
import { Row, Col, Card } from 'tailwind-react-ui'
import { Article, ContentTitle, Text } from 'tailwind-react-ui'

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


      <Row >
        <Col>
          <Card bg="grey" text="center" p="4" rounded="none">
            1/1
    </Card>
        </Col>
        <Col w="1/2">
          <Card bg="grey-light" text="center" p="4" rounded="none">
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
            }    </Card>
          <h1>Blog</h1>
            

            <Article>
                    <Text is="p">
                    <Card bg="black" text="left" p="5" rounded="none">
          {blogs.slice(0,1).map(blog =>
                <p className="blog-list">{blogs[0].title}
                <p>{"  "}</p>
               {blogs[0].content.substring(0, 200)}...</p>

          )}
            </Card>
                    </Text>
                  </Article>


        </Col>
        <Col w="1/2">
          <Card bg="grey" text="left" p="5" rounded="none">
            <ul >
              {blogs.slice(1,4).map(blog =>
                <li key={blog.id}>

                  <Article>

                    <Text is="p">
                      <Card bg="black" p="5" rounded="none">
                      <img  style={{height:"100px", float:"right"}} src={blog.image}/>
                      <ContentTitle size={2}>
                        <Link href="/blog/[id]" as={'/blog/' + blog.id}>
                          <a itemProp="hello" className="blog-list">{blog.title}</a>
                        </Link>
                        </ContentTitle>
                      <p style={{float:"right"}}className="blog-content">{blog.content.substring(0, 500)}...</p>
                     </Card>
                    </Text>
                  </Article>
                </li>
              )}
            </ul>
            {loggedIn && <CreatePost />}    
            </Card>
        </Col>

      </Row>

    </div>
    
  )
}
export default Home;