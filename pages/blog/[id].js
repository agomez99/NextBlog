import { useEffect, useState } from 'react';
import Head from 'next/head';
import fire from '../../config/fire-config';
import Link from 'next/link'
import GoogleAnalytics from "../../components/googleAnalytics";
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import SocialFollow from '../../SocialFollow'
import 'bootstrap/dist/css/bootstrap.min.css';
import Disqus from '../../components/Disqus';
import {LikeButton } from '@lyket/react';
import Nav from '../../components/Nav';
import Loading from '../../components/Loading'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { Twitter, Facebook, Linkedin, } from 'react-social-sharing'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft
  } from "@fortawesome/free-solid-svg-icons";

const Blog = (props) => {
  const [blog, setBlog] = useState(null);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  // const [upvotes, setUpvotes] = useState('');
  const index = useRouter()
  const {
    query: { id },
  } = index

 console.log(props.id)

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
        .doc(props.id)
        .get()
        .then(result => {
          setBlog(result.data())
        })
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
  const handleSubmit = (event) => {
    event.preventDefault();
    fire.firestore()
      .collection('blog')
      .add({
        title: title,
        content: content,
        image: image,
        date: date,
        upvotes: upvotes,
      });
    setTitle('');
    setContent('');
    setImage('');
    setDate('');
    setUpvotes('');
    setNotification('Blogpost changed');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
const handleEdit =(event) =>{
    event.preventDefault();
    fire.firestore()
      .collection('blog')
      .add({
        title: title,
        content: content,
        image: image,
        date: date,
        upvotes: upvotes,
      });
    setTitle({title});
    setContent('');
    setImage('');
    setDate('');
    setUpvotes('');
    setNotification('Blogpost changed');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }


  if (!blog) {
    return (
      <div >
        <h2 style={{ fontSize: "1rem", fontFamily: "sans-serif", textAlign: "center" }}>Loading...<Loading/></h2>
      </div>
    )
  }



  return (
    <div>
      <Head>
        <title>Austines Blog</title>
        <meta property="og:url" content="https://agblog.vercel.app" />
        <meta property="og:type" content="My Blog" />
        <meta property="og:title" content="Blog" />
        <meta
          property="og:description"
          content="This a blog of my journey as developer"
        />
        <meta
          property="og:image"
          content="https://coverimages.igi-global.com/images-e-content-pro/metadata-in-publishing.png"
        />

        <meta property="fb:app_id" content="134816985125175" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Austine's Blog " />
        <meta
          property="twitter:description"
          content="My blog as Junior Developer"
        />
        <meta
          property="twitter:image"
          content="https://coverimages.igi-global.com/images-e-content-pro/metadata-in-publishing.png"
        />
      </Head>
      <GoogleAnalytics />
    <Nav/>
     
      
      <Layout>
        <Row>
          <Col className="feature">
            <div key={index}>
              <h2 className="glow" style={{ textAlign: "center" }}>
                {blog.title}
              </h2>
              <h2 style={{ textAlign: "center" }}>{blog.date}</h2>
              <img
                src={blog.image}
                className="center"
              />
              <p className="blog-content-main">{blog.content}</p>
            </div>
  
              <a  href="/" >
                <p>Back</p>
                <FontAwesomeIcon icon={faArrowLeft} size="3x" />
              </a>
            {/* <div className="like-btn">
              <LikeButton
                component={LikeButton.templates.Twitter}
                id={props.id}
                namespace="post"
              />
              Likes
            </div> */}
            <p style={{ textAlign: "center" }}>Currently listening to</p>
            <div className="spotify">
              <img
                src="https://spotify-now-playing-woad.vercel.app/api/spotify-playing"
                className="spotify-img"
                lt="Spotify Now Playing"
                width="50%"
              />
            </div>
          </Col>
        </Row>
              <Row>
        <Col className="comment" xl={5}>
          <p style={{ textAlign: "center" }}>Share</p>
          <div
            className="shareDiv"
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "20px",
            }}
          >

            <Twitter link={"https://agblog.vercel.app/blog/" + props.id} />
            <Facebook link={"https://agblog.vercel.app"} />
            <Linkedin link={"https://agblog.vercel.app" + props.id} />
          </div>
          <Disqus />
        </Col>
        </Row>
      </Layout>
    </div>
  );
}
Blog.getInitialProps = ({ query }) => {
  return {
    id: query.id,
  }
}
export default Blog