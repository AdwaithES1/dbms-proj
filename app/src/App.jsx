import './App.css'
import FAHome from "./components/FAHome/FAHome"
import LoginPage from './components/LoginPage/LoginPage'
import StudentHome from "./components/StudentHome/StudentHome"
import WardenHome from "./components/WardenHome/WardenHome"
import AdminHome from "./components/AdminHome/AdminHome"
import GateHome from "./components/GateHome/GateHome"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from "react"

alert(`Credentials for testing the app:
    Student = { user: nakul , pass: 12345 }
    Faculty = { user: FAC0001 , pass: anjali123 }
    Warden  = { user: WRD0001 , pass: john123 }
    Gate = { user: gate , pass: gate123}
    Admin = { user: admin , pass: admin123 }`
)

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
        if (s === "Pending") return "#FEC72E";
        else if (s === "Approved") return "#00D280";
        else if (s === "Rejected") return "#F9281B";
        else if (s === "Late") return "#E98854"; 
        else if (s === "Expired") return "#908E90"; 
        else if (s === "On Leave") return "#0D99FF"; 
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
                    <Route exact path="/gate/home" element={<GateHome  name={name} userID={userID} onLogOut={handleLogOut} handleStatusColor={handleStatusColor} options={options}/>}/>
                </Routes>
            </Router>

            <footer>
                <span style={{color: "#161A30"}}>&#169;&nbsp;<b>PlsLetMeGo</b> - Leave Management System &nbsp;<a href="https://github.com/nakul-krishnakumar/dbms-proj" target="_blank"><i className="fa-brands fa-github fa-xl github-icon" style={{color: "#161a3"}}></i></a></span>
            </footer>
        </div>
    )
}

export default App;
