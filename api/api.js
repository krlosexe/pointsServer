const express           = require('express')
const authController    = require('../controllers/authController.js');
const postController    = require('../controllers/PostController.js');
const pointsController  = require('../controllers/PointsController.js');
const middlewareJwt     = require('../middlewares/middlewareAuth.js');
var   multer            = require('multer');



var storage = multer.diskStorage ({ 
    destination: function (req, file, cb) { 
        cb (null, './public/upload'); 
     }, 
    filename: function (req, file, cb) { 
        cb (null, file.originalname ); 
        console.log("saved image")
    } 
});
var upload = multer({ storage: storage })




const Routes = express.Router();

Routes.use(function(req, res, next) {
    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token");
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    
    next();
});




Routes.post('/api/auth', authController.auth);


Routes.post('/api/add/points', pointsController.store);

Routes.get('/api/get/stats/:code', pointsController.get);

module.exports = Routes;