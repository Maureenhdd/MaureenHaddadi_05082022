import { useState } from 'react'
import './LoginForm.scss'


const LoginForm = () => {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()

  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userName, password)
    };

  function validateForm() {
        return userName?.length > 3 && password?.length > 3;
    }
    return (
        <>
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={userName || ''} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password || ''} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" onClick={handleSubmit} disabled={!validateForm()}>Sign In</button>
                  
                </form>
            </section>
        </>


    )
}

export default LoginForm