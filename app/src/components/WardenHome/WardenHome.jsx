import { Link } from "react-router-dom"
import './WardenHome.css'
import PropTypes from 'prop-types'
import { useState } from "react"

const WardenHome = (props) => {
    const [hostel, setHostel] = useState("Hostel");
    return (
        <> 
            <div className="wrd-home-wrapper">
                <div className="wrd-home-container flex">
                    <div className="wrd-header flex">
                        <img src="../../public/favicon.ico" width={"50px"}/>
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
                                <i className="fa-solid fa-user fa-2xl" style={{color: "#ffffff;"}}></i>
                                <div className="wrd-profile-text">
                                    <span><b>{props.name}</b></span><br />
                                    <span>{props.userID}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="wrd-table-cap">{hostel} History</span> {/* hostelname instead of hostel */}
                    <div className="wrd-record"> {/*TODO */}
                        <table className="wrd-record-table" border={"2px solid black"}>
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

WardenHome.propTypes = {
    name: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    hostel: PropTypes.string.isRequired
}

export default WardenHome;