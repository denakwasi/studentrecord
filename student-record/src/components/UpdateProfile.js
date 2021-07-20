import React, {useState, useContext, useEffect} from 'react'
import firebase from 'firebase'
import { RecordContext } from '../RecordContext'
import KnustLogo from './images/KNUST_logo.png'
import { Alert } from 'react-bootstrap'
import './UpdateProfile.css'
import defaultImage from './images/default.jpg'

function UpdateProfile() {
    const {currentUser, updateProfile, message} = useContext(RecordContext)
    const [emailInput, setEmailInput] = useState("")
    const [fileInput, setFileInput] = useState("")
    const [msg, setMsg] = message
    const [spin, setSpin] = useState(true)

    useEffect(() => {
        setEmailInput(currentUser.email)
    },[currentUser.email])

    const handleClearEmailInput = (e) => {
        setEmailInput(e.target.value)
    }

    const clearEmail = () => {
        setEmailInput("")
    }

    const handleProfile = (e) => {
        e.preventDefault()
        updateProfile(emailInput)
    }

    const handleFileInput = (e) => {
        // setFileInput(e.target.files[0])
        let file = e.target.files[0]
        profileSet(currentUser.email, file)
    }

    
    const profileSet = (email, file) => {
        let fileName = email.split("@")[0]
        let uploadFileRef = firebase.storage().ref(`Profile/${fileName}`)
        let uploadTask = uploadFileRef.put(file)
        uploadTask.on("state_changed", snapshot=>{

        }, (err)=>{
            console.log(err)
        }, ()=>{
            firebase.storage().ref("Profile")
            .child(fileName)
            .getDownloadURL()
            .then(url => {
                profileImage(url, fileName)
            })
        })
    }

    const profileImage = (photoUrl, userName) => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: userName,
        photoURL: photoUrl
        }).then(() => {
        // Update successful
        console.log("Update successful")
        setMsg("Update successful")
        setSpin(false)
        }).catch((error) => {
        // An error occurred
        console.log(error.toString())
        setMsg(error.toString())
        });  
    }

    return (
        // <div className="container">
            <div className="Update__profile__wrapper">
                <form onSubmit={handleProfile}>
                <div className="update__fields__wrapper">
                    <span className="all__inputs__wrapper">
                        {msg !== ""&&<Alert variant="danger">{msg}</Alert>}
                        <div className="logo__wrapper">
                            <div className="profile__image">
                                <label htmlFor="file">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style={{fill:"#000000"}} d="M18 5l-2-3h-8l-2 3h-6v17h24v-17h-6zm4 7h-4.079c.581 3.754-2.312 7-5.921 7-3.612 0-6.501-3.248-5.921-7h-4.079v-5h5.07l2-3h5.859l2 3h5.071v5zm-10-3c-2.243 0-4 1.73-4 3.939 0 2.239 1.794 4.061 4 4.061s4-1.822 4-4.061c0-2.209-1.757-3.939-4-3.939zm-.436 3.555c-.632.503-1.461.5-1.852-.006-.39-.506-.194-1.324.438-1.827.632-.502 1.461-.499 1.851.007.391.505.195 1.323-.437 1.826z"/></svg>
                                </label>
                                <input type="file" id="file" accept="image/*" onChange={handleFileInput} className="form-control"/>
                            </div>
                            <svg style={{display:spin?"block":"none"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style={{fill:"#fff"}} d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"/></svg>
                            <img src={currentUser.photoURL===null?defaultImage:currentUser.photoURL} alt="" />
                        </div>
                        <div className="institution__name">
                            <h4>PROFILE</h4>
                        </div>
                        <hr />
                        <div className="email__input">
                            <input type="email" name="email" value={emailInput} onChange={handleClearEmailInput} className="form-control" placeholder="Enter Email" required={true} />
                            <svg onClick={clearEmail} style={{display:emailInput===""?"none":"block"}} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path style={{fill:"rgba(0,0,0,0.5)"}} d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                        </div>
                        {/* <div className="password__input">
                            <input type="file" accept="image/*" onChange={handleFileInput} className="form-control"/>
                        </div> */}
                        <div className="button__wrapper">
                            <button type="submit" className="btn btn-success">Update</button>
                        </div>
                       
                    </span>
                </div>
                </form> 
            </div>
        // </div>
    )
}

export default UpdateProfile
