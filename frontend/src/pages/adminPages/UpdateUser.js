import React, {useState} from 'react'
import {useLocation, Redirect } from 'react-router'
import { ManageUsers } from './ManageUsers'
import NavBar from '../../components/NavBar'

export const UpdateUser = () => {

    var Links = [
        {url: "/admin/create", name: "Crear usuario"},
        {url: "/admin/cargaMasiva", name: "Cargar departamentos"}
    ]

    const {state} = useLocation();
    const [User] = useState({...state, contra :''});

    return (
        <div>
            <NavBar links = {Links} urlinicio = "/admin" pagname = "admin"/>
            <hr/>
            {state === undefined ?
                <Redirect to = '/admin/create'/>
            :
                <ManageUsers user = {User} />
            }
        </div>
        
    )
}
