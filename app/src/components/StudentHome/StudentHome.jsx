import { Link } from "react-router-dom";
import "./StudentHome.css";
import StudentModal from "../StudentModal/StudentModal";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const StudentHome = (props) => {
    const [modal, setModal] = useState(false);
    const [appData, setAppData] = useState([]);
    const [order, setOrder] = useState(true); //if order true, then sorting in ascending order
    const [disableBtn, setDisableBtn] = useState(false);

    // SET SORTING ORDER
    const handleOrder = () => {
        setOrder(!order);
    };

    const fetchUser = async (userID, order) => {
        //used to fetch the application history

        await axios
            .post("http://localhost:5000/api/student/fetchreq", {
                userID: userID,
                order: order,
            })
            .then((result) => {
                console.log(result); //testing
                setAppData(result.data);
            })
            .catch((err) => console.error(err));
    };

    const checkPendingReq = async (userID) => {
        await axios
        .post("http://localhost:5000/api/student/checkpending", {
            userID: userID,
        })
        .then(result => {
            console.log(result);
            setDisableBtn(result.data)
        })
    }

    useEffect(() => {
        if (props.userID) {
            fetchUser(props.userID, order);
        }
    }, [props.userID, order]);

    useEffect(() => {
        if (props.userID) {
            checkPendingReq(props.userID);
        }
    }, [props.userID]);

    // Disable body scroll when modal is open
    useEffect(() => {
        if (modal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset"; // Reset to default
        }

        // Clean up the effect on unmount
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [modal]);

    const toggleModal = () => {
        setModal(!modal);
        fetchUser(props.userID);
        checkPendingReq(props.userID);
    };

    return (
        <>
            <div className="std-home-wrapper">
                {modal && (
                    <StudentModal
                        toggleModal={toggleModal}
                        userID={props.userID}
                    />
                )}

                <div className="std-home-container flex">
                    <div className="std-header flex">
                        <img src="../../public/favicon.ico" width={"50px"} />
                        <div
                            className="std-logout-btn flex"
                            onClick={props.onLogout}
                        >
                            <Link to="/" className="std-link">
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                <span>&nbsp;&nbsp;Log Out</span>
                            </Link>
                        </div>
                    </div>
                    <div className="std-navbar flex">
                        <div className="std-profile">
                            <div className="std-profile-content flex">
                                <i
                                    className="fa-solid fa-user fa-2xl"
                                    style={{ color: "#ffffff" }}
                                ></i>
                                <div className="std-profile-text">
                                    <span>
                                        <b>{props.name}</b>
                                    </span>
                                    <br />
                                    <span>{props.userID}</span>
                                </div>
                            </div>
                        </div>
                        <button className="std-req-btn flex" onClick={toggleModal} disabled={disableBtn}>
                            <i className="fa-solid fa-plus fa-sm"></i>
                            <span>New Request</span>
                        </button>
                    </div>

                    <span className="std-table-cap">Your Requests</span>
                    { disableBtn && <div className="std-error-text">*Cannot create a new request if you currenlty have a pending/approved request or you are currenlty on leave</div>}
                    <div className="std-record">
                        {/*TODO */}
                        <table
                            className="std-record-table"
                            border={"2px solid black"}
                        >
                            <thead>
                                <tr>
                                    <th>App No.</th>
                                    <th className="sort-btn" onClick={handleOrder}>
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
                                    <th>End Date</th>
                                    <th>Reason</th>
                                    <th>Working Days</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appData.map((e, index) => (
                                    <tr key={index}>
                                        <td>{e.app_no}</td>
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
                                        <td>{e.no_of_working_days}</td>
                                        <td>
                                            <div
                                                className="std-status_bg"
                                                style={{ color: props.handleStatusColor(e.app_status)}}>
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
    );
};

StudentHome.propTypes = {
    name: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    handleStatusColor: PropTypes.func.isRequired,
    onLogout: PropTypes.func
};

export default StudentHome;
