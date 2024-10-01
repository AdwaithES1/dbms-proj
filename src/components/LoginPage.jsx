import './../css/LoginPage.css'
function LoginPage() {
    return (
        <>
            <div className="flex container">
                <div className="login-box">
                    <div className="lb-items">
                        <h1>Login</h1>
                        <h4>Enter your credentials</h4>

                        <form>
                            <label htmlFor="username">Username: </label><br/>
                            <input type="text" id="username" name="username" placeholder="Enter your username"/><br/><br/>

                            <label htmlFor="password">Password: </label><br/>
                            <input type="password" id="password" name="password" placeholder="Enter your password"/><br/><br/>

                            <button className="submit-btn">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage