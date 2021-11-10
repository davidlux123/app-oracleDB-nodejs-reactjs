import {Router, Request, Response} from 'express';
import {queryOracleDB} from '../poolOracleDB'
import jwt from 'jsonwebtoken'

class loginRoute {

    public router : Router = Router();

    constructor() {
        this.config();
    }

    config(): void{
        this.router.post('/', this.loginController);
        this.router.post('/auth', this.authController)
    }

    async loginController (req: Request, res:Response){

        try {
            console.log(req.body);
            //construir los binds destructurando lo que trae el req.body
            const { user, contra } = req.body;

            //construir la consulta
            var sql:string =`
            select u.idUsuario, r.nombre, u.nombre, u.contra, u.fechaInicio, u.fechaBaja, u.debaja
            from usuario u
            inner join rol r on r.idRol = u.fk_idRol
            where u.nombre = :1`;
            
            //hacer la consulta ala DB
            let result = await queryOracleDB(sql, [user], {autoCommit: false});
            
            let User : any = result.rows?.at(0);
            if (User !== undefined){

                let userSession : any = {};
                userSession['id'] = User[0];
                userSession['rol'] = User[1];
                userSession['user'] = User[2];
                userSession['fechaInicio'] = User[4];
                userSession['fechaBaja']= User[5];
                userSession['debaja'] = User[6];

                //valido contraseña
                if (User[3] == contra){
                    if (userSession.debaja === 0){
                        console.log(userSession);
                        //res.status(200).json(userSession);

                        const token = jwt.sign(userSession, 'userAuth', { expiresIn: '3m' });
                        console.log(token);
                        res.status(200).json({ token });   

                    }else {
                        console.log("disconnected User :(");
                        res.status(403).json(JSON.stringify({message:"disconnected User"}));
                    }
                }else {
                    console.log("invalid password :( noo");
                    res.status(404).json({message:"invalid password"});
                }
            }else {
                console.log("invalid user :( noo ");
                res.status(404).json({message:"invalid user"});
            }
        } catch (e:any) {
            console.log(e.message);
            res.status(500).send(e.message);
        }
    }

    async authController(req: Request, res:Response){
        
        const token = req.headers['authorization'];
        jwt.verify(token as string, 'userAuth', (err, user)=>{

            if (err){
                res.status(403).json({message: 'not authorized(token invalid)'})
            }else {
                console.log(user);
                res.status(200).json(user);
            }
        });
    }

}

const  LoginRoute = new loginRoute();
export default LoginRoute;