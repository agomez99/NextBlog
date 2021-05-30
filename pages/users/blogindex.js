import { useState, useEffect } from "react";
import Head from "next/head";
import fire from "../../config/fire-config";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import Link from "next/link";
import { Container, Row, Col, Navbar, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SocialFollow from "../../SocialFollow";

const blogindex = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  useEffect(() => {
    fire
      .firestore()
      .collection("blog")
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogs);
      });
  }, []);
  if (!blogs) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        setNotification("Logged out");
        setTimeout(() => {
          setNotification("");
        }, 2000);
      });
  };

  return (
    <div>
      <Head>
        <title>Austines Blog</title>
      </Head>
      <Navbar className="nav-bar" expand="lg">
        <Navbar.Brand href="/">Blog</Navbar.Brand>
        <Container className="d-flex flex-row-reverse">
          <SocialFollow />
          <div bg="grey-light" text="center" p="4" rounded="none">
            {notification}
            {!loggedIn ? (
              <div>
                <Link href="/users/login">
                  <a style={{ float: "left" }}> Login</a>
                </Link>
              </div>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
          <div bg="grey-light" text="center" p="4" rounded="none">
            {notification}
            {loggedIn ? (
              <div>
                <Link href="/users/newblog">
                  <a style={{ float: "left" }}> New blog</a>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Container>
      </Navbar>

      <Layout>
        <h1 style={{ textAlign: "center" }}>All Blogs</h1>

        <Container className="blogindxctr">
          <Row>
            <Col md={4}>
              <ul>
                {blogs.slice(1, 4).map((blog) => (
                  <Link href="/blog/[id]" as={"/blog/" + blog.id}>
                    <a
                      style={{
                        backgroundColor: "grey",
                        textDecoration: "none",
                      }}
                    >
                      <div className="blogs">
                        <div className="card-body">
                          <li key={blog.id}>
                            <img style={{ height: "100px" }} src={blog.image} />
                            <p
                              style={{ whiteSpace: "none" }}
                              className="blog-list"
                            >
                              {blog.title}
                              {"-"}
                              {blog.date}
                            </p>
                            <div className="blogcontent">
                              <p>Likes:{blog.upvotes}</p>
                              <p style={{ textOverflow: "none" }}>
                                {blog.content.substring(0, 100)}...
                              </p>
                            </div>
                          </li>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </ul>
            </Col>

            <Col md={4}>
              <ul>
                {blogs.slice(4, 7).map((blog) => (
                  <Link href="/blog/[id]" as={"/blog/" + blog.id}>
                    <a
                      style={{
                        backgroundColor: "grey",
                        textDecoration: "none",
                      }}
                    >
                      <div className="blogs">
                        <div className="card-body">
                          <li key={blog.id}>
                            <img style={{ height: "100px" }} src={blog.image} />
                            <p
                              style={{ textOverflow: "none" }}
                              className="blog-list"
                            >
                              {blog.title}
                              {"-"}
                              {blog.date}
                            </p>
                            <div className="blogcontent">
                              <p>Likes:{blog.upvotes}</p>
                              <p style={{ textOverflow: "none" }}>
                                {blog.content.substring(0, 100)}...
                              </p>
                            </div>
                          </li>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </ul>
            </Col>

            <Col md={4}>
              <ul>
                {blogs.slice(8, 20).map((blog) => (
                  <Link href="/blog/[id]" as={"/blog/" + blog.id}>
                    <a
                      style={{
                        backgroundColor: "grey",
                        textDecoration: "none",
                      }}
                    >
                      <div className="blogs">
                        <div className="card-body">
                          <li key={blog.id}>
                            <img style={{ height: "100px" }} src={blog.image} />
                            <p
                              style={{ textOverflow: "none" }}
                              className="blog-list"
                            >
                              {blog.title}
                              {"-"}
                              {blog.date}
                            </p>
                            <div className="blogcontent">
                              <p>Likes:{blog.upvotes}</p>
                              <p style={{ textOverflow: "none" }}>
                                {blog.content.substring(0, 100)}...
                              </p>
                            </div>
                          </li>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
};
export default blogindex;
