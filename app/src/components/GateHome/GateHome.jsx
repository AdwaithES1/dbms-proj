import { Link } from "react-router-dom"
import './GateHome.css'
import PropTypes from 'prop-types'
import { useState } from "react"
import InsideCampus from "./InsideCampus"
import OutsideCampus from "./OutsideCampus"
import ExpiredApplications from "./ExpiredApplications"

const FAHome = (props) => {
    const [table1Index, setTable1Index] = useState(true);
    const [table2Index, setTable2Index] = useState(false);
    const [table3Index, setTable3Index] = useState(false);

    const handleTable1Index = () => {
        setTable1Index(true);
        setTable2Index(false);
        setTable3Index(false);
    }

    const handleTable2Index = () => {
        setTable2Index(true);
        setTable1Index(false);
        setTable3Index(false);
    }

    const handleTable3Index = () => {
        setTable3Index(true);
        setTable1Index(false);
        setTable2Index(false);
    }
    return (
        <> 
            <div className="g-home-wrapper">
                <div className="g-home-container flex">
                    <div className="g-header flex">
                        <img src="../../public/favicon.ico" width={"50px"}/>
                        <div className="g-logout-btn flex">
                            <Link to="/" className="link">
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    <span>&nbsp;&nbsp;Log Out</span>
                            </Link>
                        </div>
                    </div>
                    <div className="g-navbar flex">
                        <div className="g-profile">
                            <div className="g-profile-content flex">
                                <i className="fa-solid fa-user fa-2xl" style={{color: "#ffffff"}}></i>
                                <div className="g-profile-text">
                                    <span><b>{(props.name).charAt(0).toUpperCase() + props.name.slice(1)}</b></span><br />
                                    <span>{(props.userID).charAt(0).toUpperCase() + props.userID.slice(1)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="g-output">
                        <div className="g-switch-btns flex">
                            <div className="g-in_campus" onClick={handleTable1Index} style={{backgroundColor: table1Index ? "#161A30" :  "#29315d"}}>Inside Campus</div>
                            <div className="g-out_campus" onClick={handleTable2Index} style={{backgroundColor: table2Index ? "#161A30" :  "#29315d" , zIndex: table2Index ? "2" : "0" }}>Outside Campus</div>
                            <div className="g-exp_apps" onClick={handleTable3Index} style={{backgroundColor: table3Index ? "#161A30" :  "#29315d" , zIndex: table3Index ? "2" : "0" }}>Expired Applications</div>
                        </div>
                        <div className="g-record"> {/*TODO */}
                            { table1Index && <InsideCampus options={props.options}/> }

                            { table2Index && <OutsideCampus options={props.options} />}

                            { table3Index && <ExpiredApplications options={props.options} handleStatusColor={props.handleStatusColor}/>}
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
    options: PropTypes.object.isRequired,
    handleStatusColor: PropTypes.func.isRequired
}

export default FAHome;