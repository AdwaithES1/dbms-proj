import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'

const CurrentRequests = (props) => {
    const [appData, setAppData] = useState([]);
    const [order, setOrder] = useState(true); //if order true, then sorting in ascending order
    const [checkboxes, setCheckboxes] = useState({}); // Track checkbox states

    const fetchCurrRequests = async (faID, order) => {
        await axios.post("http://localhost:5000/api/fa/curreq", { faID: faID, order: order })
            .then(result => {
                console.log(result); //testing
                setAppData(result.data);
                // Reset checkboxes state when new data is fetched
                const initialCheckboxes = {};
                result.data.forEach(e => {
                    initialCheckboxes[e.app_no] = { approved: false, rejected: false };
                });
                setCheckboxes(initialCheckboxes);
            })
            .catch(err => {
                console.log(err)
            })
    }

    // APPROVE OR REJECT APPLICATIONS
    const handleInput = async (status, appNo) => {
        await axios.post("http://localhost:5000/api/fa/setstatus", { status, appNo })
        .then(() => {
            fetchCurrRequests(props.faID, order); //refresh data after status update
        })
        .catch(err => console.error(err))
    }

    // SET SORTING ORDER
    const handleOrder = () => {
        setOrder(!order);
    };


    useEffect(() => {
        if (props.faID) {
            fetchCurrRequests(props.faID, order);
        }
    }, [props.faID, order])


    return (
        <table className="f-record-table f-table-req" border={"2px solid black"}>
            <thead>
                <tr>
                    <th style={{width: "10%"}}>Student ID</th>
                    <th className="sort-btn" onClick={handleOrder} style={{width: "13%"}}>
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
                    <th style={{width: "13%"}}>End Date</th>
                    <th style={{width: "15%"}}>Reason</th>
                    <th style={{width: "23%"}}>Leave Address</th>
                    <th style={{width: "8%"}}>Approve</th>
                    <th style={{width: "8%"}}>Reject</th>
                </tr>
            </thead>
            <tbody>
                {appData.map((e, index) => (
                    
                    <tr key={index}>
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
                                <input type="checkbox" value="Approved" style={{transform: "scale(2)"}} checked={checkboxes[e.app_no]?.approved || false}
                                onChange={() => {
                                    const newChecked = !checkboxes[e.app_no]?.approved;
                                    setCheckboxes(prev => ({
                                        ...prev,
                                        [e.app_no]: { ...prev[e.app_no], approved: newChecked, rejected: false } // Uncheck reject if approved
                                    }));
                                    if (newChecked) handleInput('Approved', e.app_no);
                                }}></input>
                            </td>
                            <td>
                                <input type="checkbox" value="Rejected" style={{transform: "scale(2)"}} checked={checkboxes[e.app_no]?.rejected || false}
                                onChange={() => {
                                    const newChecked = !checkboxes[e.app_no]?.rejected;
                                    setCheckboxes(prev => ({
                                        ...prev,
                                        [e.app_no]: { ...prev[e.app_no], rejected: newChecked, approved: false } // Uncheck approve if rejected
                                    }));
                                    if (newChecked) handleInput('Rejected', e.app_no);
                                }}></input>
                            </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

CurrentRequests.propTypes = {
    faID: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired
}

export default CurrentRequests;
