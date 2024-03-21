"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Container } from "react-bootstrap";
import Head from 'next/head';
import Link from "next/link";
import LandingComponent from "./landing/landingComponent";

export default function Home() {
	return (
		<div>
			<Head>
				<title>
				CHATTER
				</title>
				<meta
				name="description"
				content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
				key="desc"
				/>
			</Head>
			<LandingComponent></LandingComponent>
		</div>
	);
}
