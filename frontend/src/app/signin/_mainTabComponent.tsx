"use client ";
import { Container, Col, Row, Tab, Nav, Tabs } from "react-bootstrap";
// import Styles from "../_styles/MainTabComponent.module.scss"
import Styles from "../_styles/SigninPage/MainTabComponent.module.scss";
import SignupComponent from "./_signupComponent";
import SigninComponent from "./_signinComponent";

const MainComponent = () => {
	return (
		<Col className={`${Styles.mainCol}`} lg="6" md="6" sm="12">
			<Container className={`${Styles.container}`}>
				<Tabs
					defaultActiveKey="register"
					id="fill-tab-example"
					className="mb-3"
					fill
				>
					<Tab eventKey="register" title="REGISTER">
						<SignupComponent></SignupComponent>
					</Tab>
					<Tab eventKey="login" title="LOGIN  ">
						<SigninComponent></SigninComponent>
					</Tab>
				</Tabs>
			</Container>
		</Col>
	);
};

export default MainComponent;
