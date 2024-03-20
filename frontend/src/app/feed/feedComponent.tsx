"use client";
import { Row, Container, Col, Button, Tabs, Tab } from "react-bootstrap";
import Styles from "../_styles/Feed/FeedComponent.module.scss";
import { FaPen } from "react-icons/fa";
import PostComponent from "./postComponent";
import Link from "next/link";
import SideNavbar from "../_components/sideNavbar";
import TopNavbar from "../_components/topNavbar";

const FeedComponent = () => {
	return (
		<div className={Styles.mainDiv}>
			

			<SideNavbar></SideNavbar>

			<Container className={`${Styles.navbarContainer}`}>
				<TopNavbar></TopNavbar>
			</Container>
			
			<Container className={`${Styles.mainContainer}`}>
				<Row className={`${Styles.headerRow}`}>
					<Col lg="8" md="8" sm="12">
						<h1>FEED</h1>
						<small>Explore different content youd love </small>
					</Col>

					<Col lg="4" md="4" sm="12">
						<Link href="/createpost">
							<Button className={`${Styles.postButton}`}>
								<FaPen /> Post a content
							</Button>
						</Link>
					</Col>
				</Row>

				<Row className={`${Styles.mainRow}`}>
					<Tabs
						defaultActiveKey="register"
						id="fill-tab-example"
						className={`${Styles.tabs} mb-3`}
						fill
					>
						<Tab
							className={`${Styles.tab}`}
							eventKey="Foryou"
							title="For you"
						>
							<PostComponent></PostComponent>
							<PostComponent></PostComponent>
						</Tab>
						<Tab
							className={`${Styles.tab}`}
							eventKey="Featured"
							title="Featured"
						>
							sdfsdfs
						</Tab>
						<Tab
							className={`${Styles.tab}`}
							eventKey="Recent"
							title="Recent"
						>
							re
						</Tab>
					</Tabs>
				</Row>
			</Container>
		</div>
	);
};

export default FeedComponent;
