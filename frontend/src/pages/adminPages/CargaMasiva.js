import React, {useState} from 'react'
import { Lista } from '../../components/Lista';
import NavBar from '../../components/NavBar'
import '../styles/FormularioStyle.css'
import http from '../../httpReqs/http';
var parse = require('xml2js');

export const CargaMasiva = () => {

    const [departamentos, setDeps] = useState({departamentos: []});
    const [depHijos] = useState([]);
    const [tablaDeps, setTablaDeps] = useState([/*
        {id: '0', nombre: ' Recruitment ', capitalTotal: ' 50000 '},
        {id: '1', nombre: ' Desarrollo ', capitalTotal: ' 20000 '},
        {id: '2', nombre: ' musical group ', capitalTotal: ' 100000 '},
        {id: '3', nombre: ' PRUEBA ', capitalTotal: ' 100000 '}*/
    ]);

    const uploadFile = async (e) => {
        e.preventDefault();

        let req = await http.instance.post(http.urlServer + '/admin/cargaMasiva', JSON.stringify(departamentos.departamentos))
        try {

            let resp = await req.json();
            alert(resp.message);
            console.log(resp);

        } catch (error) {
            console.log("JSON convert err: ", error);
            throw new Error(error);
        }
        
    };

    function analizarDep(padreDep, Dep){
        var dep = {};
        dep['padre']= padreDep;
        dep['nombre'] = Dep['nombre'][0];
        dep['capitalTotal'] = Dep['capital_total'][0];
        dep['puestos'] = [];
        Dep['puestos'][0]['puesto'].forEach(Puesto => {
            var puesto = {}
            puesto['nombre'] = Puesto['nombre'][0];
            puesto['salario'] = Puesto['salario'][0];
            puesto['imagen'] = Puesto['imagen'][0];
            puesto['categorias'] = [];
            Puesto['categorias'][0]['categoria'].forEach(Cat => {
                var cat = {}
                cat['nombre'] = Cat['nombre'][0];
                puesto.categorias.push(cat)
            });
            puesto['requisitos'] = [];
            Puesto['requisitos'][0]['requisito'].forEach(Req =>{
                var req = {};
                req['nombre'] = Req['nombre'][0];
                req['tamaño'] = Req['tamaño'][0];
                req['obligatorio'] = Req['obligatorio'][0]
                req['formatos'] = [];
                Req['formatos'][0]['formato'].forEach(Formato => {
                    var formato = {};
                    formato['nombre'] = Formato['nombre'][0];

                    req.formatos.push(formato);
                });

                puesto.requisitos.push(req)
            });

            dep.puestos.push(puesto);
        });
        
        if ('departamentos' in Dep){
            Dep['departamentos'][0]['departamento'].forEach(Depa => {
                depHijos.push(analizarDep(dep.nombre, Depa));
            });
        }
        return dep;
    }

    const saveFile = (e) => {

        const file = e.target.files[0];
        if (file !== null){
            
            //console.log(file);

            let fr = new FileReader();
            fr.readAsText(file);
            fr.onerror = (e)=>{throw e.target.error;}
            fr.onload = (e)=>{
                let contenido = e.target.result;
                parse.parseString(contenido, (err, result) => {
                    if(err) throw err;

                    result['departamentos']['departamento'].forEach(Dep => {
                        departamentos.departamentos.push(analizarDep('', Dep))
                    });
                    
                    //console.log(departamentos);
                    //console.log(depHijos);

                    let i = 0;
                    let aux = []; 
                    departamentos.departamentos.forEach(dep => {
                        var Dep = {};
                        Dep['id']= i.toString();
                        Dep['nombre'] = dep['nombre'];
                        Dep['capitalTotal'] = dep['capitalTotal'];
                        aux.push(Dep);
                        i++;
                    });
                    depHijos.forEach(dep => {
                        var Dep = {};
                        Dep['id']= i.toString();
                        Dep['padre'] = dep['padre'];
                        Dep['nombre'] = dep['nombre'];
                        Dep['capitalTotal'] = dep['capitalTotal'];
                        aux.push(Dep);
                        i++;
                    });
                    setDeps({departamentos : departamentos.departamentos.concat(depHijos)})
                    setTablaDeps(aux);
                });
            }
        }
    };

    var Links = [
        {url: "/admin/create", name: "Crear usuario"},
        {url: "/admin/cargaMasiva", name: "Cargar departamentos"}
    ];

    const headList = ['id', 'padre', 'nombre', 'capitalTotal'];// ningun elemento repetido
    
    return (
        <div>
           <NavBar 
            links = {Links} 
            urlinicio = "/admin" 
            pagname = "admin"
           />
            <hr/>
            <form className="formulario">
                <input className="form-control"  type="file" onChange={saveFile} />
                <button className= "btn btn-primary" style = {{float:'right'}} onClick={uploadFile}>Upload</button>   
            </form>
            <br/>
            
            <Lista 
            title = "Departamentos"
            header = {headList}
            body = {tablaDeps}
            />  
            
        </div>
    )
}
