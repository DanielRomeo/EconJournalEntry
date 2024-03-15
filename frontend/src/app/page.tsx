"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Container } from "react-bootstrap";
import Link from "next/link";
import LandingComponent from "./landing/landingComponent";

export default function Home() {
	return (
		<div>
			<LandingComponent></LandingComponent>
		</div>
	);
}
