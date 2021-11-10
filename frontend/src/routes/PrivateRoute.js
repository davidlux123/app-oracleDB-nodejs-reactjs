import React from 'react'
import {Route , Redirect} from 'react-router-dom'
import { useAuth } from '../auth/useAuth';

export const PrivateRoute = ({component : Component, ...rest}) => {

    const authe = useAuth(); 
    //console.log(authe.user);

    return (
        <Route {...rest} >
            {authe.user !== null ? <Component /> : <Redirect to = "/login" /> }
        </Route> 
    );
}
