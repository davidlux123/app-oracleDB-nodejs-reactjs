import { Router, Request, Response} from 'express';

class guestRoutes {

    public router : Router = Router();

    constructor(){
        this.config()
    }

    config(): void{
        this.router.get('/', this.controller);
    }

    async controller (req: Request, res:Response){
        //res.send('hellow')
        res.json({text:'este es el /guest'})
    }

}

const GuestRoutes = new guestRoutes();
export default GuestRoutes