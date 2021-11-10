import React from 'react'
import { ManageUsers } from './ManageUsers'
import NavBar from '../../components/NavBar'

export const CreateUser = () => {

    var Links = [
        {url: "/admin/create", name: "Crear usuario"},
        {url: "/admin/cargaMasiva", name: "Cargar departamentos"}
    ]

    const User = { id: '', rol: '', user: '', contra: ''}//id obligatrio

    return (
        <div>
            <NavBar links = {Links} urlinicio = "/admin" pagname = "admin"/>
            <hr/>
            <ManageUsers user = {User} />
        </div>
    )
}
