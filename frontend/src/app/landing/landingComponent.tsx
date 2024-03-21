import LandingNavbar from "./navbarComponent";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import Styles from "../_styles/LandingPage/LandingComponent.module.scss";
import Image from "next/image";
import { Image as ImageReact } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";



const LandingComponent = () => {

	const [height, setHeight] = useState<number>(0); // State to store calculated height

	const handleLoadComplete = (img: any) => {
		const newHeight =
			img.naturalHeight * (img.clientWidth / img.naturalWidth);
		setHeight(newHeight);
	};

	return (
		<div>
			<LandingNavbar></LandingNavbar>
			{/* Landing section */}
			<div className={`${Styles.landingSection}`}>
				<Container className={`${Styles.landingSectionContainer}`}>
					<h1>Welcome to chatter: A Haven for Text-Based Content</h1>
					<small>
						Unleash the Power of Words, Connect with Like-minded
						Readers and Writers{" "}
					</small>
					<br />
					<Button className={`${Styles.landingButton}`}>
						Get started
					</Button>
				</Container>
			</div>
			{/* About secttion */}
			<div className={`${Styles.aboutSection}`}>
				<Container className={`${Styles.aboutSectionContainer}`}>
					<Row className={`${Styles.aboutSectionRow}`}>
						<Col className={`${Styles.aboutSectionCol1}`} lg="6" md="6" sm="12">
							<h1>About Chatter</h1>

							<p>
								Chatter is a multi-functional platform where
								authors and readers can have access to their own
								content. It aims to be a traditional bookworms
								heaven and a blog to get access to more text
								based content. Our vision is to foster an
								inclusive and vibrant community where diversity
								is celebrated. We encourage open-mindedness and
								respect for all individuals, regardless of their
								backgrounds or beliefs. By promoting dialogue
								and understanding, we strive{" "}
							</p>
						</Col>

						<Col className={`${Styles.aboutSectionCol2}`} lg="6" md="6" sm="12">
							{/* <Image
								className={`${Styles.image}`}
								// style={{'border':'1px solid red'}}
								src="/aboutSectionImage.jpg"
								// width={100}
								// height={height}
								// onLoadingComplete={handleLoadComplete}
								layout="fill"
								alt="Picture of a group of asian individuals in a library."
							/> */}
							<Card className="mb-3">
								<Card.Img variant="top" className="dynamic-image" src="/aboutSectionImage.jpg" />
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
			{/* Why you should join section */}
			<div className={`${Styles.whyJoinSection}`}>
				<Container className={`${Styles.whyJoinSectionContainer}`}>
					<Row className={`${Styles.headerRow}`}>
						<h1>Why you should join chatter</h1>
					</Row>

					<Row className={`${Styles.descriptionRow}`}>
						<p>
							Our goal is to make writers and readers see our
							platform as their next heaven for blogging, ensuring
							ease in interactions, connecting with like-minded
							peers, have access to favorite content based on
							interests and able to communicate your great ideas
							with people
						</p>
					</Row>

					<Row className={`${Styles.cardsRow}`}>
						<Col lg="4" md="6" sm="12">
							<Card className={`${Styles.card}`}>
								<Card.Body>
									<Card.Title>
										<FaChartLine size={60} />
									</Card.Title>
									<Card.Title
										className={`${Styles.cardTitle}`}
									>
										Analytics
									</Card.Title>
									<Card.Text>
										Analytics to track the number of views,
										likes and comment and also analyze the
										performance of your articles over a
										period of time
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>

						<Col lg="4" md="6" sm="12">
							<Card className={`${Styles.card}`}>
								<Card.Body>
									<Card.Title>
										<MdGroups size={60} />
									</Card.Title>
									<Card.Title
										className={`${Styles.cardTitle}`}
									>
										Social interactions
									</Card.Title>
									<Card.Text>
										Users on the platform can interact with
										posts they like, comment and engage in
										discussions
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>

						<Col lg="4" md="6" sm="12">
							<Card className={`${Styles.card}`}>
								<Card.Body>
									<Card.Title>
										<IoNewspaperOutline size={60} />
									</Card.Title>
									<Card.Title
										className={`${Styles.cardTitle}`}
									>
										Content creation
									</Card.Title>
									<Card.Text>
										Write nice and appealing with our
										in-built markdown, a rich text editor
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>{" "}
			{/* End of why join section*/}
			{/* Person section */}
			<div className={`${Styles.personSection}`}>
				<Container className={`${Styles.personSectionContainer}`}>
					<Row className={`${Styles.personSectionRow}`}>
						<Col className={`${Styles.col1}`} lg="4" md="6" sm="12">
							
							<Image
								className={`${Styles.image}`}
								src="/personSectionImage.png"
								width={250}
								height={250}
								onLoadingComplete={handleLoadComplete}
								alt="Picture of the author that uses the platform to write journals."
							/>
						</Col>

						<Col className={`${Styles.col2}`} lg="8" md="6" sm="12">
							<p>
								&quot;Chatter has become an integral part of my
								online experience. As a user of this incredible
								blogging platform, I have discovered a vibrant
								community of individuals who are passionate
								about sharing their ideas and engaging in
								thoughtful discussions.&quot;
							</p>

							<h6>
								Adebobola Muhydeen,{" "}
								<small>Software developer at Apple</small>{" "}
							</h6>

							<Button className={`${Styles.joinButton}`}>
								Join chatter
							</Button>
						</Col>
					</Row>
				</Container>
			</div>
			{/* write, read, connect section */}
			<div className={`${Styles.writeSection}`}>
				<Container className={`${Styles.writeSectionContainer}`}>
					<Row className={`${Styles.writeSectionRow}`}>
						<Col className={`${Styles.col1}`} lg="6" md="6" sm="12">
							<Container>
								<Row className={`${Styles.imageDivisionRow}`}>
									<Col lg='6' md='6' sm='6'
										className={`${Styles.imageDivisionRowCol1}`}
									>
											<Image
												className={`${Styles.image}`}
												src="/writeSectionImage1.jpg"
												width={150}
												height={height}
												onLoadingComplete={handleLoadComplete}
												alt="Picture of the author that uses the platform to write journals."
												/>
											<Image
												className={`${Styles.image}`}
												src="/writeSectionImage2.jpg"
												width={150}
												height={height}
												onLoadingComplete={handleLoadComplete}
												alt="Picture of the author that uses the platform to write journals."
												/>
									</Col>

									<Col lg='6' md='6' sm='6'
										className={`${Styles.imageDivisionRowCol2}`}
									>
											<Image
												className={`${Styles.image}`}
												src="/writeSectionImage3.jpg"
												width={150}
												height={height}
												onLoadingComplete={handleLoadComplete}
												alt="Picture of the author that uses the platform to write journals."
												/>
									</Col>
								</Row>
							</Container>
						</Col>

						<Col className={`${Styles.col2}`} lg="6" md="6" sm="12">
							<h1>
								Write, read and connect with great minds on
								chatter
							</h1>
							<p>
								Share people your great ideas, and also read
								write-ups based on your interests. connect with
								people of same interests and goals{" "}
							</p>
							<Button className={`${Styles.getStartedButton}`}>
								Get started
							</Button>
						</Col>
					</Row>
				</Container>
			</div>
			{/* footer */}
			<div className={`${Styles.footer}`}>
				<Container>
					<Row>
						<Col lg="3" md="3" sm="12">
							<h4>Chatter</h4>
						</Col>

						<Col lg="3" md="3" sm="12">
							<h4>Explore</h4>
							<p>Community</p>
							<p>Trending Blogs</p>
							<p>Chatter for teams</p>
						</Col>

						<Col lg="3" md="3" sm="12">
							<h4>Support</h4>
							<p>Suppor docs</p>
							<p>Join slack</p>
							<p>Contact</p>
						</Col>

						<Col lg="3" md="3" sm="12">
							<h4>Official blog</h4>
							<p>Official blog</p>
							<p>Engineering blog</p>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default LandingComponent;
