"use client";
import { Form, FormGroup,  Button, Container, Col, Row, Tab } from 'react-bootstrap';
import Styles from '../_styles/SigninPage/SigninComponent.module.scss'
import { useRouter } from 'next/navigation'
import { auth, provider } from '../_components/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useState, useEffect } from 'react';
import isAuthenticated from '../_components/isAuthenticated';
import { GetLocalStorage, SetLocalStorage } from '../_components/localStorage';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";


interface User {
    displayName: string | null;
    email: string | null;
    uid: string;
  }
  
const SigninComponent = ()=>{
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    // const provider = new GoogleAuthProvider();

	// useEffect:
    useEffect(() => {
		const storedAuth = localStorage.getItem('isAuth');
		if (storedAuth) {
			setIsAuth(JSON.parse(storedAuth));
		}
		// I should call the isAuthenticated function here and use its logic instead of creating my own new one
    }, []);

	// Login function:
	const handleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const user = result.user;

			// set the local storage
			SetLocalStorage('isAuth', JSON.stringify(true));

			setIsAuth(true);


			setUser(user); // Update user state
		} catch (error) {
			console.error('Login error:', error);
		}
	};

    return (
        <div className={`${Styles.mainDiv}`}>
            <Row className={`${Styles.header}`}>
                <h3>Welcome back</h3>

                {user ? <>user</> : <>no user</>}
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
                    <Button className={`${Styles.loginButton}`}>
                    Login
                    </Button>
                </FormGroup>

                <FormGroup className="mb-3">
                    <Button className={`${Styles.GoogleButton}`} onClick={handleLogin}>
                        <FcGoogle></FcGoogle>
                        &nbsp; Login with Google
                    </Button>
                </FormGroup>

                <FormGroup className="mb-3">
                    <Button className={`${Styles.FacbookButton}`} >
                        <FaFacebookF></FaFacebookF>
                        &nbsp; Login with Facebook
                    </Button>
                </FormGroup>
            </Row>
        </div>
    )
}

export default SigninComponent;