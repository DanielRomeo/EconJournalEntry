"use client";
import { Form, FormGroup,  Button, Container, Col, Row, Tab } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Styles from "../_styles/SigninPage/SignupComponent.module.scss"

const SignupComponent: React.FC = () => {
  return (
        <div className={`${Styles.mainContainer}`}>

            <Row className=''>
                <h3>Register as a Writer/Reader</h3>
            </Row>


            <Form>
                <Row>
                    <Col lg="6" md="6" sm="12">
                        <FormGroup className="mb-3">
                            <Form.Label htmlFor="firstName">First name</Form.Label>
                            <input className={`form-control`} type="text" id="firstName" placeholder="John" />
                        </FormGroup>
                    </Col>
                   
                    <Col lg="6" md="6" sm="12">
                        <FormGroup className="mb-3">
                            <Form.Label htmlFor="lastName">Last name</Form.Label>
                            <input className={`form-control`} type="text" id="lastName" placeholder="Doe" />
                        </FormGroup>
                    </Col>
                    
                </Row>
                
                <Row>
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="email">Email address</Form.Label>
                        <input className={`form-control`} type="email" id="email" placeholder="johndoe@gmail.com" />
                    
                    </FormGroup>


                    <FormGroup className="mb-3">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <input className={`form-control`} type="password" id="password" />
                    
                    </FormGroup>

                    <FormGroup className="mb-3">
                    <Form.Label htmlFor="confirmPassword">Confirm password</Form.Label>
                    <input className={`form-control`} type="password" id="confirmPassword" />
                    
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <Button className={`${Styles.createButton}`} variant="primary" type="submit">
                        Create Account
                        </Button>
                    </FormGroup>
                </Row>
            </Form>

            <Row className={`${Styles.SocialButtonsRow}`}>
                {/* <Col className={`${Styles.Col}`} lg="12" md="12" sm="12"> */}
                    <Button variant="primary" className={`${Styles.GoogleButton}`}>
                    Sign up with Google
                    </Button>
                {/* </Col> */}

                {/* <Col lg="12" md="12" sm="12"> */}
                    <Button variant="primary" className={`${Styles.LinkedinButton}`}>
                    Sign up with LinkedIn
                    </Button>
                {/* </Col> */}
            </Row>
        </div>

  );
};

export default SignupComponent;