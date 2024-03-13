"use client";
import { Form, FormGroup,  Button, Container, Col, Row, Tab } from 'react-bootstrap';
import Styles from '../_styles/SigninPage/SigninComponent.module.scss'
import { useRouter } from 'next/navigation'


const SigninComponent = ()=>{

    const login  = () =>{
        // login functionality
    }

    return (
        <div className={`${Styles.mainDiv}`}>
            <Row className={`${Styles.header}`}>
                <h3>Welcome back</h3>
            </Row>

            <Row className={`${Styles.signinRow}`}>


                <FormGroup className="mb-3">
                    <Form.Label htmlFor="email">Email address</Form.Label>
                    <input className={`form-control`} type="email" id="email" placeholder="" />
                
                </FormGroup>


                <FormGroup className="mb-3">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <input className={`form-control`} type="password" id="password" />
                
                </FormGroup>

                <FormGroup className="mb-3">
                    <Button className={`${Styles.loginButton}`} onClick={login} variant="primary" >
                    Login
                    </Button>
                </FormGroup>
            </Row>
        </div>
    )
}

export default SigninComponent;