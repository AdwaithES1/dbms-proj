import { Link } from "react-router-dom"
import './StudentHome.css'
import StudentModal from "../StudentModal/StudentModal"
import { useEffect, useState } from "react"
import axios from "axios"
import PropTypes from 'prop-types'

const StudentHome = (props) => {
    const [modal, setModal] = useState(false);
    const [appData, setAppData] = useState([]);
    const [order, setOrder] = useState(true); //if order true, then sorting in ascending order

    //DATE SETUP OPTIONS
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true // Use 12-hour clock
    };

    // SET STATUS COLOR
    const handleStatusColor = (s) => {
        if (s === "Pending") return "#FFD700"; // Gold
        else if (s === "Approved") return "#28A745"; // Success green
        else if (s === "Declined") return "#DC3545"; // Danger red
        else if (s === "On Time") return "#17A2B8"; // Info blue
        else if (s === "Late") return "#FFC107"; // Warning yellow
    };
    
    // SET SORTING ORDER
    const handleOrder = () => {
        setOrder(!order);
    }

    const fetchUser = async (userID, order) => { //used to fetch the application history

        await axios.post("http://localhost:5000/api/student/fetchreq", { userID: userID, order: order})
        .then(result => {
            console.log(result); //testing
            setAppData(result.data);
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        if (props.userID) {
            fetchUser(props.userID, order);
        }
    }, [props.userID, order]);
    
    const toggleModal = () => {
        setModal(!modal);
        fetchUser(props.userID);
    }


    return (
        <> 
            <div className="std-home-wrapper">
                {modal && 
                    <StudentModal toggleModal={toggleModal} userID={props.userID}/>
                }

                <div className="std-home-container flex">
                    <div className="std-header flex">
                        <img src="../../public/favicon.ico" width={"50px"}/>
                        <div className="std-logout-btn flex" onClick={props.onLogout}>
                            <Link to="/" className="std-link">
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    <span>&nbsp;&nbsp;Log Out</span>
                            </Link>
                        </div>
                    </div>
                    <div className="std-navbar flex">
                        <div className="std-profile">
                            <div className="std-profile-content flex">
                                <i className="fa-solid fa-user fa-2xl" style={{color: "#ffffff"}}></i>
                                <div className="std-profile-text">
                                    <span><b>{props.name}</b></span><br />
                                    <span>{props.userID}</span>
                                </div>
                            </div>
                        </div>
                        <div className="std-req-btn flex"  onClick={toggleModal}>
                            <i className="fa-solid fa-plus fa-sm"></i>
                            <span>New Request</span>
                        </div> 
                    </div>

                    <span className="std-table-cap">Your Requests</span>
                    <div className="std-record"> {/*TODO */}
                        <table className="std-record-table" border={"2px solid black"}>
                            <thead>
                                <tr>
                                    <th>App No.</th>
                                    <th onClick={handleOrder}>
                                        Start Date &nbsp;&nbsp; 
                                        {(order) ? <i className="fa-solid fa-caret-up fa-xs" style={{color: "#f0ece5;"}}></i>
                                           : <i className="fa-solid fa-caret-down fa-xs" style={{color: "#f0ece5;"}}></i>}
                                    </th>
                                    <th>End Date</th>
                                    <th>Reason</th>
                                    <th>Working Days</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appData.map((e, index) => (
                                    <tr key={index}> {/* Wrap <td> elements in <tr> */}
                                        <td>{e.app_no}</td>
                                        <td>{new Date(e.start_date).toLocaleString('en-US', options )}</td>
                                        <td>{new Date(e.end_date).toLocaleString('en-US', options )}</td>
                                        <td>{e.reason}</td>
                                        <td>{e.no_of_working_days}</td>
                                        <td>
                                            <div className="std-status_bg" style={{backgroundColor: handleStatusColor(e.app_status)}}>
                                                {e.app_status}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

StudentHome.propTypes = {
    name: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
}

export default StudentHome;