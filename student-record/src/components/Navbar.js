import React,{useContext} from 'react'
import './Navbar.css'
import KnustLogo from './images/KNUST_logo.png'
import ProfileImage from './images/dennis_akowuah.jpg'
import {RecordContext} from '../RecordContext'
import {useHistory, NavLink} from 'react-router-dom'
import firebase from '../utils/firebase'
import { Button } from 'react-bootstrap'

function Navbar() {
    const {signOut, isAdmin, show_navbar} = useContext(RecordContext)
    const [showNavbar, setShowNavbar] = show_navbar
    const history = useHistory()

    const handleSignOut = () => {
        signOut()
        // history.push("/login")
    }

    console.log(isAdmin)
    
    // let nav = document.querySelector(".nav")
    // if(nav) {
    //     nav.addEventListener("click", () => {
    //         nav.activeClassName += " is-active"
    //     })
    // }
    return (
        <div className="Navbar" style={{display:showNavbar?"block":"none"}}>
                 <div className="items__wrapper">
                <ul>
                    <li>
                        <NavLink to="/">
                            <img src={KnustLogo} alt="" />
                        </NavLink>
                    </li>
                        
                    <li>
                        <NavLink to="/student-detail-page" activeClassName="is-active" className="submit">
                            <div>
                                Submit 
                                <div className="under"></div>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" activeClassName="" className="dashboard">
                            <div>
                                Dashboard 
                                <div className="under1"></div>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" activeClassName="is-active" className="profile">
                            <div>
                                Profile 
                                <div className="under3"></div>
                            </div>
                        </NavLink>
                    </li>
                    {isAdmin&&(<li>
                        <NavLink to="/admin" activeClassName="is-active" className="profile">
                            <div>
                                Admin 
                                <div className="under4"></div>
                            </div>
                        </NavLink>
                    </li>)}
                    <li><Button style={{textDecoration:"none", color:"white"}} variant="link" onClick={handleSignOut} className="logout">
                        <div>
                            logout
                            <div className="under2"></div>
                        </div>
                    </Button></li>
                    <li><img src={ProfileImage} alt="" />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
