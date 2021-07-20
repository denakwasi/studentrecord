import React,{createContext, useState, useEffect} from 'react'
import firebase from './utils/firebase'
import { useHistory } from 'react-router'
import Spinner from 'react-bootstrap/Spinner'

export const RecordContext = createContext()
export function RecordProvider(props) {
    const history = useHistory()
    const [showNavbar, setShowNavbar] = useState(true)
    const [currentUser, setCurrentUser] = useState("")
    const [pending, setPending] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const [msg, setMsg] = useState("")

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user)
            setPending(false)
            // Admin
            if(user !== null) {
                user.getIdTokenResult()
                .then(idTokenResult => {
                    if(!!idTokenResult.claims.admin) {
                        setIsAdmin(true)
                        history.push("/admin")
                    }else {
                        setIsAdmin(false)
                        history.push("/")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        })
    },[])

    if(pending) {
        return <>Loading...</>
    }

    // sign out
    const signOut = () => {
        firebase.auth().signOut()
    }

    // update profile
    const updateProfile = (email) => {
        const user = firebase.auth().currentUser
        user.updateEmail(email).then(()=> {
            setMsg("Updated successfully")
        }).catch(error => {
            setMsg(error.toString())
        })
    }

    

    return (
        <RecordContext.Provider value={{signOut, isAdmin, updateProfile, message:[msg, setMsg], currentUser, show_navbar:[showNavbar, setShowNavbar]}}>
            {props.children}
        </RecordContext.Provider>
    )
}

