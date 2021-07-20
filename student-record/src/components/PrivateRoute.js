import React,{useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {RecordContext} from '../RecordContext'

function PrivateRoute({ component: RouteComponent, ...rest}) {
    const {currentUser} = useContext(RecordContext)
    console.log(currentUser)
    return (
        <Route
        {...rest} 
        render={(routeProps) => currentUser?(<RouteComponent {...routeProps} />):
        (<Redirect to={"/login"} />)}
         />
    )
}

export default PrivateRoute
