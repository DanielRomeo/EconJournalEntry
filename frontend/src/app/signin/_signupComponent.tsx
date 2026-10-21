"use client";
import {
	Form,
	FormGroup,
	Button,
	Col,
	Row,
} from "react-bootstrap";
import { auth, provider } from "../_components/firebaseConfig";
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../_components/firebaseConfig";
import Styles from "../_styles/SigninPage/SignupComponent.module.scss";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { ensureUserProfileDoc } from "../_components/ensureUserProfileDoc";
import { firebaseAuthErrorMessage } from "../_components/firebaseAuthError";
import { SetLocalStorage } from "../_components/localStorage";

// validator libs
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";


const schema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters long")
		.required("Password is required"),
	firstname: yup.string().required("First name is required"),
	lastname: yup.string().required("Last name is required"),
	bio: yup.string().max(280, "Bio should be under 280 characters"),
	joiningas: yup.string().required("Who do you want to join as"),
	confirmpassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match")
		.required("Please confirm your password"),
}); // end of schema

// start of main function:
const SignupComponent: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
	const [authError, setAuthError] = useState("");

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	const router = useRouter();

	// Submission function:
	const onSubmit = async (data: any) => {
		setAuthError("");
		setIsLoading(true);
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
			const user = userCredential.user;
			await setDoc(doc(db, 'users', user.uid), {
				uid: user.uid,
				email: user.email,
				firstname: data.firstname,
				lastname: data.lastname,
				type: data.joiningas,
				bio: data.bio || "",
				image: "",
				facebook: "",
				instagram: "",
				x: "",
				linkedin: ""
			});
			SetLocalStorage("isAuth", JSON.stringify(true));
			router.push('/feed');
		} catch (error: unknown) {
			console.error("Account creation error:", error);
			setAuthError(firebaseAuthErrorMessage(error, "Your account could not be created. Please try again."));
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignup = async () => {
		setAuthError("");
		setIsGoogleLoading(true);
		try {
			const result = await signInWithPopup(auth, provider);
			const selectedType = watch("joiningas") === "writer" ? "writer" : "reader";
			await ensureUserProfileDoc(result.user, { defaultType: selectedType });
			SetLocalStorage("isAuth", JSON.stringify(true));
			router.push('/feed');
		} catch (error: unknown) {
			console.error("Google signup error:", error);
			setAuthError(firebaseAuthErrorMessage(error, "Google signup could not be completed. Please try again."));
		} finally {
			setIsGoogleLoading(false);
		}
	};

	return (
		<div className={`${Styles.mainContainer}`}>
			<Row>
				<h3 className={Styles.heading}>Create your account</h3>
				<p className={Styles.subheading}>Join as a reader or writer. You can update your profile at any time.</p>
			</Row>
			{authError && <div className={Styles.authError} role="alert">{authError}</div>}

			<form onSubmit={handleSubmit(onSubmit)}>
				<Row>
					<Col lg="6" md="6" sm="12">
						<FormGroup className="mb-3">
							<Form.Label htmlFor="firstName">
								First name
							</Form.Label>
							<input
								{...register("firstname")}
								className={`form-control`}
								type="text"
								id="firstName"
							/>
							{errors.firstname && (
								<span style={{ color: "red" }}>
									{errors.firstname.message}
								</span>
							)}
						</FormGroup>
					</Col>

					<Col lg="6" md="6" sm="12">
						<FormGroup className="mb-3">
							<Form.Label htmlFor="lastName">
								Last name
							</Form.Label>
							<input
								{...register("lastname")}
								className={`form-control`}
								type="text"
								id="lastName"
							/>
							{errors.lastname && (
								<span style={{ color: "red" }}>
									{errors.lastname.message}
								</span>
							)}
						</FormGroup>
					</Col>
				</Row>

				<Row>
					<FormGroup className="mb-3">
						<Form.Label htmlFor="bio">Short bio</Form.Label>
						<textarea
							{...register("bio")}
							className="form-control"
							id="bio"
							rows={3}
							placeholder="Tell readers what you usually write about"
						/>
						{errors.bio && (
							<span style={{ color: "red" }}>{errors.bio.message as string}</span>
						)}
					</FormGroup>
				</Row>

				<Row>
					<FormGroup className="mb-3">
						<select
							{...register("joiningas")}
							className="form-select"
							aria-label="Default select example"
						>
							<option value="reader">Reader</option>
							<option value="writer">Writer</option>
						</select>
						{errors.joiningas && (
							<span style={{ color: "red" }}>
								{errors.joiningas.message}
							</span>
						)}
					</FormGroup>

					<FormGroup className="mb-3">
						<Form.Label htmlFor="email">Email address</Form.Label>
						<input
							{...register("email")}
							className={`form-control`}
							type="email"
							id="email"
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
							{...register("password")}
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
						<Form.Label htmlFor="confirmPassword">
							Confirm password
						</Form.Label>
						<input
							{...register("confirmpassword")}
							className={`form-control`}
							type="password"
							id="confirmPassword"
						/>
						{errors.confirmpassword && (
							<span style={{ color: "red" }}>
								{errors.confirmpassword.message}
							</span>
						)}
					</FormGroup>

					<FormGroup className="mb-3">
						<Button
							type="submit"
							className={`${Styles.createButton}`}
							disabled={isLoading}
						>
							{isLoading ? "Loading..." : "Create Account"}
						</Button>
					</FormGroup>
				</Row>
			</form>

			<Row className={`${Styles.SocialButtonsRow}`}>
				<Button
					type="button"
					className={`${Styles.GoogleButton}`}
					onClick={handleGoogleSignup}
					disabled={isGoogleLoading || isLoading}
				>
					<FcGoogle />
					&nbsp; {isGoogleLoading ? "Opening Google…" : "Sign up with Google"}
				</Button>

				
			</Row>
		</div>
	);
};

export default SignupComponent;
