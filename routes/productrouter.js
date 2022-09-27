const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const productController = require('../controller/productController');


router.use(express.static(__dirname));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/productadd',(req,res)=>{ 
    (async () => { 
        res.send( await productController.createProduct(req.body) );
        res.end();
    })()
})

module.exports = router;