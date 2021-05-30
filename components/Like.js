import  { Component, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import fire from '../config/fire-config';

// import Heart from "react-animated-heart";
const React = require("react")
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const Like = (props) => {
  const [blog, setBlogs] = useState(null);
  const [upvotes, setUpvotes] = useState('');

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

const likes = upvotes;
  console.log(likes)
  
    // addLike = () => {
    //   let newCount = this.state.likes + 1;
    //    this.setState({
    //    likes: newCount
    //    });
    // };

      if (0) {
        return (
          <div>
            {/* <button
              className="button"
              onClick={this.addLike}
            > */}
            <FontAwesomeIcon style={{ color: "red" }}icon={farHeart} size = '2x'/>{" "}
            No Likes
            {/* </button> */}
          </div>
        );
      }
      if ( 1) {
        return (
          <div>
            {/* <button className="button" onClick={this.addLike}> */}
            <FontAwesomeIcon style={{ color: "red" }} icon={faHeart } size = '2x'/>{" "}
           1 Like
            {/* </button> */}
          </div>
        );
      }
      if ( !1) {
        return (
          <div>
            {/* <FontAwesomeIcon style={{ color: "red" }} icon={faHeart } size = '2x'/>{" "} */}
              {/* {likes} */}
              Likes
            {/* </button> */}
          </div>
        );
      }
    }
   Like.getInitialProps = ({ query }) => {
      return {
        id: query.id,
      }
    }

  export default Like;