'use client'
import { Container, Row, Col , Button} from "react-bootstrap"
import SideNavbar from "../_components/sideNavbar"
import React, { useState } from 'react';
import MarkdownEditor from './markdownEditor'; // Assuming the path is correct
import Styles from '../_styles/CreatePost/CreatePostComponent.module.scss'

interface Post {
  title: string;
  content: string;
}

const CreatePostComponent = () =>{
    const [post, setPost] = useState<Post>({ title: '', content: '' });

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPost({ ...post, content: event.target.value });
    };
  
    return (
        
      <div className={`${Styles.main}`}>
        <Container className={`${Styles.container}`}>

            <Row className={`${Styles.row1}`}>
                <Col className={`${Styles.col}`} lg='12' md='12' sm='12'>
                <Button className={`${Styles.publishButton}`}>Publish</Button>
                </Col>
                
            </Row>

            <Row className={`${Styles.row2}`}>
                {/* Display post title (replace with your logic) */}
                    <h1>{post.title}</h1>
            
                {/* Textfield or textarea for markdown input */}
                <textarea value={post.content} onChange={handleChange} />

            </Row>

            <hr />

            <Row>
                {/* Render the edited markdown content */}
                <MarkdownEditor value={post.content} />
            </Row>

        </Container>
        
        
      </div>
    );
}

export default CreatePostComponent;