'use client'
import { Container } from "react-bootstrap"
import SideNavbar from "../_components/sideNavbar"
import React, { useState } from 'react';
import MarkdownEditor from './markdownEditor'; // Assuming the path is correct

interface Post {
  title: string;
  content: string;
}

const CreatePostPage = () =>{
    const [post, setPost] = useState<Post>({ title: '', content: '' });

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPost({ ...post, content: event.target.value });
    };
  
    return (
        
      <div className="post-container">
        
        {/* Display post title (replace with your logic) */}
        <h1>{post.title}</h1>
  
        {/* Textfield or textarea for markdown input */}
        <textarea value={post.content} onChange={handleChange} />
  
        {/* Render the edited markdown content */}
        <MarkdownEditor value={post.content} />
      </div>
    );
}

export default CreatePostPage;