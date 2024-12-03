import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const ExpiredApplications = (props) => {
    const [appData, setAppData] = useState([]);
    const [order, setOrder] = useState(true);
    const fetchStudHistory = async (order) => {
        await axios.post("https://server-l1f2.onrender.com/api/gate/expired", { order: order })
            .then(result => {
                console.log(result); //testing
                setAppData(result.data);
            })
    }

    const handleOrder = () => {
        setOrder(!order);
    }

    useEffect(() => {
        fetchStudHistory(order)
    }, [order])

    return (
        <table className="f-record-table f-table-hist" border={"2px solid black"}>
            <thead>
                <tr>
                    <th className="sort-btn" onClick={handleOrder} style={{ width: "9%" }}>
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
                    <th style={{ width: "10%" }}>Student ID</th>
                    <th style={{ width: "15%" }}>Checked Out Date</th>
                    <th style={{ width: "15%" }}>Checked In Date</th>
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
                                e.gateentry[0].out_date
                            ).toLocaleString("en-US", props.options)}
                        </td>
                        <td>
                            {new Date(
                                e.gateentry[0].in_date
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
    )
}

ExpiredApplications.propTypes = {
    options: PropTypes.object.isRequired,
    handleStatusColor: PropTypes.func.isRequired
}

export default ExpiredApplications;