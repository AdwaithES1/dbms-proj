import { useState } from "react"
import axios from "axios" 
import './LoginPage.css'
import { useNavigate } from "react-router-dom";

// WE ALSO HAVE TO ADD A MAIN USER WHICH HAS ACCESS TO ENTIRE HISTORY
function LoginPage() {
    const navigate = useNavigate();
    const [uname, setUname] = useState(null);
    const [pword, setPword] = useState(null);
    const [err, setErr] = useState(null);
    console.log(uname);

    const checkCreds = async (e) => {
        e.preventDefault();
        const creds = {
            userId: uname,
            password: pword
        }

        try {
            await axios.post("http://localhost:5000/api/auth/login", creds)
            .then(result => {
                console.log(result);
                if (result.data.match === true) {
                    navigate(`/${result.data.type}/home`);

                    console.log(result); //testing
                } else {
                    setErr("* Invalid Credentials");
                }
            })
            .catch(err => console.error(err))

        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="flex login-container">
                <div className="login-box">
                    <div className="lb-items">
                        <h1>Login</h1>
                        <h4>Enter your credentials</h4>

                        <form method="POST" onSubmit={checkCreds}>
                            <label htmlFor="username">Username: </label><br/>
                            <input type="text" id="username" name="username" placeholder="Enter your username" onChange={(event) => setUname(event.target.value)}/><br/><br/>

                            <label htmlFor="password">Password: </label><br/>
                            <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(event) => setPword(event.target.value)}/><br/><br/>

                            <div className="err-box">
                                {err}
                            </div>
                            <button className="submit-btn" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginPage;