import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { useHistory } from 'react-router';


function NavBar(props) {

    const authe = useAuth();
    const history = useHistory()
    //console.log(authe.user);

    const out=()=>{
        authe.logout();
        history.push('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to={props.urlinicio}>Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="nav justify-content-end collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className ="navbar-nav">
                            {props.links.map(link => 
                                <Link key = {link.name} className="nav-link text-white" to = {link.url}>{link.name}</Link>
                            )}

                            <hr className="dropdown-divider"/>
                            {authe.user !== null ? 
                                <button className="btn btn-outline-primary" onClick = {out}>Logout</button> 
                            :
                                (props.pagname !== "login" && <Link className="btn btn-primary" to = '/login'>Login</Link>)   
                            }

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default NavBar

    