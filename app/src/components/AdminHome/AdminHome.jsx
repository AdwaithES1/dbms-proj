import { Link } from "react-router-dom"
import './AdminHome.css'
import PropTypes from 'prop-types'
import axios from "axios"
import { useEffect, useState } from "react"

const AdminHome = (props) => {
    const [order, setOrder] = useState(true);
    const [appData, setAppData] = useState([]);

    const fetchAllDetails = async (order) => {
        await axios.post("http://localhost:5000/api/admin/fetchall", { order: order })
        .then(result => {
            console.log(result);
            setAppData(result.data);
        })
    }

    const handleOrder = () => {
        setOrder(!order);
    }

    useEffect(() => {
          fetchAllDetails(order);
    }, [order])
    

    return (
        <> 
            <div className="adm-home-wrapper">
                <div className="adm-home-container flex">
                    <div className="adm-header flex">
                        <img src="../../public/favicon.ico" width={"50px"}/>
                        <div className="adm-logout-btn flex">
                            <Link to="/" className="link">
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    <span>&nbsp;&nbsp;Log Out</span>
                            </Link>
                        </div>
                    </div>
                    <div className="adm-navbar flex">
                        <div className="adm-profile">
                            <div className="adm-profile-content flex">
                                <i className="fa-solid fa-user fa-2xl" style={{color: "#ffffff;"}}></i>
                                <div className="adm-profile-text">
                                    <span><b>{props.name}</b></span><br />
                                    <span>{props.userID}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="adm-table-cap">College Leave History</span>
                    <div className="adm-record"> {/*TODO */}
                        <table className="adm-record-table" border={"2px solid black"}>
                            <thead>
                            <tr>
                                <th className="sort-btn" onClick={handleOrder} style={{width: "13%"}}>
                                    App No. &nbsp;&nbsp;
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
                                <th style={{width: "10%"}}>Student ID</th>
                                <th style={{width: "13%"}}>Start Date</th>
                                <th style={{width: "13%"}}>End Date</th>
                                <th style={{width: "10%"}}>Reason</th>
                                <th style={{width: "20%"}}>Leave Address</th>
                                <th style={{width: "13%"}}>Work Days</th>
                                <th style={{width: "13%"}}>Status</th>
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
                                        <td>{e.no_of_working_days}</td>
                                        <td>      
                                            <div
                                                className="std-status_bg"
                                                style={{ color: props.handleStatusColor(e.app_status),}}>
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

AdminHome.propTypes = {
    name: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    options: PropTypes.string.isRequired,
    handleStatusColor: PropTypes.func.isRequired
}

export default AdminHome;