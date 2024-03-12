"use client";
import {Button,Col, Container, Row} from 'react-bootstrap'
import Styles from '../_styles/Confirmation/ConfirmationComponent.module.scss'
import PinCodeInput from './codeInput';
import { IoIosArrowDropleft } from "react-icons/io";
import Link from 'next/link';



const ConfirmationComponent = () => {

    return (
        <Col className={`${Styles.mainCol}`} lg="6" md="6" sm="12">
            <div className={`${Styles.firstArea}`}>
                <Container>
                    <Link href='/signin'>
                        <Button className={`${Styles.backButton}`} variant='dark'><IoIosArrowDropleft size={25} /> Back</Button>
                    </Link>
                    
                </Container>
            </div>

            <Container className={`${Styles.container}`}>
                <Row className={`${Styles.informationRow}`}>
                    <h1>Enter confirmation code</h1>
                    <small>We emailed you a code. Please input the code here for account verification</small>
                </Row>

                <Row className={`${Styles.boxesRow}`}>
                    <PinCodeInput ></PinCodeInput>
                </Row>

                <Row className={`${Styles.buttonsRow}`}>
                    <Button className={`${Styles.createAccountButton}`} >Create account</Button>
                </Row>

            </Container>
        </Col>
    )
}

export default ConfirmationComponent;