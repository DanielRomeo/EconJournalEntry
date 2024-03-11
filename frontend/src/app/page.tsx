"use client"

import Image from "next/image";
import styles from "./page.module.css";
import {Container} from 'react-bootstrap'
import LandingComponent from "./pages/landing/landingComponent";

export default function Home() {
  return (
   	<div>
		<Container>
			<LandingComponent></LandingComponent>
			</Container>
    </div>
  );
}
