import { Link } from "react-router-dom"
import './WardenHome.css'
import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import axios from "axios"

const WardenHome = (props) => {
    const [appData, setAppData] = useState([]);
    const [hostelData, setHostelData] = useState([]);
    const [order, setOrder] = useState(true); //if order true, then sorting in ascending order
    const fetchHostelDetails = async (wardenID) => {
        await axios.post("https://server-l1f2.onrender.com/api/warden/fetchhostel", { wardenID: wardenID })
            .then(result => {
                console.log(result); //testing
                setHostelData(result.data[0]);
            })
    }

    const fetchStudDetails = async (wardenID, order) => {
        await axios.post("https://server-l1f2.onrender.com/api/warden/fetchcurr", { wardenID: wardenID, order: order })
            .then(result => {
                console.log(result); //testing
                setAppData(result.data);
            })
    }

    const handleOrder = () => {
        setOrder(!order);
    }

    useEffect(() => {
        if (props.userID) {
            fetchStudDetails(props.userID, order);
        }
    }, [props.userID, order])

    useEffect(() => {
        if (props.userID) {
            fetchHostelDetails(props.userID);
        }
    }, [props.userID])

    return (
        <>
            <div className="wrd-home-wrapper">
                <div className="wrd-home-container flex">
                    <div className="wrd-header flex">
                        <img src="../../public/favicon.ico" width={"50px"} />
                        <div className="wrd-logout-btn flex">
                            <Link to="/" className="link">
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                <span>&nbsp;&nbsp;Log Out</span>
                            </Link>
                        </div>
                    </div>
                    <div className="wrd-navbar flex">
                        <div className="wrd-profile">
                            <div className="wrd-profile-content flex">
                                <i className="fa-solid fa-user fa-2xl" style={{ color: "#ffffff" }}></i>
                                <div className="wrd-profile-text">
                                    <span><b>{props.name}</b></span><br />
                                    <span>{props.userID}</span>
                                </div>
                            </div>
                        </div>

                        <div className="wrd-hostel-profile">
                            <div className="wrd-profile-content-flex">
                                <div className="wrd-profile-text">
                                    <span>Hostel Name: <b>{hostelData.hostel_name}</b></span><br />
                                    <span>Strength: <b>{hostelData.strength}</b></span><br />
                                    <span>On Leave: <b>{hostelData.on_leave}</b></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="wrd-table-cap">{hostelData.hostel_name} - History</span> {/* hostelname instead of hostel */}
                    <div className="wrd-record"> {/*TODO */}
                        <table className="wrd-record-table" border={"2px solid black"}>
                            <thead>
                                <tr>
                                    <th>App No.</th>
                                    <th style={{ width: "10%" }}>Student ID</th>
                                    <th className="sort-btn" onClick={handleOrder} style={{ width: "13%" }}>
                                        Start Date &nbsp;&nbsp;
                                        {order ? (
                                            <i
                                                className="fa-solid fa-caret-up fa-xs"
                                                style={{ color: "#f0ece5" }}
                                            ></i>
                                        ) : (
                                            <i
                                                className="fa-solid fa-caret-down fa-xs"
                                                style={{ color: "#f0ece5" }}
                                            ></i>
                                        )}
                                    </th>
                                    <th style={{ width: "13%" }}>End Date</th>
                                    <th style={{ width: "15%" }}>Reason</th>
                                    <th style={{ width: "23%" }}>Leave Address</th>
                                    <th style={{ width: "15%" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appData.map((e, index) => (
                                    <tr key={index}>
                                        <td>{e.app_no}</td>
                                        <td>{e.student_id}</td>
                                        <td>
                                            {new Date(
                                                e.start_date
                                            ).toLocaleString("en-US", props.options)}
                                        </td>
                                        <td>
                                            {new Date(
                                                e.end_date
                                            ).toLocaleString("en-US", props.options)}
                                        </td>
                                        <td>{e.reason}</td>
                                        <td>{e.leave_addr}</td>
                                        <td>
                                            <div
                                                className="std-status_bg"
                                                style={{ color: props.handleStatusColor(e.app_status), }}>
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

WardenHome.propTypes = {
    name: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    handleStatusColor: PropTypes.func.isRequired
}

export default WardenHome;