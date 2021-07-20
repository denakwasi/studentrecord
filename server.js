const express = require("express")
const admin = require("firebase-admin")
const cors = require("cors")
const cookiesParser = require("cookie-parser")
const bodyParser = require("body-parser")
const csrf = require("csrf")
const functions = require("firebase-functions")
const csrfMiddleware = csrf({cookie:true})

const app = express()
const port = 5000

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://studentrecord-e9f5d-default-rtdb.firebaseio.com"
});


app.use(express.json())
// app.use(bodyParser.json)
// app.use(cookiesParser())
// app.use(csrfMiddleware)
// app.all("*", (req,res,next) => {})


app.use(cors())

app.get("/api/admin", (req, res) => {

    const listAllStudents = async (nextPageToken) => {
        await admin.auth().listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
            const stdData = {
                record: listUsersResult.users,
            }
            return res.send(stdData)
            if(listUsersResult.pageToken) {
                listAllStudents(listUsersResult.pageToken)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    listAllStudents()
})

app.post("/api/admin/create", (req, res) => {
    console.log(req.body);
    admin.auth().createUser({
        email: req.body.email,
        emailVerified: false,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        photoURL: req.body.photoUrl,
        displayName: req.body.email.split("@")[0],
        disabled: false,
    })
    .then(userCred => {
        console.log("Successfully created new student")
        res.send("Successfully created new student")
    })
    .catch(error => {
        console.log("Error creating new student: ", error)
    })
})

app.post("/api/admin/delete", (req, res) => {
    const uid = req.body.uid
    console.log(uid)
    admin.auth().deleteUser(uid)
    .then(() => {
        res.send("Successfully deleted student")
    })
    .catch(error => {
        console.log("Error deleting student: ", error)
    })
})

app.post("/api/admin/delete-all", (req, res) => {
    const uids = req.body.uids
    console.log(uids)
    admin.auth().deleteUsers(uids)
    .then((delUserResult) => {
        res.send(`Successfully deleted ${delUserResult.successCount} students`)
        res.send(`Failes to delete ${delUserResult.failureCount} students`)
        delUserResult.errors.forEach(err => {
            res.send(err.error.toJSON())
        })
    })
    .catch(error => {
        console.log("Error deleting student: ", error)
    })
})

app.post("/api/admin/update", (req, res) => {
    const uid = req.body.uid
    const email = req.body.email
    const phoneNumber = req.body.phoneNumber
    const photoUrl = req.body.photoUrl
    const password = req.body.password
    admin.auth().updateUser(uid, {
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        displayName: email.split("@")[0],
        photoURL: photoUrl,
    })
    .then(userRec => {
        res.send(`Successfully updated student ${userRec.toJSON()}`)
    }) 
    .catch(err => {
        console.log("Error deleting student: ", err)
    })
})


app.post("/api/admin/enable-student", (req, res) => {
    const uid = req.body.uid
    const state = req.body.state
    admin.auth().updateUser(uid, {
        disabled: state,
    })
    .then(userRec => {
        res.send(`Successfully enabled student`)
    }) 
    .catch(err => {
        console.log("Error effecting change on student: ", err)
    })
})

app.post("/api/admin/disable-student", (req, res) => {
    const uid = req.body.uid
    const state = req.body.state
    admin.auth().updateUser(uid, {
        disabled: state,
    })
    .then(userRec => {
        res.send(`Successfully disabled student`)
    }) 
    .catch(err => {
        console.log("Error effecting change on student: ", err)
    })
})

app.post("/api/admin/make-admin", (req, res) => {
    const uid = req.body.uid
    admin.auth().setCustomUserClaims(uid, {
        admin: true,
    })
    .then(() => {
        res.send(`Successfully made admin`)
    }) 
    .catch(err => {
        console.log("Error effecting change on student: ", err)
    })
})


app.listen(port, ()=> {
    console.log(`server is running on ${port}`)
})