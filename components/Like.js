import  { Component, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import fire from '../config/fire-config';

// import Heart from "react-animated-heart";
const React = require("react")
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';



export default class extends Component {
    state = {
      likes: 0
    };
  
    addLike = () => {
      let newCount = this.state.likes + 1;
       this.setState({
       likes: newCount
       });
    };
  
    render() {
      const likes = this.state.likes;
      if (likes === 0) {
        return (
          <div>
            <button
              className="button"
              onClick={this.addLike}
            >
            <FontAwesomeIcon style={{ color: "red" }}icon={farHeart} size = '2x'/>{" "}
            No Likes
            </button>
          </div>
        );
      }
      if (likes === 1) {
        return (
          <div>
            <button className="button" onClick={this.addLike}>
            <FontAwesomeIcon style={{ color: "red" }} icon={faHeart } size = '2x'/>{" "}
           1 Like
            </button>
          </div>
        );
      }
      if (likes > 1) {
        return (
          <div>
            <button className="button" onClick={this.addLike}>
            <FontAwesomeIcon style={{ color: "red" }} icon={faHeart } size = '2x'/>{" "}
              {likes}
              Likes
            </button>
          </div>
        );
      }
    }
  }