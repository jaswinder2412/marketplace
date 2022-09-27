const DB = require('../model/Db');
const fs = require('fs');
const path = require('path');
const os = require('os');

const bcrypt = require('bcrypt')

const EventEmitter = require('events');

const eventEmitter = new EventEmitter();
var logger = require('logger').createLogger('development.log');


class meetuser{

    constructor(){
        this.db = DB;
        
    }


    async createmeetuser(args){ 

        try{ 
            var fname = args.fname;
            var lname = args.lname;
            var email = args.email;
            var password = args.password;

            const saltRounds = 10
            const hash = await bcrypt.hash(password, saltRounds)


          
            var sqlQuery = 'INSERT INTO `meetgreetUser`(`fname`, `lname`, `email`, `password`) VALUES (?,?,?,?)';
           return await this.db.mainQuery(sqlQuery,[fname,lname,email,hash]);
        }
        catch(error){
            
            logger.info('Error', error);

        }

    }

    async login(args){ 

        try{ 
           var email = args;
 
        
          
            var sqlQuery = 'SELECT * FROM `meetgreetUser` WHERE email=?';
           return await this.db.mainQuery(sqlQuery,[email]);
        }
        catch(error){
            console.log(error);
            logger.info('Error', error);

        }

    }

    async comppass(userpass,dbpass){ 

        try{ 
           
           const compare =  await bcrypt.compare(userpass, dbpass);
           return compare;
        }
        catch(error){
            console.log(error);
            logger.info('Error', error);

        }

    }



}

module.exports = new meetuser();