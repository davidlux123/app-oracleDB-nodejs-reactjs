//npm install oracledb
//npm i --save @types/oracledb

import oracleDB from 'oracledb';

const config = {
    user: 'DALUX', // nombre de usuario
    password: '123', // contraseña
    connectString: '172.18.0.2:1521/XEPDB1' //cadena de conexion
};

export const connectionOracleDB =  async () => {
    await oracleDB.getConnection(config)
    .then(connection =>{
        connection.release();
        console.log('Oracle DB en el puerto: 1521')
    }).catch((e) =>{
       console.log(e.message)
    });
};

export const queryOracleDB = async (sql: string, bindParams: oracleDB.BindParameters[], options: oracleDB.ExecuteOptions) => {
    let connection = await oracleDB.getConnection(config);
    let result = await connection.execute(sql, bindParams, options);
    connection.release();
    //connection.close();
    return result;
};

export const queryMannyOracleDB = async (sql: string, bindParams: oracleDB.BindParameters[], options: oracleDB.ExecuteOptions) => {
    let connection = await oracleDB.getConnection(config);
    let result = await connection.executeMany(sql, bindParams, options);
    connection.release();
    //connection.close();
    return result;
};


