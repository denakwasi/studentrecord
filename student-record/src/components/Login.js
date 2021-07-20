import React, {useState, useContext, useCallback} from 'react'
import './Login.css'
import KnustLogo from './images/KNUST_logo.png'
import {Link} from 'react-router-dom'
import {RecordContext} from '../RecordContext'
import firebase from '../utils/firebase'
import { Redirect, withRouter} from 'react-router'
import Navbar from './Navbar'


function Login({ history }) {
    const {currentUser, show_navbar} = useContext(RecordContext)
    const [showNavbar, setShowNavbar] = show_navbar
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput1, setPasswordInput1] = useState("")

    // Hide Navbar
    const hideNavbar = () => {
        setShowNavbar(false)
    }
    hideNavbar()
    
    const handleClearEmailInput = (e) => {
        setEmailInput(e.target.value)
    }

    const handleClearPasswordInput1 = (e) => {
        setPasswordInput1(e.target.value)
    }

    const clearEmail = () => {
        setEmailInput("")
    }

    const clearPassword1 = () => {
        setPasswordInput1("")
    }

    const handleLogin = useCallback(
        async event => {
            event.preventDefault()
            const {email, password} = event.target.elements
            try {
                await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
                
                history.push("/")
            } catch(error) {
                alert(error)
            }
        },
        [history]
    )

    
    
    if(currentUser) {
        return (
        <Redirect to="/decision" />)
    }

    return (
        <div className="Login__wrapper">
            <form onSubmit={handleLogin}>
                <div className="login__fields__wrapper">
                    <span className="all__inputs__wrapper">
                        <div className="logo__wrapper">
                        <img src={KnustLogo} alt="KNUST Logo" />
                        </div>
                        <div className="institution__name">
                            <h4>LOGIN</h4>
                        </div>
                        <hr />
                        <div className="email__input">
                            <input type="email" name="email" value={emailInput} onChange={handleClearEmailInput} autoComplete="true" autoFocus={true} className="form-control" placeholder="Enter Email" required={true} />
                            <svg onClick={clearEmail} style={{display:emailInput===""?"none":"block"}} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path style={{fill:"rgba(0,0,0,0.5)"}} d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                        </div>
                        <div className="password__input">
                            <input type="password" name="password" value={passwordInput1} onChange={handleClearPasswordInput1} minLength="6" className="form-control" placeholder="Enter Password" required={true} />
                            <svg onClick={clearPassword1} style={{display:passwordInput1===""?"none":"block"}} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path style={{fill:"rgba(0,0,0,0.5)"}} d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                        </div>
                        <div className="button__wrapper">
                            <button type="submit" className="btn btn-success">Login</button>
                        </div>
                        <div>
                            <hr />
                            <span className="text-muted">Forgot password? <Link to="/password-reset" className="yes">Yes</Link></span><br />
                            <span className="text-muted">Don't have an account? <Link to="/signup" className="yes">Join</Link></span>
                        </div>
                    </span>
                </div>
            </form>
        </div>
        
    )
}

export default withRouter(Login);
