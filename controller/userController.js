const DB = require('../model/Db');
const fs = require('fs');

class userController{

    constructor(){
        this.db = DB;
    }


    async createUser(args){ 

        try{
            var fname = args.fname;
            var lname = args.lname;
            var address = args.address;
            var phone = args.phone;
            var email = args.email;
            var username = args.username;
            var usertype = args.usertype;
            var DOBs = args.DOBs;
            var country = args.country;
            var province = args.province; 
            var city = args.city; 
            var postalCode = args.postalCode; 
            var password = args.password; 
            var sqlQuery = 'INSERT INTO `user`( `fName`, `lName`, `address`, `phone`, `email`, `username`, `usertype`, `password`, `DOB`, `country`, `province`, `city`, `postalCode`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
           return await this.db.mainQuery(sqlQuery,[fname,lname,address,phone,email,username,usertype,password,DOBs,country,province,city,postalCode]);

        }
        catch(error){
            console.log(error);
        }

    }



}

module.exports = new userController();