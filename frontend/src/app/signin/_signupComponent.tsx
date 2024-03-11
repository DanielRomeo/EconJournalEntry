"use client";
import { Form, FormGroup,  Button, Container, Col, Row, Tab } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Styles from "../_styles/SigninPage/SignupComponent.module.scss"

const SignupComponent: React.FC = () => {

  return (
    <div>
        <div className={`${Styles.mainContainer}`}>

            <Row className=''>
                <h3>Register as a Writer/Reader</h3>
            </Row>


            <Form>
                <FormGroup className="mb-3">
                    <Form.Label htmlFor="firstName">First name</Form.Label>
                    <input className={`form-control`} type="text" id="firstName" placeholder="John" />
                </FormGroup>

                <FormGroup className="mb-3">
                    <Form.Label htmlFor="lastName">Last name</Form.Label>
                    <input className={`form-control`} type="text" id="lastName" placeholder="Doe" />
                </FormGroup>


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
                <Button variant="primary" type="submit">
                Create Account
                </Button>
            </Form>


            <div className="social-signup">
                <Button variant="primary" className="google-signup">
                
                Sign up with Google
                </Button>
                <Button variant="primary   " className="linkedin-signup">
                
                Sign up with LinkedIn
                </Button>
            </div>
            </div>
    </div>


    
  );
};

export default SignupComponent;