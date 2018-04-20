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





app.use('/findAnimals', (req, res) => {
	
    var query = {};
    if (req.query.species)
        query.species = req.query.species;
    if (req.query.gender)
        query.gender = req.query.gender;
    if (req.query.trait)
        query.traits = req.query.trait;    
    
    if (Object.keys(query).length != 0){   // If query returns one or more objects...
        Animal.find( query, 'name species breed gender age -_id', (err, animals) => {
            if (animals.toString() == ""){
                res.json({});            
            }
            else if (!err){
                res.json(animals);
            }
            else {
                console.log(err)
                res.json({});            
            }
        })
    }
    else res.json({});  // Else result in an empty query
        
    });





app.use('/animalsYoungerThan', (req, res) => {
	
    var query = {};
    if (req.query.age)
        query.age = req.query.age;  
    
    if (Object.keys(query).length != 0){   // If query returns one or more objects...
        Animal
            .find({age: {$lt: query.age}}, 'name -_id', (err, animals) => {
            
            if (!err){
                /* Counting query results */
                if (Array.isArray(animals)){
                    var queryCount = animals.length;
                } 
               
                
                /* Output of queryCount */
                if (queryCount == 0){
                    animals.push({"count": 0});
                    res.json(animals);      
                } else {
                    animals.push({"count": queryCount});
                    res.json(animals);
                }
            }
            else {    
                /* If query is non-numerical */
                console.log(err)
                res.json({});           
            }
        })
    }
    else {
        /* If query has no input */
        res.json({});  
    }
    });





app.use('/calculatePrice', (req, res) => {
	
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





/*****************************************************************************************/

app.use('/', (req, res) => {
	res.json({ msg : 'It works!' });
    });


app.listen(3000, () => {
	console.log('Listening on port 3000');
    });



// Please do not delete the following line; we need it for testing!
module.exports = app;