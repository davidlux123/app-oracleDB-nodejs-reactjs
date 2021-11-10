
export default class http {
    static instance = new http();
    static urlServer = 'http://localhost:3001';

    get = async (url) => {
        try {
            let req = await fetch(url);
            //let json = await req.json();
            //return json;
            return req;
            
        } catch (error) {
            console.log("http get method err", error);
            throw new Error(error);
        }
    }

    postAuth = async (url, token) => {
        
        try {
            let req = await fetch(url, {
                method : 'POST',
                headers: {
                    'authorization': token
                }
            });

            //return req;
            let json = await req.json();
            return json;

        } catch (error) {
            console.log("http post method err", error);
            throw new Error(error);
        }
    }

    post = async (url, body) => {
        try {
            let req = await fetch(url, {
                method: "POST",
                body: body,
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            });

            return req;
            //let json = await req.json();
            //return json;

        } catch (error) {
            console.log("http post method err", error);
            throw new Error(error);
        }
    }

    put = async (url, body) => {
        try {
            let req = await fetch(url, {
                method: "PUT",
                body: body,
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            });

            return req;
            //let json = await req.json();
            //return json;

        } catch (error) {
            console.log("http post method err", error);
            throw new Error(error);
        }
    }

    delete = async (url, body) => {
        try {
            let req = await fetch(url, {
                method: "DELETE",
                body : body,
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            });

            return req;
            //let json = await req.json();
            //return json;

        } catch (error) {
            console.log("http post method err", error);
            throw new Error(error);
        }
    }
}