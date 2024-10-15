import './App.css'
import LoginPage from './components/LoginPage'
import StudentHome from "./components/StudentHome"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginPage />} />
                    <Route exact path="/student/home" element={<StudentHome />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
