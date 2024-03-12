import LandingNavbar from "./navbarComponent";
import { Button, Container, Row, Col } from "react-bootstrap";
import Styles from '../_styles/LandingPage/LandingComponent.module.scss'
// import Image from "react-bootstrap";
import Image from "next/image";

const LandingComponent = ()=>{

    return (
        <div>
            <LandingNavbar></LandingNavbar>

            {/* Landing section */}
            <div className={`${Styles.landingSection}`}>
                <Container className={`${Styles.landingSectionContainer}`}>
                    <h1>Welcome to chatter: A Haven for Text-Based Content</h1>
                    <small>Unleash the Power of Words, Connect with Like-minded Readers and Writers </small>
                        <br />
                    <Button className={`${Styles.landingButton}`}>Get started</Button>
                </Container>
                
            </div>


            {/* About secttion */}
            <div className={`${Styles.aboutSection}`}>
                <Container>
                    <Row>
                        <Col lg='7' md='7' sm='12'>
                            <h1>
                                About Chatter
                            </h1>

                            <p>Chatter is a multi-functional platform where authors and readers can have access to their own content. It aims to be a traditional bookworm’s heaven and a blog to get access to more text based content. Our vision is to foster an inclusive and vibrant community where diversity is celebrated. We encourage open-mindedness and respect for all individuals, regardless of their backgrounds or beliefs. By promoting dialogue and understanding, we strive </p>
                        </Col>

                        <Col lg='5' md='5' sm='12'>
                            <Image
                                src="/aboutSectionImage.jpg"
                                width={500}
                                height={500}
                                alt="Picture of the author"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Why you should join section */}

            {/* Person section */}

            {/* write, read, connect section */}

            {/* footer */}
        </div>
    )
}

export default LandingComponent;