const mysql = require("mysql");
const path = require("path");
require("dotenv").config({ path : path.join(__dirname, '/../config.env') }); 
 
class Db{

    constructor(){
        this.conn = mysql.createPool({
            database : process.env.Database,
            host : process.env.DBHost,
            user : process.env.DBUSER,
            password : process.env.DBPassword,
            socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'

        });
    }

    mainQuery(sql,args) {
        return new Promise((resolve,reject) =>{
            this.conn.query(sql,args,(error, data)=>{
                if(error) reject(error)
                resolve(data)
            });
        });
    }

}

module.exports = new Db();