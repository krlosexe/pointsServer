const express         = require('express')
const app             = express()
const client_mongo    = require('../config/database.js')
const config          = require('../config/config')
const mongo           = client_mongo()


app.set('key', config.key);

exports.store = function(request, response) {
    
    const dbo = mongo.db("prp");

    const data = {
        "user_id"         : request.body.user_id,
        "points"          : parseInt(request.body.points),
        "invoice_number"  : request.body.invoice_number,
        "code"            : request.body.code
    }

    dbo.collection("points").insertOne(data, function(err, res) {
        console.log("1 document inserted");
    });

    response.status(200).json({"success" : data})

};



exports.get = function(request, response) {
    
    const dbo = mongo.db("prp");
    
    dbo.collection('points').aggregate([
        { $match: { code: request.params.code } },
        {$group:
            {_id: '$code', total: {$sum: '$points'} }
        }
    ]).toArray(function(err, data) {

        let total =  data[0].total
        let level = 0

        if(total >= 0 && total <= 100){
          level = 1
        }

        if(total >= 100 && total <= 200){
          level = 2
        }


        if(total >= 200 && total <= 300){
            level = 3
        }


        if(total >= 300 && total <= 400){
            level = 4
        }
        
        if(total >= 400 && total <= 500){
            level = 5
        }

        if(total >= 500){
            level = 6
        }

        response.status(200).json({total, level})

    });


};
