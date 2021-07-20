import React, {useState, useContext, useCallback} from 'react'
import './PasswordReset.css'
import {withRouter} from "react-router"
import KnustLogo from './images/KNUST_logo.png'
import {useHistory} from 'react-router-dom'
import {RecordContext} from '../RecordContext'
import firebase from '../utils/firebase'


function PasswordReset() {
    const {message, show_navbar} = useContext(RecordContext)
    const [showNavbar, setShowNavbar] = show_navbar
    const [msg, setMsg] = message
    const [emailInput, setEmailInput] = useState("")
    const history = useHistory()

    // Hide Navbar
    const hideNavbar = () => {
        setShowNavbar(false)
    }
    hideNavbar()
    
    const handleClearEmailInput = (e) => {
        setEmailInput(e.target.value)
    }

    const clearEmail = () => {
        setEmailInput("")
    }



    const handleReset = useCallback(
        async event => {
            event.preventDefault()
            const {email} = event.target.elements
            try {
                await firebase.auth().sendPasswordResetEmail(email.value)
                .then(() => {
                    alert("Password email sent!")
                })
                .catch(error => {
                    alert(error.message)
                })
            } catch(error) {
                alert(error)
            }
        },
        [history]
    )

    const logIn = () => {
        setMsg("")
        history.push("/login")
    }

    return (
        <div className="PasswordReset">
            <form onSubmit={handleReset}>
                <div className="login__fields__wrapper">
                    {/* {msg !== "" && <Alert variant="danger">{msg}</Alert>} */}
                    <span className="all__inputs__wrapper">
                        <div className="logo__wrapper">
                        <img src={KnustLogo} alt="KNUST Logo" />
                        </div>
                        <div className="institution__name">
                            <h4>PASSWORD RESET</h4>
                        </div>
                        <hr />
                        <div className="email__input">
                            <input type="email" name="email" value={emailInput} onChange={handleClearEmailInput} autoComplete="true" autoFocus={true} className="form-control" placeholder="Enter Email" required={true} />
                            <svg onClick={clearEmail} style={{display:emailInput===""?"none":"block"}} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path style={{fill:"rgba(0,0,0,0.5)"}} d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                        </div>
                        
                        <div className="button__wrapper">
                            <button type="submit" className="btn btn-success">Reset</button>
                        </div>
                        <div>
                            <hr />
                            <span className="text-muted">Log in? <button onClick={logIn} className="yes">Yes</button></span>
                        </div>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default withRouter(PasswordReset)
