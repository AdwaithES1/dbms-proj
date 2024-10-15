import { useState } from "react"
import axios from "axios" 
import '../css/LoginPage.css'

function LoginPage() {
    const [uname, setUname] = useState(null);
    const [pword, setPword] = useState(null);
    console.log(uname);

    const checkCreds = async (e) => {
        e.preventDefault();
        const creds = {
            username: uname,
            password: pword
        }

        try {
            await axios.post("http://localhost:5000/api/auth/login", creds)
            .then(result => console.log(result))
            .catch(err => console.error(err))
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="flex container">
                <div className="login-box">
                    <div className="lb-items">
                        <h1>Login</h1>
                        <h4>Enter your credentials</h4>

                        <form method="POST" onSubmit={checkCreds}>
                            <label htmlFor="username">Username: </label><br/>
                            <input type="text" id="username" name="username" placeholder="Enter your username" onChange={(event) => setUname(event.target.value)}/><br/><br/>

                            <label htmlFor="password">Password: </label><br/>
                            <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(event) => setPword(event.target.value)}/><br/><br/>

                            <button className="submit-btn" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginPage