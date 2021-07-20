import React, {useEffect, useState, useContext, useRef} from 'react'
import './AdminMain.css'
import {RecordContext} from '../RecordContext'
import ProfileImage  from './images/user.jpg'

function Admins() {
    const {currentUser, show_navbar} = useContext(RecordContext)
    const [showNavbar, setShowNavbar] = show_navbar
    
    // Hide Navbar
    const hideNavbar = () => {
        setShowNavbar(false)
    }
    hideNavbar()
    

    function toggleMenu() {
        let toggle = document.querySelector(".toggle")
        let navigation = document.querySelector(".navigation")
        let main = document.querySelector(".main")
        toggle.classList.toggle("active")
        navigation.classList.toggle("active")
        main.classList.toggle("active")
    }

    function menuToggle(event) {
        const toggleMenu = document.querySelector(".menu")
        toggleMenu.classList.toggle("active")
        event.stopPropagation()
    }

    document.querySelector("body").addEventListener("click", ()=> {
        const toggleMenu = document.querySelector(".menu")
        toggleMenu.classList.remove("active")
    })

    return (
        <div className="Admins">
            <div className="containers">
                 <div className="navigation">
                    <ul>
                        <li>
                            <a href="#">
                                <span className="icon"><i className="fa fa-apple" aria-hidden="true"></i></span>
                                <span className="title">Brand Name</span>
                            </a>
                        </li>
                        <hr/>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fa fa-home" aria-hidden="true"></i></span>
                            <span className="title">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fa fa-users" aria-hidden="true"></i></span>
                            <span className="title">Customers</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fa fa-comment" aria-hidden="true"></i></span>
                            <span className="title">Message</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fa fa-question-circle" aria-hidden="true"></i></span>
                            <span className="title">Help</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fa fa-lock" aria-hidden="true"></i></span>
                            <span className="title">Password</span>
                        </a>
                        </li>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fa fa-cog" aria-hidden="true"></i></span>
                            <span className="title">Setting</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <span className="icon"><i className="fa fa-sign-out" aria-hidden="true"></i></span>
                            <span className="title">Sign out</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="main">
                    <div className="topbar">
                        <div className="toggle" onClick={toggleMenu}></div>
                        <div className="search">
                            <label>
                                <input type="text" placeholder="Search here"/>
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </label>
                        </div>
                        <div className="user" onClick={menuToggle}>
                            <img src={ProfileImage} alt=""/>
                        </div>
                        <div className="menu">
                            <h3>Someone Famous<br/><span>Website Designer</span></h3>
                            <ul>
                                <li><i className="fa fa-user" aria-hidden="true"></i>My Profile</li>
                                <li><i className="fa fa-pencil-square-o" aria-hidden="true"></i>Edit Profile</li>
                                <li><i className="fa fa-cog" aria-hidden="true"></i>Settings</li>
                                <li><i className="fa fa-envelope" aria-hidden="true"></i>Inbox</li>
                                <li><i className="fa fa-sign-in" aria-hidden="true"></i>Log out</li>
                            </ul>
                        </div>
                    </div>
                    <div className="Administrators__section">
                        <div className="admin__header">
                            <h3>ADMINISTRATORS</h3>
                        </div>
                        <div className="Administrators">
                            <div className="admin__card">
                                <div className="options">
                                    <div className="edit">
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </div>
                                    <div className="delete">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </div>
                                    <div className="block">
                                        <i class="fa fa-lock" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="admin__card"></div>
                            <div className="admin__card"></div>
                            <div className="admin__card"></div>
                            <div className="admin__card"></div>
                        </div>
                    </div>
                    <div className="details">
                        <div className="recentOrder">
                            
                        </div>

                        <div className="recentCustomers">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admins
