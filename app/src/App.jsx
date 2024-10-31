import './App.css'
import FAHome from "./components/FAHome/FAHome"
import LoginPage from './components/LoginPage/LoginPage'
import StudentHome from "./components/StudentHome/StudentHome"
import WardenHome from "./components/WardenHome/WardenHome"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from "react"

function App() {
    const [name, setName] = useState("Username");
    const [userID, setUserID] = useState("202XBXXABCD");

    const handleCred = (name, userID) => {
        setName(name);
        setUserID(userID);
    }
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginPage  handleCred={handleCred}/>}/>
                    <Route exact path="/student/home" element={<StudentHome  name={name} userID={userID}/>}/>
                    <Route exact path="/fa/home" element={<FAHome  name={name} userID={userID}/>}/>
                    <Route exact path="/warden/home" element={<WardenHome  name={name} userID={userID}/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
