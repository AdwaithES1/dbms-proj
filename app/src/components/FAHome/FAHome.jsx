import { Link } from "react-router-dom"
import './FAHome.css'
import PropTypes from 'prop-types'
import { useState } from "react"
import CurrentRequests from "./CurrentRequests/CurrentRequests"
import StudentHistory from "./StudentHistory/StudentHistory"

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
                                <i className="fa-solid fa-user fa-2xl" style={{color: "#ffffff"}}></i>
                                <div className="f-profile-text">
                                    <span><b>{props.name}</b></span><br />
                                    <span>{props.userID}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="f-output">
                        <div className="f-switch-btns flex">
                            <div className="f-curr_req" onClick={handleTable1Index} style={{backgroundColor: table1Index ? "#161A30" :  "#29315d"}}>Current Requests</div>
                            <div className="f-std_hist"onClick={handleTable2Index} style={{backgroundColor: table2Index ? "#161A30" :  "#29315d" , zIndex: table2Index ? "2" : "0" }}>Student History</div>
                        </div>
                        <div className="f-record"> {/*TODO */}
                            { table1Index && <CurrentRequests faID={props.userID} options={props.options} handleStatusColor={props.handleStatusColor}/> }

                            { table2Index && <StudentHistory faID={props.userID} options={props.options} handleStatusColor={props.handleStatusColor}/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

FAHome.propTypes = {
    name: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    options: PropTypes.string.isRequired,
    handleStatusColor: PropTypes.func.isRequired
}

export default FAHome;