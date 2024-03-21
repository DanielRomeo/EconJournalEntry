"use client";
import Link from "next/link";
import { Row, Container, Col, Button, Tabs, Tab, Card } from "react-bootstrap";
import Styles from "../_styles/Feed/PostComponent.module.scss";
import Image from "next/image";
import { SlBookOpen } from "react-icons/sl";
import { useState, useEffect } from "react";
import { db, auth } from "../_components/firebaseConfig";
import { doc, getDocs } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
// import 

// This is the post component that goes on the Feed page and the Analytics page
const PostComponent: React.FC = () => {
	const [posts, setPosts] = useState<any>([]);
  	const [loading, setLoading] = useState(false);

	const [height, setHeight] = useState<number>(0); // State to store calculated height

	const handleLoadComplete = (img: any) => {
		const newHeight =
			img.naturalHeight * (img.clientWidth / img.naturalWidth);
		setHeight(newHeight);
	};

	useEffect(() => {
		const fetchData = async () => {
            try {
                const ref = collection(db, 'posts');
                const snapshot = await getDocs(ref);

                const data: any[] = [];
                await snapshot.forEach(doc => {
                    // data.push({ id: doc.id, ...doc.data() });
					data.push({...doc.data()})
					// console.log(doc.data())
					// console.log("-------------------------------------")
                });

                setPosts(data);
				// console.log(data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Ensure loading state is set to false even in case of error
            }
        };

        fetchData();
	}, []);

	return (
		<div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <Card key={post.id} className={`${Styles.card}`}>
							
							{/* {posts ? <div>{JSON.stringify(posts)}</div>: <div></div>} */}
							<Link className={`${Styles.link}`} href='/post/1'>
							<Card.Body className={`${Styles.cardBodyUserinfo}`}>
								<div className={`${Styles.imageDiv}`}>
									<Image
										className={`${Styles.image}`}
										src="/writeSectionImage1.jpg"
										width={100}
										height={100}
										alt="Picture of the author"
									/>
								</div>

								<div className={`${Styles.detailsDiv}`}>
									<h6>{post["firstname"]}</h6>
									<p>
										Product manager .<span>May 25th, 2023</span>
									</p>
								</div>
							</Card.Body>

							<Card.Body className={`${Styles.cardBodyPostDetails}`}>
								<Card.Title className={`${Styles.cardBodyPostDetailsTitle}`}>
									Starting out as a Product designer
								</Card.Title>
								<Card.Text>
									<SlBookOpen /> 10 mins read{" "}
								</Card.Text>
								<Card.Text>
									Some quick example text to build on the card title and make
									up the bulk of the card&apos;s content.
								</Card.Text>

								<Image
									className={`${Styles.postThumbnail}`}
									src="/postthumbnailImage.jpg"
									width={400}
									height={height}
									onLoadingComplete={handleLoadComplete}
									alt="Picture of the author"
								/>
							</Card.Body>
							</Link>
						</Card>
                        ))
                    ) : (
                        <div>No posts found</div>
                    )}
                </div>
            )}
        </div>
	);
};

export default PostComponent;


