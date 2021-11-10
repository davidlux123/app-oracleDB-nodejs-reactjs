import React , {useState}from 'react'
import { Input } from '../../components/Input'
import '../styles/FormularioStyle.css'
import http from '../../httpReqs/http'
import { useHistory } from 'react-router';

export const ManageUsers = (props) => {

    const [User, setUser] = useState(props.user);
    const [errorRol, setErrorRol] = useState('');
    const [errorUser, setErrorUser] = useState('');
    const [errorContra, setErrorContra] = useState('');
    const [contra2, setContra2] = useState({value: '', msjError: ''});
    let history = useHistory();
    
    const handleInputChange = (e) =>{
        
        setUser({...User,[e.target.name] : e.target.value});
        if(e.target.name === 'rol'){
            if (e.target.value === ''){
                setErrorRol('Campo obligatorio*');
            }else {
                setErrorRol('');
            }
        }
        if(e.target.name === 'user'){
            if (e.target.value === ''){
                setErrorUser('Campo obligatorio*');
            }else {
                setErrorUser('');
            }
        }
        if (e.target.name === 'contra'){
            if (e.target.value === ''){
                setErrorContra('Campo obligatorio*');
            }else {
                setErrorContra('');
                if (e.target.value !== contra2.value){
                    setContra2({...contra2, msjError: 'no coincide con la nueva contraseña*'});
                }else {
                    setContra2({...contra2, msjError: ''});
                }
            }
        }
        
    }

    const handleContra2Change = (e) =>{
        if (e.target.value === ''){
            setContra2({value: '', msjError:'Campo obligatorio*'});
        }else if (e.target.value !== User.contra){
            setContra2({...contra2, value: e.target.value, msjError: 'no coincide con la nueva contraseña*'});
        }else {
            setContra2({...contra2, value: e.target.value, msjError: ''});
        }
    }
    
    function validarCampos(){

        if (User.rol !== ''&& User.user !== '' && User.contra !== '' && User.contra === contra2.value){
            return true;
        }else {
            if (User.rol === ''){
                setErrorRol('Campo obligatorio*');
            }
            if (User.user === ''){
                setErrorUser('Campo obligatorio*');
            }
            if (User.contra === ''){
                setErrorContra('Campo obligatorio*');
            }
            if (contra2.value === ''){
                setContra2({value: '', msjError:'Campo obligatorio*'});
            }
            return false;
        }
    }

    const handleCreate = async (e) =>{
        e.preventDefault();
        if (validarCampos()){
            console.log(User);
            //console.log(contra2);
            let req = await http.instance.post(http.urlServer+"/admin/createUser", JSON.stringify(User));
            try {
                let jsonResp = await req.json();
                if (req.status === 200){
                    alert(jsonResp.message);
                    history.push('/admin')
                }else {
                    if(jsonResp.message === "invalid user"){
                        console.log(jsonResp);
                        setErrorUser(jsonResp.message);
                    }
                }

            } catch (error) {
                console.log("JSON convert err: ", error);
                throw new Error(error);
            }
        }
    }

    const handleUpdate = async (e) =>{
        e.preventDefault();
        
        if (validarCampos()){
            console.log(User);
            //console.log(contra2);

            let req = await http.instance.put(http.urlServer+"/admin/updateUser", JSON.stringify(User));
            try {
                let jsonResp = await req.json();
                if (req.status === 200){
                    alert(jsonResp.message);
                    history.push('/admin')
                }else {
                    if(jsonResp.message === "invalid user"){
                        console.log(jsonResp);
                        setErrorUser(jsonResp.message);
                    }
                }

            } catch (error) {
                console.log("JSON convert err: ", error);
                throw new Error(error);
            }
        } 
    }
 
    return (
        <div className= "contenedor">
            <form className="formulario" >
                {User.id === '' ?
                    <React.Fragment>
                        <h5 className = "text-black">Crear Usuario</h5>
                        <label>Rol</label>
                        <select 
                            name = 'rol' 
                            className=  {errorRol !== '' ? 'form-select is-invalid' : 'form-select'}
                            onChange={handleInputChange}
                        >
                            <option value = ''>Seleccione un Rol...</option>
                            <option value = "1"> Administrador </option>
                            <option value = "2"> Coordinador </option>
                            <option value = "3"> Reclutador </option>
                            <option value = "4"> Aplicante </option>
                        </select>
                        {errorRol !== '' && <label className = "text-danger text-small d-block mb-2"> {errorRol} </label>}
                    </React.Fragment>
                :
                    <React.Fragment>
                        <h5 className = "text-black">Actualizar Usuario</h5>
                        <label htmlFor="nombre">ID usario</label>
                        <Input className = 'form-control' type="text" value = {User.id} disabled/> 
                    </React.Fragment>
                }

                <label>Nombre Usuario</label>
                <Input 
                    name = 'user' 
                    type = 'text' 
                    placeholder = 'User' 
                    value = {User.user} 
                    onChange = {handleInputChange}
                    error = {errorUser}
                />

                <label>Nueva Contraseña</label>
                <Input 
                    name = 'contra' 
                    type = 'password' 
                    placeholder = 'Ingrese una nueva contraseña'
                    value = {User.contra}
                    onChange = {handleInputChange}
                    error = {errorContra}
                />

                <label>Confirmar Nueva Contraseña</label>
                <Input 
                    name = 'contra2' 
                    type = 'password' 
                    placeholder = 'Ingrese de nuevo la contraseña'
                    onChange = {handleContra2Change}
                    error = {contra2.msjError}
                />

                {User.id === '' ?
                    <button className= "btn btn-primary" onClick = {handleCreate} type="submit" >Create</button>
                :
                    <button className= "btn btn-primary" onClick = {handleUpdate} type="submit" >Update</button>
                }

            </form>
        </div>
    )
}
