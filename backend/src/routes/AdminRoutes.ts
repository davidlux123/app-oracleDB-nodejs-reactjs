import { Router, Request, Response} from 'express';
import {queryMannyOracleDB, queryOracleDB} from '../poolOracleDB'

class adminRoutes {

    public router : Router = Router();

    constructor() {
        this.config();
    }

    config(): void{
        this.router.get('/getUsers', this.getUsersController);
        this.router.post('/createUser', this.createUsersController);
        this.router.put('/updateUser', this.updateUsersController);
        this.router.delete('/deleteUser', this.deleteUsersController);
        this.router.post('/cargaMasiva', this.cargaMasivaController)
    }

    async getUsersController(req: Request, res:Response){
        
        try {
            //construir la consulta
            var sql: string = ` 
            select u.idUsuario, r.nombre, u.nombre, u.contra, u.fechaInicio, u.fechaBaja, u.debaja
            from usuario u
            inner join rol r on r.idRol = u.fk_idRol
            where u.debaja <> 1`;//and u.idUsuario <> :id;
            
            //hacer la consulta ala DB
            let result = await queryOracleDB(sql, [], {autoCommit: false});

            var Users:any = [];
            result.rows?.map((user:any) => {
                let userSchema = {
                    "id": user[0],
                    "rol": user[1],
                    "user": user[2],
                    "fechaInicio": user[4],
                    "fechaBaja": user[5],
                    "debaja": user[6]
                }
                Users.push(userSchema);
            });
            res.json(Users);

        } catch (error:any) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    }

    async createUsersController(req: Request, res:Response){
        
        try {
            console.log(req.body);
            //construir los binds destructurando lo que trae el req.body
            const { rol, user, contra } = req.body;
            
            //construir la consulta
            var sql:string =`
            select idUsuario
            from usuario 
            where nombre = :1`

            //hacer la consulta ala DB
            let result = await queryOracleDB(sql, [user], {autoCommit: false});
            
            let User : any = result.rows?.at(0); 
            if (User === undefined){
                //construir la consulta
                sql = ` 
                insert into usuario(fk_idRol, nombre, contra, fechaInicio, debaja)
                values (:1, :2, :3, (Select sysdate from dual), 0)`
                
                //hacer la consulta ala DB
                result = await queryOracleDB(sql, [rol, user, contra], {autoCommit: true});

                console.log('usuario creado:)');
                res.status(200).json({message: 'El usuario ' + user +' ha sido Creado'});

            }else {
                console.log("invalid user :( noo creado");  
                res.status(406).json({message:"invalid user"});
            }
        } catch (e:any) {
            console.log(e.message);
            res.status(500).send(e.message);
        }
    }

    async updateUsersController(req: Request, res:Response){
        try {
            console.log(req.body);
            //construir los binds destructurando lo que trae el req.body
            const { id, user, contra } = req.body;
            
            //construir la consulta
            var sql:string =`
            select idUsuario
            from usuario 
            where idUsuario <> :1 and nombre = :2`

            //hacer la consulta ala DB
            let result = await queryOracleDB(sql, [id, user], {autoCommit: false});
            
            let User : any = result.rows?.at(0);
            if (User === undefined){
                //construir la consulta
                sql = `update usuario set nombre=:1, contra=:2 where idUsuario=:3`
                
                //hacer la consulta ala DB
                result = await queryOracleDB(sql, [user, contra, id], {autoCommit: true});

                console.log('Usuario Editado :)');
                res.status(200).json({message: 'El usuario ' + user +' ha sido Editado'});

            }else {
                console.log("invalid user :( noo ");
                res.status(406).json({message:"invalid user"});
            }
        } catch (e:any) {
            console.log(e.message);
            res.status(500).send(e.message);
        }
    }

