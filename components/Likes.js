import { faBlog } from "@fortawesome/free-solid-svg-icons";
import React, { useReducer, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import fire from '../config/fire-config';

const HANDLE_LIKE = Symbol("HANDLE_LIKE");
const HANDLE_DISLIKE = Symbol("HANDLE_DISLIKE");
const initialState = {
  likes: 0,
  dislikes: 1,
  active: null
};


const reducer = (state, action) => {
  const { likes, dislikes, active } = state;

  switch (action.type) {
    case HANDLE_LIKE:
      return {
        ...state,
        likes: state.likes + 1,
        dislikes: active === "dislike" ? dislikes - 1 : dislikes,
        active: "like"
      };
    case HANDLE_DISLIKE:
      return {
        ...state,
        likes: active === "like" ? likes - 1 : likes,
        active: "dislike",
        dislikes: dislikes + 1
      };
    default:
      return state;
  }
};

const Likes = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [blog, setBlog] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [upvotes, setUpvotes] = useState('');


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
  const { likes, dislikes, active } = state;
  return (
    <div style={{ display: "flex" }}>
      <button
        style={{
          color: active === "like" ? "green" : "black",
          marginRight: "10px"
        }}
        onClick={() =>
          active !== "like" ? dispatch({ type: HANDLE_LIKE }) : null
        }
      >
        <strong>Likes</strong>
        &nbsp;|&nbsp;
        {upvotes}
      </button>
      <button
        style={{ color: active === "dislike" ? "red" : "black" }}
        onClick={() =>
          active !== "dislike" ? dispatch({ type: HANDLE_DISLIKE }) : null
        }
      >
        <strong>Dislikes</strong>
        &nbsp;|&nbsp;
        {dislikes}
      </button>
    </div>
  );
};

 export default  Likes;

