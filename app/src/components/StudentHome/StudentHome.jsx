import { Link } from "react-router-dom";
import './StudentHome.css'
import StudentModal from "../StudentModal/StudentModal";
import { useState } from "react";

const StudentHome = () => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }
    return (
        <> 
            <div className="home-wrapper">
                {modal && 
                    <StudentModal toggleModal={toggleModal}/>
                }

                <div className="home-container flex">
                    <div className="header flex">
                        <img src="../../public/favicon.ico" width={"50px"}/>
                        <div className="logout-btn flex">
                            <Link to="/" className="link">
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    <span>&nbsp;&nbsp;Log Out</span>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar flex">
                        <div className="req-btn flex"  onClick={toggleModal}>
                            <i className="fa-solid fa-plus fa-sm"></i>
                            <span>New Request</span>
                        </div> 
                    </div>

                    <div className="record"> {/*TODO */}
                        <table className="record-table" border={"2px solid black"}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Purpose</th>
                                    <th>Time Out</th>
                                    <th>Time In</th>
                                    <th>Number of Days</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                </tr>
                                <tr>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentHome;