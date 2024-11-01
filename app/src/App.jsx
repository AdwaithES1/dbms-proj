import './App.css'
import FAHome from "./components/FAHome/FAHome"
import LoginPage from './components/LoginPage/LoginPage'
import StudentHome from "./components/StudentHome/StudentHome"
import WardenHome from "./components/WardenHome/WardenHome"
import AdminHome from "./components/AdminHome/AdminHome"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from "react"

function App() {
    const [name, setName] = useState(localStorage.getItem("name") || "Username");
    const [userID, setUserID] = useState(localStorage.getItem("userID") || "202XBXXABCD");

    const handleCred = (name, userID) => {
        setName(name);
        setUserID(userID);
        localStorage.setItem("name", name);
        localStorage.setItem("userID", userID);
    }

    const handleLogOut = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("userID");

        setName("Username");
        setUserID("202XBXXABCD");
    }

    
    // SET STATUS COLOR
    const handleStatusColor = (s) => {
        if (s === "Pending") return "#FEC72E"; // Gold
        else if (s === "Approved") return "#00D280"; // Success green
        else if (s === "Rejected") return "#F9281B"; // Danger red
        else if (s === "Late") return "E98854"; // Warning yellow
        else if (s === "Expired") return "908E90"; // Info blue
    };

    //DATE SETUP OPTIONS
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true, // Use 12-hour clock
    };


    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginPage  handleCred={handleCred}/>}/>
                    <Route exact path="/student/home" element={<StudentHome  name={name} userID={userID} onLogOut={handleLogOut} handleStatusColor={handleStatusColor} options={options}/>}/>
                    <Route exact path="/fa/home" element={<FAHome  name={name} userID={userID} onLogOut={handleLogOut} handleStatusColor={handleStatusColor}
                    options={options} />}/>
                    <Route exact path="/warden/home" element={<WardenHome  name={name} userID={userID} onLogOut={handleLogOut} handleStatusColor={handleStatusColor} options={options}/>}/>
                    <Route exact path="/admin/home" element={<AdminHome  name={name} userID={userID} onLogOut={handleLogOut} handleStatusColor={handleStatusColor} options={options}/>}/>
                </Routes>
            </Router>

            <footer>
                <span style={{color: "#161A30"}}>&#169;&nbsp;Leave Management System &nbsp;<a href="https://github.com/nakul-krishnakumar/dbms-proj" target="_blank"><i className="fa-brands fa-github fa-xl github-icon" style={{color: "#161a3"}}></i></a></span>
            </footer>
        </div>
    )
}

export default App;
