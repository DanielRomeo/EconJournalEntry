import LandingNavbar from "./navbarComponent";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import Styles from '../_styles/LandingPage/LandingComponent.module.scss'
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
            <div className={`${Styles.whyJoinSection}`}>
                <Container className={`${Styles.whyJoinSectionContainer}`}>
                    <Row className={`${Styles.headerRow}`}>
                        <h1>Why you should join chatter</h1>
                    </Row>

                    <Row className={`${Styles.descriptionRow}`}>
                        <p>Our goal is to make writers and readers see our platform as their next heaven for blogging, ensuring ease in interactions, connecting with like-minded peers, have access to favorite content based on interests and able to communicate your great ideas with people</p>
                    </Row>

                    <Row className={`${Styles.cardsRow}`}>
                        <Col lg='4' md='4' sm='12'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Card.Link href="#">Card Link</Card.Link>
                                    <Card.Link href="#">Another Link</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg='4' md='4' sm='12'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Card.Link href="#">Card Link</Card.Link>
                                    <Card.Link href="#">Another Link</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg='4' md='4' sm='12'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Card.Link href="#">Card Link</Card.Link>
                                    <Card.Link href="#">Another Link</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div> {/* End of why join section*/}

            {/* Person section */}
            <div className={`${Styles.personSection}`}>
                <Container>
                    <Row>
                        <Col lg='4' md='4' sm='12'>
                            <Image
                                src="/personSectionImage.jpg"
                                width={400}
                                height={400}
                                alt="Picture of the author"
                            />
                        </Col>

                        <Col lg='8' md='8' sm='12'>
                            <p>
                                "Chatter has become an integral part of my online experience. As a user of this incredible blogging platform, I have discovered a vibrant community of individuals who are passionate about sharing their ideas and engaging in thoughtful discussions.”
                            </p>

                            <h6>Adebobola Muhydeen, <small>Software developer at Apple</small> </h6>

                            <Button>Join chatter</Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* write, read, connect section */}

            {/* footer */}
        </div>
    )
}

export default LandingComponent;