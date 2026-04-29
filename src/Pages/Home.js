import React from "react";
import SiteFeedback from "../Components/Sitefeedback";

const Home = () => {
    return (
        <>
        <div className="container mt-5">
            <h1 className="text-center title">Welcome to the <span className="orange">Site Feedback</span> App</h1>
            <p className="text-center text-white">We value your feedback! Please share your thoughts and suggestions to help us improve our site.</p>   
        </div>
        <SiteFeedback/>
        </>
    )
}
export default Home;