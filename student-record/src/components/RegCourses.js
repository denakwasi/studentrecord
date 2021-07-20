import React, {useContext, useState, useEffect} from 'react'
import firebase from 'firebase'
import './RegCourses.css'
import { useHistory } from 'react-router'
import { RecordContext } from '../RecordContext'

function RegCourses() {
    const ALL_REG_COURSES_KEY = "registered_courses"
    const history = useHistory()
    const {currentUser, isAdmin, updateProfile, message} = useContext(RecordContext)
    const [registeredCourses, setRegisteredCourses] = useState([])

    if(!isAdmin) {
        history.push("/")
    }

    useEffect(() => {
        const getCourse = localStorage.getItem(ALL_REG_COURSES_KEY)
        console.log(getCourse)

         // registered courses name
        firebase.database().ref("RegisteredCoursesByStudents")
        .on("value", snapshot => {
            let reg_coursesNameList = []
            let all_reg_courses = snapshot;
            all_reg_courses.forEach(reg => {
                reg_coursesNameList.push(reg.val())
            })
            let filteredCourse = reg_coursesNameList.filter(regCourse => {
                if(regCourse.courseName === getCourse) {
                    return regCourse
                }
            })
            setRegisteredCourses(filteredCourse)
        })

    },[])

    console.log(registeredCourses)
    return (
        <div className="RegCourses">
            <ul>
                {registeredCourses.map((course, index) => (
                    <div>
                        <li>{course.studentName}</li>
                        <li>{course.studentEmail}</li>
                        <hr />
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default RegCourses
