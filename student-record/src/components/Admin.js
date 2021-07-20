import React, {useEffect, useState, useContext, useRef} from 'react'
import './Admin.css'
import DefaultImage from './images/default.jpg'
import { RecordContext } from '../RecordContext'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'
import axios from 'axios'
import $ from 'jquery'
import firebase from 'firebase'
import { Button, Modal, Alert } from 'react-bootstrap'

function Admin() {
    const history = useHistory()
    const {currentUser, isAdmin, updateProfile, message} = useContext(RecordContext)
    const [showCb, setShowCb] = useState(false)
    const [authStudents, setAuthStudents] = useState([])
    const [show, setShow] = useState(false);
    const [showCreateCourse, setShowCreateCourse] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [photoUrl, setPhotoUrl] = useState("")
    const [UID, setUID] = useState("")
    const [enable, setEnable] = useState(false)
    const [msgs, setMsgs] = useState("")
    const [lecturerName, setLecturerName] = useState("")
    const [taName, setTaName] = useState("")
    const [toBeUpdated, setToBeUpdated] = useState(false)
    const [isPhotoUrlReady, setIsPhotoUrlReady] = useState(false)
    const [checkedAll, setCheckedAll] = useState([])
    const adminSectionRef = useRef()
    const courseSectionRef = useRef()
    const createPhoneNumRef = useRef()
    const [showDeleteCourseDialog, setShowDeleteCourseDialog] = useState(false);
    const [isToBeUpdated, setIsToBeUpdated] = useState(false)
    const [courseName, setCourseName] = useState("")
    const [courseCode, setCourseCode] = useState("")
    const [course_key, setCourseKey] = useState("")
    const [courseDeleteKey, setCourseDeleteKey] = useState("")
    const [courses, setCourses] = useState([])
    const [searchedCourses, setSearchedCourses] = useState([])
    const [registeredCourses, setRegisteredCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState("")
    const [courseStudentQuery, setCourseStudentQuery] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [searchCourseInput, setSearchCourseInput] = useState("")
    const [showCourseOptions, setShowCourseOptions] = useState("")
    const [option, setOption] = useState(true)
    const ALL_REG_COURSES_KEY = "registered_courses"
    const SELECTION_SECTION_KEY = "section"

    

    useEffect(() => {
        if(!isAdmin) {
            history.push("/")
        }else {
            history.push("/admin")
        }
    
        fetchData()
        // database
        
        firebase.database().ref("Courses")
        .on("value", snapshot => {
            let coursesList = []
            let all_courses = snapshot.val();
            for (let key in all_courses) {
                coursesList.push({key:key, course:all_courses[key]});
            }
            setCourses(coursesList)
        })

         // registered courses name
        firebase.database().ref("RegisteredCoursesByStudents")
        .on("value", snapshot => {
            let reg_coursesNameList = []
            let all_reg_courses = snapshot;
            all_reg_courses.forEach(reg => {
                reg_coursesNameList.push(reg.val())
            })
            setRegisteredCourses(reg_coursesNameList)
        })

        // course-student query
        // setCourseStudentQuery(authStudents)
        
    },[])

    useEffect(() => {
        setSearchedCourses(courses)
    },[courses])

    
    const fetchData = async () => {
        const res = await axios.get("http://localhost:5000/api/admin/")
        let data = res.data.record.filter(record => {
            if(record.customClaims) {
                if(record.customClaims.admin) {
                    return record
                }
            }
        })
        setAuthStudents(data)
    }

    const fetchMsg = async () => {
        const response = await axios.get('http://localhost:5000/api/admin/create/')
        
    }


    const handleCreateStudent = async (e) => {
        e.preventDefault();
        if(isToBeUpdated) {
            handleUpdateStudent()
        }else {
            const response = await fetch('http://localhost:5000/api/admin/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, phoneNumber: phoneNumber,  photoUrl: photoUrl, password: password }),
            });
            const body = await response.text();
            console.log(body)
        }

        document.getElementById("file").value = ""
    }


    const handleUpdateStudent = async () => {
        const response = await fetch('http://localhost:5000/api/admin/update/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: UID, email: email, phoneNumber: phoneNumber, photoUrl: photoUrl, password: password}),
        });
        const body = await response.text();
        console.log(body)

    }


    const handleDeleteStudent = async (uid) => {
        const response = await fetch('http://localhost:5000/api/admin/delete/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: uid}),
        });
        const body = await response.text();
        console.log(body)
    }

    const handleDeleteAllStudent = async () => {
        const response = await fetch('http://localhost:5000/api/admin/delete-all/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uids: checkedAll}),
        });
        const body = await response.text();
        console.log(body)
    }

    const enableStudent =  async (uid) => {
        setEnable(true)
        const response = await fetch('http://localhost:5000/api/admin/enable-student/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: uid, state: false }),
        });
        const body = await response.text();
        console.log(body)
    }

    const makeAdmin =  async (uid) => {
        const response = await fetch('http://localhost:5000/api/admin/make-admin/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: uid }),
        });
        const body = await response.text();
        console.log(body)
    }

    const disableStudent =  async (uid) => {
        setEnable(false)
        const response = await fetch('http://localhost:5000/api/admin/disable-student/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: uid, state: true }),
        });
        const body = await response.text();
        console.log(body)
    }

    const selectEach = e => {
        if(!e.target.checked) return
        console.log(e.target.value)
    }

    const selectAll = (e) => {
        let chkBx = document.querySelectorAll(".checkBx")
        let uids = []
        console.log(chkBx)
        chkBx.forEach(cB => {
            cB.checked = e.target.checked?true:false
            if(!cB.checked) return
            uids.push(cB.value)
        })
        setShowCb(!showCb)
        if(e.target.checked) {
            setCheckedAll(uids)
        }else {
            setCheckedAll([])
        }
        
    }

    const handleClose = () => {
        setShow(false);
        document.getElementById("file").value = ""
    }
    const handleShow = () => {
        setShow(true);
        setIsPhotoUrlReady(false)
    }

    const handleShowCreateCourse = () => {
        setShowCreateCourse(true)
    }


    const handleCloseCreateCourse = () => {
        setShowCreateCourse(false)
        setToBeUpdated(false)
        clearCourseInputs()
        setMsgs("")
    }

    const createStudent = () => {
        handleShow()
        setIsToBeUpdated(false)
        clearAllInputs()
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleFileUrl = (e) => {
        console.log(`from file input: ${e.target.files[0]}`)
        getPhotUrl(email, e.target.files[0])
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const clearAllInputs = () => {
        setEmail("")
        setPassword("")
        setPhoneNumber("")
    }

    const handleCourseName = e => {
        setCourseName(e.target.value)
    }

    const handleCourseCode = e => {
        setCourseCode(e.target.value)
    }

    const handleLecturer = e => {
        setLecturerName(e.target.value)
    }

    const handleTa = e => {
        setTaName(e.target.value)
    }

    
    const updateStudent = (uid, u_email, u_phoneNumber) => {
        setUID(uid)
        setEmail(u_email)
        setPhoneNumber(u_phoneNumber)
        handleShow()
        setIsToBeUpdated(true)
    }

    const getPhotUrl = (email, file) => {
        if(email === "") return
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
                console.log(`from firebase: ${url}`)
                setPhotoUrl(url)
                setIsPhotoUrlReady(true)
            })
        })
    }

    //  Create Course
    const handleCreateCourse = (e) => {
        e.preventDefault()
        if(toBeUpdated) {
            updateCourse()
        }else {
            // checking existence of a course
            for(let i=0;i<courses.length;i++) {
                if(courses[i].course.courseName.replace(" ", "") === courseName.replace(" ", "")) return
            }
            console.log(courseName)
            firebase.database().ref("Courses")
            .push({
                courseName: courseName,
                courseCode: courseCode,
                lecturerName: lecturerName,
                taName: taName,
                taEmail: currentUser.email,
            })
            .then(() => {
                console.log("Successfully created course")
                setMsgs(`Successfully created course, ${courseName}`)
                clearCourseInputs()
                setToBeUpdated(false)
            })
            .catch(err => {
                console.log("Failed to create course!")
                setMsgs(`Failed to create course: ${err.message}`)
            })
        }
    }

    const clearCourseInputs = () => {
        setCourseName("")
        setCourseCode("")
        setLecturerName("")
        setTaName("")
    }

    const countRegisteredCourses = (courseName) => {
        let cRegCourse = registeredCourses.filter(regCourse => {
            if(regCourse.courseName === courseName) return regCourse
        })
        return cRegCourse.length
    }

    // query all srudents associated with a particular course
    const handleStudentWithACourseQuery = () => {
        // let filterAuthStudents = 
    }

    const handleSelectedCourse = (courseName) => {
        setSelectedCourse(courseName)
    }

    const handleSearchInput = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }

    
    useEffect(() => {
        fetchData()
        setCourseStudentQuery(authStudents)
    }, [handleCreateStudent, handleDeleteStudent, handleDeleteAllStudent, enableStudent, disableStudent])


    useEffect(() => {
        searchStudent()
    }, [authStudents, searchInput])


    const searchStudent = () => {
        let searched = authStudents.filter((std) => {
        if (std.email.includes(searchInput)) {
            return std; 
        }
        });
        setCourseStudentQuery(searched)
       
    }

    //  Search course
    const handleSearchCourse = (e) => {
        e.preventDefault()
        setSearchCourseInput(e.target.value)
    }

    useEffect(() => {
        searchCourse()
    },[courses, searchCourseInput])

    const capitalizeWord = word => {
        return word.toUpperCase()
    }

    const searchCourse = () => {
        let filteredCourse = courses.filter(course => {
            if(capitalizeWord(course.course.courseName).includes(capitalizeWord(searchCourseInput))) {
                return course
            }
        })
        setSearchedCourses(filteredCourse)
    }

    const toggleCourseMenu = (event, courseClass) => {
        setShowCourseOptions(courseClass)
        event.stopPropagation()
    }

    document.querySelector("body").addEventListener("click", () => {
        setShowCourseOptions("")
    })

    const handleCloseDeleteCourseDialog = () => setShowDeleteCourseDialog(false);
    const handleShowDeleteCourseDialog = (courseKey) => {
        setShowDeleteCourseDialog(true);
        setCourseDeleteKey(courseKey)
    }

    const handleDeleteCourse = (courseKey) => {
        firebase.database().ref("Courses")
        .child(courseKey)
        .remove()
        .then(() => {
            console.log("Deleted course successfully")
            handleCloseDeleteCourseDialog()
        })
        .catch(err => {
            console.log("Failed to delete course")
        })
    }

    const handleUpdateCourse = (courseKey, courseCode, courseName, lecturerName, taName) => {
        setCourseKey(courseKey)
        setCourseCode(courseCode)
        setCourseName(courseName)
        setLecturerName(lecturerName)
        setTaName(taName)
        handleShowCreateCourse()
        setToBeUpdated(true)
    }

    const updateCourse = () => {
        firebase.database().ref("Courses")
        .child(course_key)
        .update({
            courseName: courseName,
            courseCode: courseCode,
            lecturerName: lecturerName,
            taName: taName,
            taEmail: currentUser.email,
        })
        .then(() => {
            console.log("Updated course successfully")
            setMsgs("Updated course successfully")
            clearCourseInputs()
            setToBeUpdated(false)
        })
        .catch(err => {
            console.log("Failed to update course")
        })
    }

    const checkAdminStatus = authStd => {
        if(authStd.customClaims) {
            if(authStd.customClaims.admin === true) {
                return true
            }else {
                return false
            }
        }
    }

    const toRegCourses = (course_name) => {
        localStorage.setItem(ALL_REG_COURSES_KEY, (course_name))
        history.push("/admin/reg-courses")
    }


    // persist section state
    useEffect(() => {

        let get_item = localStorage.getItem(SELECTION_SECTION_KEY)
        if(get_item === "") {
            localStorage.setItem(SELECTION_SECTION_KEY, "courses")
        }else {
            if(get_item === "courses") {
                window.scrollTo(0, 0)
                setOption(true)
                let opt1 = document.querySelector(".opt1")
                let opt2 = document.querySelector(".opt2")
                if(opt1) {
                    opt2.setAttribute("selected", "")
                    opt1.setAttribute("selected", "selected")
                }
            }else if(get_item === "admin") {
                window.scrollTo(0, 500)
                setOption(false)
                let opt1 = document.querySelector(".opt1")
                let opt2 = document.querySelector(".opt2")
                if(opt2) {
                    opt1.setAttribute("selected", "")
                    opt2.setAttribute("selected", "selected")
                }
            }
        }
    })

    const handleSelectSection = (e) => {
        if(e.target.value === "courses") {
            localStorage.setItem(SELECTION_SECTION_KEY, "courses")
            window.scrollTo(0, 0)
            setOption(true)
        }else if(e.target.value === "admin") {
            localStorage.setItem(SELECTION_SECTION_KEY, "admin")
            window.scrollTo(0, 500)
            setOption(false)
        }
    }

    return (
        // <div className="container">
            <div className="Admin" id="students">
                {/* delete course dialog */}
                <>
                    <Modal show={showDeleteCourseDialog} onHide={handleCloseDeleteCourseDialog} animation={true}>
                        <Modal.Header closeButton>
                        <Modal.Title>Want to delete?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>This will completely delete all associated data!</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteCourseDialog}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleDeleteCourse(courseDeleteKey)}>
                            Yes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                {/*  Create Student */}
                <>
                    <Modal show={show} onHide={handleClose} backdrop="static" className="w-50 mx-auto modal__wrapper">
                        <Modal.Header closeButton>
                        <Modal.Title>{isToBeUpdated?"UPDATE A STUDENT":"CREATE A STUDENT"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <div className="create__std__fields">
                                <form onSubmit={handleCreateStudent}>
                                    <div className="mb-2">
                                        <input type="email" onChange={handleEmail} value={email} name="email" autoComplete="on" autoComplete="true" className="form-control" placeholder="Enter Email" required={true} />
                                    </div>
                                    <div className="mb-2">
                                        <input type="text" onChange={handlePhoneNumber} value={phoneNumber} name="phoneNumber" className="form-control" placeholder="Enter Phone Number" required={true} />
                                    </div>
                                    <div className="mb-2">
                                        <input type="file" onChange={handleFileUrl} id="file" name="file" accept="image/*" className="form-control" required={true} />
                                    </div>
                                    <div className="mb-2">
                                        <input type="password" onChange={handlePassword} value={password} name="password" className="form-control" placeholder="Enter Password" required={true} />
                                    </div>
                                    {isPhotoUrlReady?
                                    (<Button variant="primary" className="mx-auto mt-2" type="submit" >
                                        {isToBeUpdated?"Update":"Save"}
                                    </Button>):
                                    (<Button variant="primary" disabled className="mx-auto mt-2" type="submit" >
                                        {isToBeUpdated?"Update":"Save"}
                                    </Button>)}
                                    
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
                <div className="creating__section">
                    <>
                    <Modal show={showCreateCourse} onHide={handleCloseCreateCourse} backdrop="static" className="w-60 mx-auto">
                        {msgs&&<Alert variant="danger">{msgs}</Alert>}
                        <Modal.Header closeButton>
                        <Modal.Title>{toBeUpdated?"Update Course":"Create Course"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <div className="create__std__fields">
                                <form onSubmit={handleCreateCourse}>
                                    <div className="mb-2">
                                        <input type="text" onChange={handleCourseName} value={courseName} name="course_name" autoComplete="on" autoComplete="true" className="form-control" placeholder="Course name" required={true} />
                                    </div>
                                    <div className="mb-2">
                                        <input type="text" onChange={handleCourseCode} value={courseCode} name="course_code" className="form-control" placeholder="Course code" required={true} />
                                    </div>
                                    <div className="mb-2">
                                        <input type="text" onChange={handleLecturer} value={lecturerName} name="lecturer" className="form-control" placeholder="Enter Lecturer's name" required={true} />
                                    </div>
                                    <div className="mb-2">
                                        <input type="text" onChange={handleTa} value={taName} name="ta" className="form-control" placeholder="Enter T.A's name" required={true} />
                                    </div>
                                   <Button variant="primary" className="mx-auto mt-2" type="submit" >
                                        {toBeUpdated?"Update":"Save"}
                                    </Button>
                                </form>
                            </div>
                        </Modal.Body>
                        </Modal>
                        </>
                </div>
                <div className="search__course__wrapper__main">
                    <div className="search__course__wrapper">
                        <div className="search__course">
                            <form>
                                <input type="text" placeholder="search course..." onChange={handleSearchCourse} />
                            </form>
                        </div> 
                        <div className="tools__wrapper">
                            <svg onClick={option?handleShowCreateCourse:createStudent} xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24"><path style={{fill:"white"}} d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z"/></svg>
                            <form>
                                <select name="tools" id="tool" onChange={handleSelectSection}>
                                    <option className="opt1" value="courses">Courses section</option>
                                    <option className="opt2" value="admin">Admin section</option>
                                </select>
                            </form>
                        </div>             
                    </div>
                </div>
                <div className="courses" ref={courseSectionRef} >
                    {searchedCourses.map((course, index) => (
                        <div key={index} onClick={()=>handleSelectedCourse(course.course.courseName)} style={{ opacity:selectedCourse===course.course.courseName?"1":"1"}} className="course__card__wrapper">
                            <svg className="toggleCourse" style={{display:course.course.taEmail===currentUser.email?"block":"none"}} onClick={(e)=>toggleCourseMenu(e, "active"+index)} xmlns="http://www.w3.org/2000/svg" width="15" height="24" viewBox="0 0 24 24"><path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"/></svg>
                            <div className={showCourseOptions} style={{display:showCourseOptions===`active${index}`?"block":"none"}}>
                                <div className="course__options">
                                    <svg onClick={() => handleUpdateCourse(course.key, course.course.courseCode, course.course.courseName, course.course.lecturerName, course.course.taName)} xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24"><path d="M8.424 12.282l4.402 4.399-5.826 1.319 1.424-5.718zm15.576-6.748l-9.689 9.804-4.536-4.536 9.689-9.802 4.536 4.534zm-6 8.916v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023z"/></svg>
                                    <svg onClick={() => handleShowDeleteCourseDialog(course.key)} xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24"><path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"/></svg>
                                </div>
                            </div>
                            <Link to={course.course.taEmail===currentUser.email?"/reg-courses":"/admin"} style={{textDecoration:"none"}}>
                            <div className="course__card" onClick={() => toRegCourses(course.course.courseName)}>
                                <div>{course.course.courseName}</div>
                                <div>{course.course.courseCode}</div>
                                <div>{countRegisteredCourses(course.course.courseName)}</div>
                            </div>
                            </Link>
                        </div>
                    ))}
                </div>
               
                <div className="students" ref={adminSectionRef}>
                    {/* <div className="searchbar__wrapper">
                        <div className="searchbar">
                            <form>
                                <input onChange={handleSearchInput} placeholder="search admin..." type="text" />
                            </form>
                        </div>
                    </div> */}
                    <div className="create__std">
                        <svg style={{display:checkedAll.length===0?"none":"block"}} onClick={handleDeleteAllStudent} xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24"><path style={{fill:"red"}} d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                        <svg style={{display:checkedAll.length===0?"block":"none"}}  onClick={createStudent} xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24"><path style={{fill:"green"}} d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z"/></svg>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr className="header">
                            <th scope="col">
                                <input type="checkbox" onChange={selectAll} />
                                <span>Id</span> 
                            </th>
                            <th scope="col">Admin</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            
                            {authStudents.map((authStudent, index) => (
                                <tr className="cont" key={index}>
                                    <th scope="row">
                                        <input style={{display:showCb?"block":"none"}} className="checkBx" type="checkbox" value={authStudent.uid} onChange={selectEach} />
                                        <span className="ml-2">{index+1}</span>
                                    </th>
                                    <td className="img__name">
                                        <div><img src={!authStudent.photoURL?DefaultImage:authStudent.photoURL} alt="" /></div>
                                        <div>{authStudent.displayName}</div>
                                    </td>
                                    <td>
                                        <a href="mailto:akwasiakowuah748@gmail.com"
                                        >{authStudent.email}</a></td>
                                    <td>king2020</td>
                                    <td className="options">
                                        <svg onClick={()=>updateStudent(authStudent.uid, authStudent.email, authStudent.phoneNumber)} xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24"><path style={{fill:"blue"}} d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"/></svg>
                                        <svg onClick={()=>handleDeleteStudent(authStudent.uid)} xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24"><path style={{fill:"red"}} d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"/></svg>
                                        <svg onClick={()=>enableStudent(authStudent.uid)} xmlns="http://www.w3.org/2000/svg" style={{display:!authStudent.disabled?"none":"block"}} width="18" height="24" viewBox="0 0 24 24"><path style={{fill:"grey"}} d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"/></svg>
                                        <svg onClick={()=>disableStudent(authStudent.uid)} xmlns="http://www.w3.org/2000/svg" style={{display:authStudent.disabled?"none":"block"}} width="18" height="24" viewBox="0 0 24 24"><path style={{fill:"blue"}} d="M12 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v3h2v-3c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-4v14h18v-14h-12z"/></svg>
                                        <button onClick={()=>makeAdmin(authStudent.uid)} className="btn btn-info btn-sm">Admin</button>
                                    </td>
                                </tr>
                            ))}
                            
                            
                        </tbody>
                    </table>
                </div>
            <footer>
                &copy; All right reserved
            </footer>
            </div>
            
        // </div> style={{width:"100%", display:checkAdminStatus(authStudent)?"block":"none"}}
    )
}

export default Admin
