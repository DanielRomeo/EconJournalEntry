import Image from 'next/image'
import { Container, Col, Row, Tab, Nav, Tabs } from "react-bootstrap";
import Styles from "../_styles/SigninPage/ImageComponent.module.scss"

const ImageComponent = ()=>{
    return (
        <Col className={`${Styles.mainCol}`} lg="6" md="6" sm="12">
            {/* <Image
                src="/signinpage.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
                /> */}
                <Row>
                <h1>Chatter</h1>
                </Row>

                <Row>
                <h6>Unleash the Power of Words, Connect with Like-minded Readers and writers</h6>
                </Row>
                
                
            
        </Col>
    )
}

export default ImageComponent;