import React,{useContext, useState, useEffect} from 'react'
import './StudentDashboard.css'
import ProfileImage from './images/dennis_akowuah.jpg'
import ComputingImage from './images/computing2.jpg'
import OptimizationImage from './images/optimization.png'
import { useHistory  } from 'react-router'
import {RecordContext} from '../RecordContext'
import firebase from 'firebase'

function StudentDashboard() {
    const {currentUser, isAdmin, show_navbar} = useContext(RecordContext)
    const [showNavbar, setShowNavbar] = show_navbar
    const [courses, setCourses] = useState([])
    const [msgs, setMsgs] = useState("")
    const history = useHistory()
    const [isRegistered, setIsRegistered] = useState(false)
    const [registeredCourses ,setRegisteredCourses] = useState([])
    const [registeredCoursesName, setRegisteredCoursesName] = useState([])
    const hideNavbar = () => setShowNavbar(true)
    hideNavbar()

    // if(isAdmin) {
    //     console.log("Admin")
    //     history.push("/admin")
    // }
    useEffect(() => {
       
        // available courses
        firebase.database().ref("Courses")
        .on("value", snapshot => {
            let coursesList = []
            let all_courses = snapshot.val();
            for (let key in all_courses) {
                coursesList.push({key:key, course:all_courses[key]});
            }
            setCourses(coursesList)
        })

        // registered courses
        firebase.database().ref("RegisteredCoursesByStudents")
        .on("value", snapshot => {
            let reg_coursesList = []
            let all_reg_courses = snapshot.val();
            for (let key in all_reg_courses) {
                reg_coursesList.push({key:key, course:all_reg_courses[key]});
            }
            let filterRegCourse = reg_coursesList.filter(regCourse => {
                if(regCourse.course.studentEmail === currentUser.email) {
                    return regCourse
                }
            })
            setRegisteredCourses(filterRegCourse)
        })
        
        // registered courses name
        firebase.database().ref("RegisteredCoursesByStudents")
        .on("value", snapshot => {
            let reg_coursesNameList = []
            let all_reg_courses = snapshot;
            all_reg_courses.forEach(reg => {
                reg_coursesNameList.push(reg.val())
            })
            setRegisteredCoursesName(reg_coursesNameList)
        })

    },[])

    const handleRegisterCourse = (courseName, courseCode, lectName, taName) => {
            console.log(registeredCourses)
            for(let i=0;i<registeredCourses.length;i++) {
                let cN = registeredCourses[i].course
                console.log(cN)
                if(cN.courseName === courseName && cN.studentEmail === currentUser.email) {
                    console.log("course already registered")
                    return
                }
            }
            firebase.database().ref("RegisteredCoursesByStudents")
            .push({
                studentUID: currentUser.uid,
                studentName: currentUser.displayName,
                studentEmail: currentUser.email,
                courseName: courseName,
                courseCode: courseCode,
                lecturerName: lectName,
                taName: taName,
                isRegistered: true,
            })
            .then(() => {
                console.log("Successfully registered course")
                setMsgs(`Successfully registered course, ${courseName}`)
                setIsRegistered(true)
            })
            .catch(err => {
                console.log("Failed to registered course!")
                setMsgs(`Failed to registered course: ${err.message}`)
            })
    }

    const identifyRegistered = (courseName, stdEmail) => {
        let reg = false
        registeredCoursesName.forEach(cN => {
            if(courseName === cN.courseName && currentUser.email === cN.studentEmail) {
                reg = true
            }
        })
        return reg
    }


    return (
        // <div className="container">
            <div className="Student__dashboard">
                    {/* List of courses */}
                    <div className="list__of__courses">
                        <div className="avail">
                            <div className="available__courses">AVAILABLE COURSES</div>
                        </div>
                        <div className="all__card__wrapper" style={{overflowY: courses.length>6?"scroll":""}}>
                            {courses.map((course, index) => (
                                <div key={index} className="courses__card">
                                    <div className="course__info">
                                        <div className="course__name">{course.course.courseName}</div>
                                        <div className="course__code">{course.course.courseCode}</div>
                                    </div>
                                    <div>
                                        {identifyRegistered(course.course.courseName, course.course.studentEmail)?
                                            <button className="btn btn-info">registered</button>:
                                            <button onClick={()=>handleRegisterCourse(course.course.courseName, course.course.courseCode, course.course.lecturerName, course.course.taName)} className="btn btn-danger">unregistered</button>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                    
                    <div className="cards__wrapper">
                        <div className="reg">
                            <div className="registered__courses">
                                REGISTERED COURSES
                            </div>
                        </div>
                        {registeredCourses.map((course, index) => (
                            <div key={index} className="cards">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <div className="content">
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path style={{fill:"white"}} d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
                                    <h2>{index+1}</h2>
                                    <h3>{course.course.courseName}</h3>
                                    <div className="course__info">
                                        <div className="std__name">
                                            <div>T.A</div>
                                            <div>{course.course.taName}</div>
                                        </div>
                                        <div className="lect__name">
                                            <div>Lecturer</div>
                                            <div>{course.course.lecturerName}</div>
                                        </div>
                                    </div>
                                    <div className="button_wrapper">
                                        <button href="#">Update
                                            <svg className="lock__on__updateBtn" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style={{fill:"#1779ff"}} d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"/></svg>
                                        </button>
                                        <button href="#">Delete
                                            <svg className="lock__on__updateBtn" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style={{fill:"#1779ff"}} d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </div> 
                        ))}

                    </div>

            </div>
        // </div>
    )
}

export default StudentDashboard
