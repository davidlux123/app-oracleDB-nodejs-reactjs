import React, {useState} from 'react'
import NavBar from '../components/NavBar';
import  http  from '../httpReqs/http';
import { Input } from '../components/Input';
import './styles/FormularioStyle.css'
import { useHistory } from 'react-router';
import { useAuth } from '../auth/useAuth';

export const Login = () => {

    const [account, setAccount] = useState({user: '', contra: ''});
    const [errorUser, setErrorUser] = useState('');
    const [errorContra, setErrorContra] = useState('');

    let history = useHistory();
    const authe = useAuth();
    //console.log(authe.user);

    const handleInputChange = (e) =>{
       
        setAccount({...account,[e.target.name] : e.target.value});
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
            }
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        setErrorUser('');
        setErrorContra('');

        if(account.user !== '' && account.contra !== ''){
            //console.log(account);
            let req = await http.instance.post(http.urlServer+"/login", JSON.stringify(account));
            try {
                let jsonResp = await req.json();
                if (req.status === 200){
                    
                    console.log(jsonResp);
                    setAccount({ user:'', contra:''});
                    await authe.login(jsonResp.token);
                    history.push("/admin");

                }else {
                    if(jsonResp.message === "invalid user"){
                        console.log(jsonResp);
                        setErrorUser(jsonResp.message);
                    }else if (jsonResp.message  === "invalid password"){
                        console.log(jsonResp);
                        setErrorContra(jsonResp.message);
                    }else {
                        console.log(jsonResp);
                        setErrorUser(jsonResp.message); 
                    }
                }
            } catch (error) {
                console.log("JSON convert err: ", error);
                throw new Error(error);
            }
        }else {
            if(account.user === ''){
                setErrorUser('Campo obligatorio*');
            }
            if (account.contra === ''){
                setErrorContra('Campo obligatorio*');
            }
        }
    }

    return (
        <div>
            <NavBar links = {[]} urlinicio = "/" pagname = "login"/>
            <hr/>
            <div className= "contenedor">
                <form className="formulario" >
                    <h2 className = "text-black">Login</h2>
                    
                    <Input 
                    name = 'user' 
                    type = 'text' 
                    placeholder = 'User' 
                    value = {account.user} 
                    onChange = {handleInputChange}
                    error = {errorUser}
                    />

                    <Input 
                    name = 'contra' 
                    type = 'password' 
                    placeholder = 'Password' 
                    value = {account.contra} 
                    onChange = {handleInputChange}
                    error = {errorContra}
                    />

                    <button className= "btn btn-primary" type="submit" onClick= {handleSubmit}>Sign in</button>
                </form>
            </div>
        </div> 
    )
}

