import { Link } from "react-router-dom"
import './AdminHome.css'
import PropTypes from 'prop-types'

const AdminHome = (props) => {
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

AdminHome.propTypes = {
    name: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired
}

export default AdminHome;