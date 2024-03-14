"use client";
import { Row} from "react-bootstrap";
import FeedComponent from "./feedComponent";
// import { middleware } from "../middleware";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import isAuthenticated from "../_components/isAuthenticated";

// authentication stuff:
// import {getSession} from 'next-auth/react'



const FeedPage = ()  =>{
    // const router = useRouter();

    
    // useEffect( ()=>{
    //     if (!isAuthenticated()) {
    //         router.push('/login'); // Redirect to login if not authenticated
    //       }

    // }, []);

    return (
        <div>
            <FeedComponent></FeedComponent>
        </div>
    )
}

export default FeedPage;