"use client";
import { Row} from "react-bootstrap";
import ImageComponent from "../signin/_imageComponent";
import ConfirmationComponent from "./confirmationComponent";

const ConfirmationPage = ()  =>{
    return (
        <Row>
            <ImageComponent></ImageComponent>
            <ConfirmationComponent></ConfirmationComponent>
         </Row>
    )
}

export default ConfirmationPage;