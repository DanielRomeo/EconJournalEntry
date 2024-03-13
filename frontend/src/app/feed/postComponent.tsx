"use client";
import { Row, Container, Col, Button, Tabs, Tab, Card} from "react-bootstrap";
import Styles from '../_styles/Feed/PostComponent.module.scss'
import { FaPen } from "react-icons/fa";
import Image from "next/image";


// This is the post component that goes on the Feed page and the Analytics page
const PostComponent = ()  => {
    return (
        <Card className={`${Styles.card}`}>

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
                    <h6>Grace Ikpang</h6>
                    <p>Product manager .<span>May 25th, 2023</span></p>
                </div>
            </Card.Body>

            <Card.Body className={`${Styles.cardBodyPostDetails}`}>
                <Card.Title></Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text >
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default PostComponent;