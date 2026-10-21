"use client";
import {
	Form,
	FormGroup,
	Button,
	Row,
} from "react-bootstrap";
import Styles from "../_styles/SigninPage/SigninComponent.module.scss";
import { useRouter } from "next/navigation";
import { auth, provider } from "../_components/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { SetLocalStorage } from "../_components/localStorage";
import { FcGoogle } from "react-icons/fc";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { ensureUserProfileDoc } from "../_components/ensureUserProfileDoc";
import { firebaseAuthErrorMessage } from "../_components/firebaseAuthError";


// validator libs
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().required("Password is required"),
}); // end of schema

const SigninComponent = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
	const [authError, setAuthError] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	// Login function: for google functionality
	const handleLogin = async () => {
		setAuthError("");
		setIsGoogleLoading(true);
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			// set the local storage
			SetLocalStorage("isAuth", JSON.stringify(true));
			await ensureUserProfileDoc(user);
			router.push("/feed");
		} catch (error) {
			console.error("Login error:", error);
			setAuthError(firebaseAuthErrorMessage(error, "Google sign-in could not be completed. Please try again."));
		} finally {
			setIsGoogleLoading(false);
		}
	};

	// form submit:
	const onSubmit = async (data: any) => {
		setAuthError("");
		setIsLoading(true);
		try {
			const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
			await ensureUserProfileDoc(userCredential.user);
			SetLocalStorage("isAuth", JSON.stringify(true));
			router.push('/feed');
		} catch (error: unknown) {
			console.error("Email login error:", error);
			setAuthError(firebaseAuthErrorMessage(error, "Sign-in could not be completed. Please try again."));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={`${Styles.mainDiv}`}>
			<Row className={`${Styles.header}`}>
				<h3>Welcome back</h3>
				<p>Sign in to continue reading and writing.</p>
			</Row>

			<Row className={`${Styles.signinRow}`}>
				{authError && <div className={Styles.authError} role="alert">{authError}</div>}
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
						type="button"
						className={`${Styles.GoogleButton}`}
						onClick={handleLogin}
						disabled={isGoogleLoading || isLoading}
					>
						<FcGoogle></FcGoogle>
						&nbsp; {isGoogleLoading ? "Opening Google…" : "Login with Google"}
					</Button>
				</FormGroup>

				
			</Row>
		</div>
	);
};

export default SigninComponent;
