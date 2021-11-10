import {Request, Response} from 'express';
import {queryOracleDB} from '../poolOracleDB'

class loginRoute {

    public async loginController (req: Request, res:Response){

        try {
            console.log(req.body);
            //construir los binds de las consultas
            const { user, contra } = req.body;

            //construir la consulta
            var sql:string =`select u.idUsuario, r.nombre, u.nombre, u.contra, u.fechaInicio, u.fechaBaja, u.debaja
            from usuario u
            inner join rol r on r.idRol = u.fk_idRol
            where u.nombre = :1`;
            
            //hacer la consulta ala DB
            let result = await queryOracleDB(sql, [user], {autoCommit: false});
            
            let userSession = {
                "idUser": "",
                "rol": "",
                "user": "",
                "fechaInicio": "",
                "fechaBaja": "",
                "debaja": 0
            }
            
            //para aca------
            let User:any = result.rows?.at(0);
            if (User !== undefined){
                userSession.idUser = User[0];
                userSession.rol = User[1];
                userSession.user = User[2];
                userSession.fechaInicio = User[4];
                userSession.fechaBaja = User[5]
                userSession.debaja = User[6]
            }

            if (userSession.user !== ""){
                //valido contraseña
                if (User[3] == contra){
                    if (userSession.debaja === 0){
                        console.log(userSession);
                        res.status(200).json(userSession);
                    }else {
                        console.log("disconnected User :(");
                        res.status(403).json(JSON.stringify({message:"disconnected User"}));
                    }
                }else {
                    console.log("invalid password :(");
                    res.status(404).json({message:"invalid password"});
                }
            }else {
                console.log("invalid user :( ");
                res.status(404).json({message:"invalid user"});
            }

        } catch (e:any) {
            console.log(e.message);
            res.send(e.message);
        }
    }
}

const  LoginRoute = new loginRoute();
export default LoginRoute;