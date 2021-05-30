import React, { useState } from 'react';
import fire from '../config/fire-config';
import Layout from '../components/Layout'

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [upvotes, setUpvotes] = useState('');


  const [notification, setNotification] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    fire.firestore()
      .collection('blog')
      .add({
        title: title,
        content: content,
        image:image,
        date:date,
        upvotes:upvotes,

      });
    setTitle('');
    setContent('');
    setImage('');
    setDate('');
    setUpvotes('');
    setNotification('Blogpost created');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  return (
    <div>
            <Layout>
    <div className="postform">
      <h2 className="createhead">Add Blog</h2>
      {notification}
      <form onSubmit={handleSubmit} >
        <div>
          Title<br />
          <input type="text" value={title} style={{width:'100%'}}
           onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          Date<br />
          <input type="text" value={date}  style={{width:'50%'}}
           onChange={({target}) => setDate(target.value)} />
        </div>
        <div>
          Content<br />
          <textarea value={content}  style={{width:'100%', height:"500px"}}
           onChange={({target}) => setContent(target.value)} />
        </div>
        <div>
         Image Url<br />
          <input type="text" value={image}  style={{width:'100%'}}
           onChange={({target}) => setImage(target.value)} />
        </div>
        <div>
         Like count<br />
          <input type="text" value={upvotes}  style={{width:'5%'}}
           onChange={({target}) => setUpvotes(target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
      </div>
      </Layout>

    </div>
  )
}


export default CreatePost;