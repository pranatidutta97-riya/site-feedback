import react from "react";
import { Link, useNavigate } from "react-router-dom";

function Header(){
    
    return(
        <>
            <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container">
                    <Link className="navbar-brand" to="/"><img src="/Assets/logo.png" alt="Logo" className="img-fluid" style={{ maxWidth: "70px" }}/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sitefeedback">Site Feedback</Link>
                        </li>
                    </ul>
                    </div> */}
                </div>
            </nav>
        </>
    )
}
export default Header;