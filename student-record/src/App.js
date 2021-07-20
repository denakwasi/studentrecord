import React,{useState, useEffect, useContext} from 'react'
import './App.css';
import SignUp from './components/SignUp'
import Login from './components/Login'
import StudentDashboard from './components/StudentDashboard';
import StudentDetailPage from './components/StudentDetailPage'
import UpdateProfile from './components/UpdateProfile';
import PasswordReset from './components/PasswordReset';
import RegCourses from './components/RegCourses';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { RecordProvider } from './RecordContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import firebase from './utils/firebase'
import { Redirect } from 'react-router';

function App() {
  
  return (
        <RecordProvider>
            <Navbar />
            <div>
              <Switch>
                <PrivateRoute exact path="/" component={StudentDashboard} />
                <PrivateRoute path="/student-detail-page" component={StudentDetailPage} />
                <PrivateRoute path="/admin" component={Admin} />
                <PrivateRoute path="/profile" component={UpdateProfile} />
                <PrivateRoute path="/reg-courses" component={RegCourses} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/password-reset" component={PasswordReset} />
              </Switch>
            </div>
      </RecordProvider>
  );
}

export default App;
