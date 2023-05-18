var express = require('express');
var sql = require("mssql");
var app = express();
const fs = require("fs");
const config = require("./config")

var dbConfig = config.dbConfig;
console.log(config)
console.log(dbConfig)


// app.get('/', function (req, res) {
//     createDataBase();
//     sql.connect(dbConfig, function (err) {
//         if (err) console.log(err);

//         // create Request object
//         var request = new sql.Request();
           
//         // query to the database and get the records
//         request.query('select * from Asientos', function (err, recordset) {
            
//             if (err) console.log(err)

//             // send records as a response
//             res.send(recordset);
            
//         });
//     });
// });



// var server = app.listen(5000, function () {
//     initializeDataBase();
//     console.log('Server is running...');
    
// });

let DAL = {};

DAL.initializeDataBase =async ()=>{
    await databaseExists()
    .then((exists) => {
     if(!exists){
        let databaseCreationQuery = fs.readFileSync("databaseCreationQuery.txt").toString();
        sql.connect(dbConfig, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            
            // request.query("DROP DATABASE Moodle", function (err, recordset) {
            //     //if (err) console.log(err)
            //     //console.log(recordset);
            // });
            request.query(databaseCreationQuery, function (err, recordset) {
                if (err) console.log(err)
                //return resolve(true)
            });
        });
     }
    });
    
}

async function databaseExists(callback){
    return new Promise(async (resolve, reject) =>{
        try {
            sql.connect(dbConfig, function (err) {
                if (err) console.log(err);
        
                // create Request object
                var request = new sql.Request();
                   
                // query to the database and get the records
                request.query("IF DB_ID('Moodle') IS NOT NULL select '1' as response else select '0' response", function (err, recordset) {
                    
                    if (err) console.log(err)
                    //exists = recordset[0]
                    let response = recordset.recordsets[0][0].response;
                    return resolve(response=='1');            
                });
            });
        } catch (err) {
         reject(err)
        }
       })
    
}

DAL.getEntityBy = (entity,searchString,callback)=>{
    console.log(dbConfig)
    sql.connect(dbConfig, function (err) {
        if (err) console.log(err);

        let request = new sql.Request();

        request.query(`SELECT * FROM ${entity} WHERE ${searchString}`, function (err, recordset) {
            
            if (err) console.log(err)

            console.log(recordset)

            //return callback(response=='1');            
        });
    });
}
//INSERT INTO table_name (column1, column2, column3, ...)
//VALUES (value1, value2, value3, ...);
DAL.insertEntity = (entity,params,callback)=>{
    console.log(dbConfig)
    sql.connect(dbConfig, function (err) {
        if (err) console.log(err);

        let request = new sql.Request();

        request.query(`INSERT INTO ${entity} VALUES(${params})`, function (err, recordset) {
            
            if (err) console.log(err)

            console.log(recordset)

            //return callback(response=='1');            
        });
    });
}

module.exports=DAL;