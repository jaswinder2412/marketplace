const express = require('express')
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser')
const UserMethods = require('../controller/userController');
const meetuser = require('../controller/meetuser');

const path = require('path');

router.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

router.use(express.static(__dirname));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
var sess;

router.post('/registeruser',(req,res)=>{ 
    (async () => { 
        res.send( await UserMethods.createUser(req.body) );
        res.end();
    })() 
})


router.post('/meetuser',(req,res)=>{ 
    (async () => { 
        res.send( await meetuser.createmeetuser(req.body) );
        res.end();
    })() 
})

router.post('/login',(req,res)=>{   
     
    (async () => { 
        const result = await meetuser.login(req.body.email);
        if(result.length > 0){
            const comparecheck = await meetuser.comppass(req.body.password,result[0].password);
           if(comparecheck){
            sess = req.session;
           sess.email = req.body.email;
            console.log(sess);
            res.send({'userdetails' : result, 'status' : 200});
           }else {
            res.send({'status' : 403, 'Error' : 'password do not match'} ); 
           }
        } else {
            res.send({'status' : 403, 'Error' : 'User not exist'} );
        }
        console.log(result.length);
        
        res.end();
    })() 
})

router.get('/checksession',(req,res)=>{   
      
       if (typeof sess !== 'undefined' ) {
           if(typeof sess.email !== 'undefined'){

            (async () => {
                const result = await meetuser.login(req.body); 
               res.send(
                   {
                       'statsuCode' : 200,
                        'sessionuser' : sess.email,
                         'userdetails' :  result
                        }
                        );
               res.end();
           
    })()
}else {
    res.send({'statusCode' : 201, 'status':'Somethingwent wrong'});
    res.end();
}
    }else {
        res.send({'statusCode' : 201, 'status':'Please login first'});
        res.end();
    }
    
  
})


module.exports = router;