    async deleteUsersController(req: Request, res:Response){
        
        try {
            console.log(req.body);
            //construir los binds destructurando lo que trae el req.body
            const {id, user} = req.body;
            
            //construir la consulta
            var sql:string =`
            select idUsuario
            from usuario 
            where nombre = :1`

            //hacer la consulta ala DB
            let result = await queryOracleDB(sql, [user], {autoCommit: false});
            
            let User : any = result.rows?.at(0);
            if (User !== undefined){
                //construir la consulta
                sql = `update usuario set fechaBaja = (Select sysdate from dual), debaja=1 where idUsuario=:1`
                
                //hacer la consulta ala DB
                result = await queryOracleDB(sql, [id], {autoCommit: true});

                console.log('usuario eliminado :)');
                res.status(200).json({message: 'El usuario ' + user +' ha sido Eliminado'});

            }else {
                console.log("invalid user :( noo ");
                res.status(406).json({message:"invalid user"});
            }
        } catch (e:any) {
            console.log(e.message);
            res.status(500).send(e.message);
        }

    }

    async cargaMasivaController(req: Request, res:Response){
        try {
            var departmentos = req.body;
            //console.log(departmentos);

            for (let i = 0; i < departmentos.length; i++) {
                const dep = departmentos[i];
                //console.log(dep.nombre+':');
                const {padre, nombre, capitalTotal, puestos } = dep;
                let sql : string = `select nombre from departamento where nombre = :1`;
                let result = await queryOracleDB(sql, [nombre], {autoCommit: false});
                const Dep : any = result.rows?.at(0); 
                
                if (Dep === undefined){
                    sql = `insert into departamento(fk_idDepPadre, nombre, capitalTotal, capitalDisp)
                            values ((select idDep from departamento where nombre = :1), :2, :3, :3)`;
                    await queryOracleDB(sql, [padre, nombre, capitalTotal] , {autoCommit: true});

                    for (let j = 0; j < puestos.length; j++) {
                        const puesto = puestos[j];
                        //console.log('   '+puesto.nombre+':');
                        const {nombre, salario, imagen, categorias, requisitos} = puesto;
                        sql = `select nombre from puesto where nombre = :1`
                        result = await queryOracleDB(sql, [nombre], {autoCommit: false})
                        const Puesto : any = result.rows?.at(0);
                        
                        if (Puesto === undefined){
                            sql = `insert into puesto(nombre, salario, urlImg, descrip) values (:1, :2, :3, '')`
                            await queryOracleDB(sql,[nombre, salario, imagen], {autoCommit: true})
                            
                            for (let k = 0; k < categorias.length; k++) {
                                const cat = categorias[k];
                                //console.log('       '+cat.nombre+':')
                                const {nombre} = cat;
                                sql = `select nombre from categoria where nombre=:1`
                                result = await queryOracleDB(sql, [nombre], {autoCommit: false})
                                const Cat = result.rows?.at(0);

                                if (Cat === undefined){
                                    console.log('           entro hasta aca')
                                    sql = `insert into categoria(nombre) values (:1)`
                                    await queryOracleDB(sql, [nombre], {autoCommit: true})
                                }
                            }

                            //console.log('       ---------------------') 

                            for (let l = 0; l < requisitos.length; l++) {
                                const reqi = requisitos[l];
                                //console.log('       '+reqi.nombre+':')
                                const {nombre, tamaño, obligatorio, formatos} = reqi;
                                sql = `select nombre from requisito where nombre = :1`
                                result = await queryOracleDB(sql, [nombre], {autoCommit: false})
                                const Reqi = result.rows?.at(0);
                                
                                if (Reqi === undefined){
                                    console.log('           entro hasta aca')
                                    sql = `insert into requisito(nombre, tamaño, obligatorio, formato) values(:1, :2, :3, :4)`
                                    await queryOracleDB(sql, [nombre, tamaño, obligatorio, formatos[0].nombre], {autoCommit: true})
                                }
                            }
                        }        
                    }
                }
            }
            res.json({message: 'Archivo Cargado correctamente'})
        } catch (e:any) {
            console.log(e.message);
            res.status(500).send(e.message);
        }
    }

}

const AdminRoutes = new adminRoutes();
export default AdminRoutes