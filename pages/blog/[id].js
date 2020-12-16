import { useEffect, useState } from 'react';
import fire from '../../config/fire-config';
import Link from 'next/link'
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import SocialFollow from '../../SocialFollow'
import 'bootstrap/dist/css/bootstrap.min.css';

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
  console.log(blog)

  if(!blog){
    return(
      <h2>Loading...</h2>
    )
  }
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

      <h2>{blog.title}</h2>
      <p>
        {blog.content}
      </p>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  )
}
Blog.getInitialProps = ({ query }) => {
  return {
      id: query.id,
  }
}
export default Blog