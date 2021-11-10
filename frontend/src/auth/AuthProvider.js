import { createContext, useState, useEffect} from "react";
import http from "../httpReqs/http";
//http.urlServer+"/login/auth"  
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    var us = null;
    fetch(http.urlServer+"/login/auth", {
        method : 'POST',
        headers: {
            'authorization': document.cookie.replace('token=', '')
        }
    }).then(resp => resp.json()).then(data =>{
        if ('id' in data){  
            us = data;
        }
    });

    const [user, setUser] = useState(us);

    useEffect(() => {
        fetch(http.urlServer+"/login/auth", {
            method : 'POST',
            headers: {
                'authorization': document.cookie.replace('token=', '')
            }
        }).then(resp => resp.json()).then(data =>{
            if ('id' in data){  
                us = data;
                //setUser(data) 
            }
        });

    }, [])

    const contextValue = {
        user,
        async login(token) {
            let respJson = await http.instance.postAuth(http.urlServer+"/login/auth", token);
            console.log(respJson);
            if('id' in respJson){
                document.cookie =`token=${token}; max-age=${60*3} path=/; samesite=strict`;
                setUser(respJson);
            }
        },
        logout() {
            document.cookie = 'token=; max-age=0 path=/;';
            setUser(null);
        }
    };
  
    return (
        <AuthContext.Provider value = { contextValue }>
            { children }
        </AuthContext.Provider>
    );
};
