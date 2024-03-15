"use client";
import { Row } from "react-bootstrap";
// import SignupComponent from "./_signupComponent";
import MainComponent from "./_mainTabComponent";
import ImageComponent from "./_imageComponent";

const SigninPage = () => {
	return (
		<Row>
			<ImageComponent></ImageComponent>

			<MainComponent></MainComponent>
		</Row>
	);
};

export default SigninPage;
