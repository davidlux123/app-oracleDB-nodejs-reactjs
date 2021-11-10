import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectionOracleDB } from './poolOracleDB'
import GuestRoutes from './routes/GuestRoutes';
import LoginRoute from './routes/LoginRoute';
import AdminRoutes from './routes/AdminRoutes';

class Server {

    public app: Application;
    
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config (): void {
        this.app.set('port', process.env.PORT || 3001);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    routes():void {
        this.app.get('/', async function (req, res) {res.send("Servidor con Oracle DB");});
        this.app.use('/login', LoginRoute.router);
        this.app.use('/guest', GuestRoutes.router);
        this.app.use('/admin', AdminRoutes.router);
    }

    star():void {
        this.app.listen(this.app.get('port'),()=>{
            //conexion al servidor
            console.log('Servidor nodeJS en el Puerto: ', this.app.get('port'));
            //conexion a la base de datos
            connectionOracleDB();
        });
    }
}

export const server = new Server();
server.star(); 