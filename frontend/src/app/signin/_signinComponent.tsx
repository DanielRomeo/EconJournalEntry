"use client";
import {
	Form,
	FormGroup,
	Button,
	Container,
	Col,
	Row,
	Tab,
} from "react-bootstrap";
import Styles from "../_styles/SigninPage/SigninComponent.module.scss";
import { useRouter } from "next/navigation";
import { auth, db , provider } from "../_components/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect } from "react";
import isAuthenticated from "../_components/isAuthenticated";
import { GetLocalStorage, SetLocalStorage } from "../_components/localStorage";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

import { collection, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import {  signInWithEmailAndPassword } from "firebase/auth";


// validator libs
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().required("Password is required"),
}); // end of schema

interface User {
	displayName: string | null;
	email: string | null;
	uid: string;
}

const SigninComponent = () => {
	const router = useRouter();
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	// useEffect:
	useEffect(() => {
		const storedAuth = localStorage.getItem("isAuth");
		if (storedAuth) {
			setIsAuth(JSON.parse(storedAuth));
		}
		// I should call the isAuthenticated function here and use its logic instead of creating my own new one
	}, []);


	// Login function: for google functionality
	const handleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const user = result.user;
			// set the local storage
			SetLocalStorage("isAuth", JSON.stringify(true));
			setIsAuth(true);
			setUser(user); // Update user state
			router.push("/feed");
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	// form submit:
	const onSubmit = (data: any) => {
		setIsLoading(true);
		console.log(data);

		signInWithEmailAndPassword(auth, data.email, data.password)
		.then( async (userCredential: any) => {
			// Signed in
			try {
				// After successful signup, extract user information from the auth object (excluding password)
				const user = userCredential.user;
				router.push('/feed');
			} catch (error: unknown) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}

		}).catch((error: any) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
	};

	return (
		<div className={`${Styles.mainDiv}`}>
			<Row className={`${Styles.header}`}>
				<h3>Welcome back</h3>

				{user ? <>user is logged in</> : <>no user</>}
			</Row>

			<Row className={`${Styles.signinRow}`}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormGroup className="mb-3">
						<Form.Label htmlFor="email">Email address</Form.Label>
						<input
							{...register('email')}
							className={`form-control`}
							type="email"
							id="email"
							placeholder=""
						/>
						{errors.email && (
							<span style={{ color: "red" }}>
								{errors.email.message}
							</span>
						)}
					</FormGroup>

					<FormGroup className="mb-3">
						<Form.Label htmlFor="password">Password</Form.Label>
						<input
							{...register('password')}
							className={`form-control`}
							type="password"
							id="password"
						/>
						{errors.password && (
							<span style={{ color: "red" }}>
								{errors.password.message}
							</span>
						)}
					</FormGroup>

					<FormGroup className="mb-3">
						<Button
							type="submit"
							disabled={isLoading}
							className={`${Styles.loginButton}`}
						>
							{isLoading ? "Loading..." : "Login"}
						</Button>
					</FormGroup>
				</form>

				<FormGroup className="mb-3">
					<Button
						className={`${Styles.GoogleButton}`}
						onClick={handleLogin}
					>
						<FcGoogle></FcGoogle>
						&nbsp; Login with Google
					</Button>
				</FormGroup>

				<FormGroup className="mb-3">
					<Button className={`${Styles.FacbookButton}`}>
						<FaFacebookF></FaFacebookF>
						&nbsp; Login with Facebook
					</Button>
				</FormGroup>
			</Row>
		</div>
	);
};

export default SigninComponent;
