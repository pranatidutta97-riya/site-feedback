import {React, useState, useEffect} from 'react';
import "./Sitefeedback.css";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

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
    };
    // Chart data preparation
    const issueChartData = feedback && {
        labels: Object.keys(feedback.issues),
        datasets: [
        {
            label: "Accessibility Issues",
            data: Object.values(feedback.issues),
            borderColor: 'rgb(255, 255, 255)',
            backgroundColor: [
            "#ea580c",
            "#36a2eb",
            "#ffce56",
            "#8bc34a"
            ]
        }
        ]
    };
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
            labels: {
                color: "#e5e7eb" // white text
            }
            }
        },
        scales: {
            x: {
            ticks: {
                color: "#e5e7eb"
            },
            grid: {
                color: "rgba(255,255,255,0.1)" // light grid
            }
            },
            y: {
            ticks: {
                color: "#e5e7eb"
            },
            grid: {
                color: "rgba(255,255,255,0.1)"
            }
            }
        }
        };

    const severityChartData = feedback && {
        labels: ["Critical", "Moderate", "Minor"],
        datasets: [
        {
            data: [
            feedback.severity?.critical,
            feedback.severity?.moderate,
            feedback.severity?.minor
            ],
            backgroundColor: ["#ea580c", "#fb8c00", "#43a047"]
        }
        ]
    };

    


    return (
        <>
        <div className="container mt-5">
           <form className="mt-4 d-flex" onSubmit={getFeedback}>
                <div className="me-3 input_wrap">
                    <input type="text" className="form-control" id="siteurl" placeholder="Enter site URL" value={siteURL} onChange={handleInput} />
                </div>
                <button type="submit" className="btn btn-primary">Analyze Feedback</button>
            </form>
            {feedback && (
                <div className="mt-4 text-white">
                    <h2 className="text-center text-white">Accessibility Report</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="box_wrap mt-4">
                                <div className="d-flex mt-4">
                                    <h3 className="text-white">Score</h3>
                                    <div>{feedback.score}</div>
                                </div>
                                <div className="mt-3">
                                    <p><strong>Title:</strong> {feedback.title}</p>
                                    <p><strong>H1 Count:</strong> {feedback.h1_count}</p>
                                    <p><strong>H1 Texts:</strong> {feedback.h1_texts?.join(", ")}</p>
                                </div>
                            </div>
                            <div className="box_wrap mt-4">
                                <h4 className="text-center">Issue Breakdown</h4>
                                {feedback.issues &&(
                                    <div>{Object.keys(feedback.issues).map((key) => (
                                        <div key={key}>
                                            <strong>{key}:</strong> {feedback.issues[key]}
                                        </div>
                                    ))}</div>
                                )}
                                <hr />
                                <h4 className="text-center">Severity Distribution</h4>
                                    {feedback.severity && (
                                       <div>{Object.keys(feedback.severity).map((key) => (
                                            <div key={key}>
                                                <strong>{key}:</strong> {feedback.severity[key]}
                                            </div>
                                        ))}
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="box_wrap mt-4">
                                {/* ISSUE BAR CHART */}
                                <h4 className="text-center">Issue Breakdown Chart</h4>
                                {feedback.issues &&(
                                    <Bar data={issueChartData} options={chartOptions} />
                                )}
                            </div>
                            <div className="box_wrap mt-4">
                                {/* SEVERITY PIE CHART */}
                                <div className="mt-5" style={{ maxWidth: "400px", margin: "0 auto" }}>
                                    <h4 className="text-center">Severity Distribution</h4>
                                    {feedback.severity && (
                                        <Pie data={severityChartData} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </>
    )
}
export default SiteFeedback;