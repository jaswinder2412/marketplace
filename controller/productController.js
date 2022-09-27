const DB = require('../model/Db');
const fs = require('fs');
const path = require('path');
const os = require('os');

const EventEmitter = require('events');

const eventEmitter = new EventEmitter();
var logger = require('logger').createLogger('development.log');


class productController{

    constructor(){
        this.db = DB;
        eventEmitter.on('start', () => {
            console.log('Hello Jasman');
          });
          console.log("sd");
    }


    async createProduct(args){ 

       

          eventEmitter.emit('start');


        try{ 
            var addedByUserId = args.addedByUserId;
            var productTitle = args.productTitle;
            var companyName = args.companyName;
            var description = args.description;
            var photo = args.photo;
            var qty = args.qty;
            var costPrice = args.costPrice;
            var sellingPrice = args.sellingPrice;
            var MrPrice = args.MrPrice; 
            var usedLike = args.usedLike; 
            var modelName = args.modelName; 
            var specifications = args.specifications; 


            var sqlQuery = 'INSERT INTO `products`( `addedByUserId`, `productTitle`, `companyName`, `description`, `photo`, `qty`, `costPrice`, `sellingPrice`, `MrPrice`, `usedLike`, `modelName`, `specifications`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
 
            var fileroute = '/../publicbills/'+productTitle+'.json';

            var stream = fs.createWriteStream(path.join(__dirname, fileroute));
            stream.once('open', function(fd) {
              stream.write("My first row\n");
              stream.write("My second row\n");
              stream.end();
            });

            
            console.log(os.platform()
            );

           return await this.db.mainQuery(sqlQuery,[addedByUserId,productTitle,companyName,description,photo,qty,costPrice,sellingPrice,MrPrice,usedLike,modelName,specifications]);




        }
        catch(error){
            
            logger.info('Error', error);

        }

    }



}

module.exports = new productController();