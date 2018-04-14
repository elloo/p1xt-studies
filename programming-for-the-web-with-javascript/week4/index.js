var express = require('express');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');



app.use('/findToy', (req, res) => {
	
    var query = {};
    if (req.query.id)
        query.id = { $regex: req.query.id };
    
    if (Object.keys(query).length != 0){   // If query returns one or more objects...
        Toy.find( query, (err, toys) => {
            if (!err)
                res.json(toys);
            else {
                console.log(err)
                res.json({});
            }
        })
    }
    else res.json({});  // Else result in an empty query
        
    });



/*******************************************************************/

app.use('/', (req, res) => {
	res.json({ msg : 'It works!' });
    });



app.listen(3000, () => {
	console.log('Listening on port 3000');
    });

// Please do not delete the following line; we need it for testing!
module.exports = app;