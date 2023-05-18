module.exports = {
    cuentaMoodle:{
        username:"",
        password:""
    },
    //Es necesario crear un usuario en SQL Server, no sirve el windows authentication. /ver en youtube o googlear/
    dbConfig:{
        user: 'lare',
        password: 'lare',
        server: 'localhost', 
        database: 'Moodle' ,
        port:1433,
        options:{
            trustServerCertificate: true
        }
    },
    server:
    {
        hostname:'127.0.0.1',
        port:3000,
    }
};