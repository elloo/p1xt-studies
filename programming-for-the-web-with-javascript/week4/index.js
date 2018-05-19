var express = require('express');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');




app.use('/findToy', (req, res) => {
	
    var query = {};
    if (req.query.id)
        query.id = req.query.id;
    
    if (Object.keys(query).length != 0){
        Toy.find(query)
           .lean()
           .exec((err, toys) => {
            
            if (!err)
                res.json(toys);
            else {
                console.log(err)
                res.json({});
            }
        })
    }
    else res.json({});
        
    });





app.use('/findAnimals', (req, res) => {
	
    var query = {};
    if (req.query.species)
        query.species = req.query.species;
    if (req.query.gender)
        query.gender = req.query.gender;
    if (req.query.trait)
        query.traits = req.query.trait;   
    
    if (Object.keys(query).length != 0){ 
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
    else res.json({});
        
    });





app.use('/animalsYoungerThan', (req, res) => {
	
    var query = {};
    if (req.query.age)
        query.age = req.query.age;  
    
    if (Object.keys(query).length != 0){
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
    
    var request = req.query;
    
    if (request.id.length == 0 || request.id.length != request.qty.length){
        res.json({});
    }
    
    for (var i = request["qty"].length - 1; i >= 0; i--){        
        if (isNaN(request.qty[i])
            || isNaN(request.id[i])
            || request.qty[i] < 1 
            || request.qty[i] == null
            || request.id[i].length != 4
        ){
            request["id"].splice(i, 1);
            request["qty"].splice(i, 1);            
        }        
    }
       
    /* Check for duplicate id values and add qty */
    var request_Filtered = {id: [], qty: []};    
    for (var i = request["id"].length - 1; i >= 0; i--){
        for (var x = 0; x < request["id"].length; x++)
            if (request.id[i] == request.id[x] && i != x){                
                request_Filtered["id"].push(Number(request.id[i]));  
                request_Filtered["qty"].push(Number(request.qty[i]) + Number(request.qty[x]));  
                request["id"].splice(x, 1);
                request["qty"].splice(x, 1); 
                request["id"].splice(i - 1, 1);
                request["qty"].splice(i - 1, 1); 
            }
    }    
    
    if (request["id"].length != 0){
        request["id"].forEach(function (item, i){
            request_Filtered["id"].push(Number(request.id[i]));  
            request_Filtered["qty"].push(Number(request.qty[i]));        
        });
    }
    
    var query = {"id": []};
    request_Filtered["id"].forEach(item => {query["id"].push(item)});
    Toy.find(query).exec(function(err, toys){
       if (!err){                            

            
            var items = [];
            items = toys.map((id, i) => {                                                                          
                return { 
                    item : request_Filtered["id"][i],
                    qty : request_Filtered["qty"][i],                  
                    subtotal : request_Filtered["qty"][i] * Number(toys[i]["price"])
                }                                     
            });  
          

            var totalPrice = 0;
            for (i = 0; i < items.length; i++){
                totalPrice += items[i]["subtotal"];
            }                

            var result = {
                items: items,
                totalPrice: totalPrice
            }

            res.json(result);

        } else {
            console.log(err);
            res.json({});
        }
    });
    
    
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