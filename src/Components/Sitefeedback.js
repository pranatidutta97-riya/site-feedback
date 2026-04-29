import {React, useState, useEffect} from 'react';
// import { data } from 'react-router-dom';
// import './SiteFeedback.css'
const SiteFeedback = () => {
    const [feedback, setFeedback] = useState("");
    const [siteURL, setSiteURL] = useState("");
    const handleInput = (e) => {
        setSiteURL(e.target.value);
    }
    const getFeedback = async(e) => {
        e.preventDefault();
        const res = await fetch("http://mayurpankhi:9002/sitefeedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "url": siteURL })
        });
        const data = await res.json();
        setFeedback(data);

        // Handle feedback submission logic here
    };


    return (
        <>
        <div className="container mt-5">
           <form className="mt-4" onSubmit={getFeedback}>
                <div className="mb-3">
                    <input type="text" className="form-control" id="siteurl" placeholder="Enter site URL" value={siteURL} onChange={handleInput} />
                </div>
                <button type="submit" className="btn btn-primary">Analyze Feedback</button>
            </form>
            {feedback && (
                <div className="mt-4">
                    <h2 className="text-center text-white">Feedback Analysis</h2>
                    <p className="text-center text-white">{feedback.title}</p>
                    <p className="text-center text-white">{feedback.h1_texts?.join(", ")}</p>
                    <p className="text-center text-white">{feedback.h1_count}</p>
                </div>
            )}
            </div>
        </>
    )
}
export default SiteFeedback;