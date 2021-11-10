import React, {useState, useEffect} from 'react'
import NavBar from '../../components/NavBar'
import { Lista } from '../../components/Lista'
import http from '../../httpReqs/http'

export const HomeAdmin = () => {

    const [Users, setUsers] = useState([]);

    const handleDelete = async(e, User) =>{
        e.preventDefault();
        console.log(User);
        let req = await http.instance.delete(http.urlServer+'/admin/deleteUser', JSON.stringify(User));
        try {
            let jsonResp = await req.json();
            alert(jsonResp.message);
            await getUsers();

        } catch (error) {
            console.log("JSON convert err: ", error);
            throw new Error(error);
        }
    }

    const getUsers = async () =>{
        let req = await http.instance.get(http.urlServer+'/admin/getUsers');
        try {
            let jsonResp = await req.json();
            setUsers(jsonResp);
        } catch (error) {
            console.log("JSON convert err: ", error);
            throw new Error(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const LinksNavbar = [ //name obligatorio y no repetido
        {url: "/admin/create", name: "Crear usuario"},
        {url: "/admin/cargaMasiva", name: "Cargar Departamentos"}
    ];

    const headList = ['id', 'rol', 'user', 'fechaInicio', 'fechaBaja'];// ningun elemento repetido

    return (
        <div>
            <NavBar 
            links = {LinksNavbar} 
            urlinicio = "/admin" 
            pagname = "admin"
            />
            <hr/>
            <Lista 
            title = "Usuarios"
            header = {headList} 
            body = {Users} 
            updatepage = '/admin/update'
            actionDelete = {handleDelete}
            />
        </div>
    )
}
