import React, { Component } from 'react';
import loading from 'next/image'
export class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src={loading} 
        src="/loading.gif"
        width={600}
        height={500}
        alt="loading" />
        </div>
    );
  }
}
export default Loading;