"use client";
import { Row, Container, Col, Button, Tabs, Tab} from "react-bootstrap";
import Styles from '../_styles/Feed/FeedComponent.module.scss'
import { FaPen } from "react-icons/fa";
import PostComponent from "./postComponent";

const FeedComponent = ()  =>{
    return (
        <Container className={`${Styles.nainContainer}`}>
            <Row className={`${Styles.headerRow}`}>
                <Col lg='8' md='8' sm='6'>
                    <h1>FEED</h1>
                    <small>Explore different content you’d love </small>
                </Col>

                <Col lg='4' md='4' sm='6'>
                    <Button className={`${Styles.postButton}`}><FaPen /> Post a content</Button>
                </Col>
            </Row>

            <Row className={`${Styles.mainRow}`}>
                <Tabs    
                    defaultActiveKey="register"
                    id="fill-tab-example"
                    className={`${Styles.tabs} mb-3`}
                    fill
                    >
                    <Tab className={`${Styles.tab}`} eventKey="Foryou" title="For you">
                        <PostComponent></PostComponent>
                    </Tab>
                    <Tab  className={`${Styles.tab}`} eventKey="Featured" title="Featured">
                        sdfsdfs
                    </Tab>
                    <Tab className={`${Styles.tab}`} eventKey="Recent" title="Recent">
                        re
                    </Tab>
                    
                </Tabs>
            </Row>
        </Container>
    )
}

export default FeedComponent;