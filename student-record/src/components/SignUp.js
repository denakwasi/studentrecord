import React, {useState, useContext, useCallback} from 'react'
import './SignUp.css'
import KnustLogo from './images/KNUST_logo.png'
import {Link, useHistory} from 'react-router-dom'
import {RecordContext} from '../RecordContext'
import {withRouter} from "react-router"
import firebase from '../utils/firebase'

function SignUp({ history }) {
    
    const {show_navbar} = useContext(RecordContext)
    const [showNavbar, setShowNavbar] = show_navbar
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput1, setPasswordInput1] = useState("")
    const [passwordInput2, setPasswordInput2] = useState("")

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

    const handleClearPasswordInput2 = (e) => {
        setPasswordInput2(e.target.value)
    }

    const clearEmail = () => {
        setEmailInput("")
    }

    const clearPassword1 = () => {
        setPasswordInput1("")
    }

    const clearPassword2 = () => {
        setPasswordInput2("")
    }

    const handleSignUp = useCallback(
        async (event) => {
            event.preventDefault()
            if(passwordInput1 !== passwordInput2) return
            const {email, password1} = event.target.elements
            
            try {
                await firebase.auth().createUserWithEmailAndPassword(email.value, password1.value)
                .then(cred => {
                    const userName = cred.user.email.split("@")[0]
                    cred.user.updateProfile({
                        displayName: userName,
                        photoURL: null,
                        }).then(() => {
                        // Update successful
                        console.log("Update successful")
                        }).catch((error) => {
                        // An error occurred
                        console.log(error.toString())
                    }); 
                    
                    history.push("/")
                })
    
            } catch (error) {
                alert(error)
            }
        },
        [history]
    )

    

    return (
        <div className="SignUp__wrapper">
            <form onSubmit={handleSignUp}>
                <div className="signup__fields__wrapper">
                    <span className="all__inputs__wrapper">
                        <div className="logo__wrapper">
                        <img src={KnustLogo} alt="KNUST Logo" />
                        </div>
                        <div className="institution__name">
                            <h4>SIGN UP</h4>
                        </div>
                        <hr />
                        <div className="email__input">
                            <input type="email" name="email" autoComplete="on" value={emailInput} onChange={handleClearEmailInput} autoComplete="true" className="form-control" placeholder="Enter Email" required={true} />
                            <svg onClick={clearEmail} style={{display:emailInput===""?"none":"block"}} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path style={{fill:"rgba(0,0,0,0.5)"}} d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                        </div>
                        <div className="password__input">
                            <input type="password" name="password1" value={passwordInput1} onChange={handleClearPasswordInput1} minLength="6" className="form-control" placeholder="Enter Password" required={true} />
                            <svg onClick={clearPassword1} style={{display:passwordInput1===""?"none":"block"}} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path style={{fill:"rgba(0,0,0,0.5)"}} d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                        </div>
                        <div className="password__confirm__input">
                            <input type="password" name="password2" value={passwordInput2} onChange={handleClearPasswordInput2} minLength="6" className="form-control" placeholder="Confirm Password" required={true} />
                            <svg onClick={clearPassword2} style={{display:passwordInput2===""?"none":"block"}} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path style={{fill:"rgba(0,0,0,0.5)"}} d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                        </div>
                        <div className="button__wrapper">
                            <button type="submit" className="btn btn-success">Sign up</button>
                        </div>
                        <div>
                            <hr />
                            <span className="text-muted">Already have an account? <Link to="/" className="yes">Yes</Link></span>
                        </div>
                    </span>
                </div>
                
            </form>
        </div>
    )
}

export default withRouter(SignUp);
