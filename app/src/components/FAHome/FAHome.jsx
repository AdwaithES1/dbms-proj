import { Link } from "react-router-dom";
import './FAHome.css';
import PropTypes from 'prop-types';
import { useState } from "react";

const FAHome = (props) => {
    const [table1Index, setTable1Index] = useState(true);
    const [table2Index, setTable2Index] = useState(false);

    const handleTable1Index = () => {
        setTable1Index(true);
        setTable2Index(false);
    }

    const handleTable2Index = () => {
        setTable2Index(true);
        setTable1Index(false);
    }
    return (
        <> 
            <div className="f-home-wrapper">
                <div className="f-home-container flex">
                    <div className="f-header flex">
                        <img src="../../public/favicon.ico" width={"50px"}/>
                        <div className="f-logout-btn flex">
                            <Link to="/" className="link">
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    <span>&nbsp;&nbsp;Log Out</span>
                            </Link>
                        </div>
                    </div>
                    <div className="f-navbar flex">
                        <div className="f-profile">
                            <div className="f-profile-content flex">
                                <i className="fa-solid fa-user fa-2xl" style={{color: "#ffffff;"}}></i>
                                <div className="f-profile-text">
                                    <span><b>{props.name}</b></span><br />
                                    <span>{props.userID}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="f-output">
                        <div className="f-switch-btns flex">
                            <div className="f-curr_req" onClick={handleTable1Index}>Current Requests</div>
                            <div className="f-std_hist"onClick={handleTable2Index}>Student History</div>
                        </div>
                        <div className="f-record"> {/*TODO */}
                            { table1Index && <table className="f-record-table f-table-req" border={"2px solid black"}>
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
                            </table> }

                            { table2Index && <table className="f-record-table f-table-hist" border={"2px solid black"}>
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
                                        <td>12345</td>
                                        <td>12345</td>
                                        <td>12345</td>
                                        <td>12345</td>
                                        <td>12345</td>
                                    </tr>
                                    <tr>
                                        <td>12345</td>
                                        <td>12345</td>
                                        <td>12345</td>
                                        <td>12345</td>
                                        <td>12345</td>
                                    </tr>
                                </tbody>
                            </table>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

FAHome.propTypes = {
    name: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired
}

export default FAHome;