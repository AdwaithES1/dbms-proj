import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const StudentHistory = (props) => {
    const [appData, setAppData] = useState([]);
    const [order, setOrder] = useState(true);
    const fetchStudHistory = async (faID, order) => {
        await axios.post("https://server-l1f2.onrender.com/api/fa/fetchhistory", { faID: faID, order: order })
            .then(result => {
                console.log(result); //testing
                setAppData(result.data);
            })
    }

    const handleOrder = () => {
        setOrder(!order);
    }

    useEffect(() => {
        if (props.faID) {
            fetchStudHistory(props.faID, order)
        }
    }, [props.faID, order])

    return (
        <table className="f-record-table f-table-hist" border={"2px solid black"}>
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
    )
}

StudentHistory.propTypes = {
    faID: PropTypes.string.isRequired,
    options: PropTypes.string.isRequired,
    handleStatusColor: PropTypes.func.isRequired
}

export default StudentHistory;