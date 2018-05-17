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
            
            console.log(toys);
            
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
    
    /* Return empty object if there are no id terms in the query
     * CHECKED */
    if (req.query.id.length == 0){
        res.json({});
    }

    
    /* req.query looks something like { id: [ '1234', '5678' ], qty: [ '2', '3' ] } 
     * CHECKED */
    var request = req.query;
    
    /* If qty specified is NaN or less than one, remove from toys array */
    for (i = 0; i < request["qty"].length; i++){
        if (isNaN(request.qty[i]) || request.qty[i] < 1){
            request["id"].splice(i, 1);
            request["qty"].splice(i, 1);
        }
    }   

    console.log(request);
    
    /* Create query object without invalid qty input */
    var query = request.id.map((id, i) => {
       return {
           id: id
       } 
    });
    
    
    /* Add qty for duplicate id query terms */
    var queryQtyUpdate = request.id.map((id, i) => {
       return {
           id: id,
           qty: request.qty[i]
       } 
    });
    queryDupQtyAdded = [];    
    queryQtyUpdate.forEach(function(x){
        if(!this[x.id]){
            this[x.id] = {id: x.id, qty: 0};
            queryDupQtyAdded.push(this[x.id]);
        }
        this[x.id].qty += Number(x.qty);
    }, Object.create(null));    

    
    
    /* Convert to queryDupQtyAdded array to object
    var queryFinal = queryDupQtyAdded.map((object, i) => {
       return {
           id: queryDupQtyAdded[i].id,
           qty: queryDupQtyAdded[i].qty
       } 
    }); */
   

    if (Object.keys(query).length != 0){
        Toy
            .find(query.$or)
            .lean()
            .exec((err, toys) => {
            if (!err){                            
                
                var items = [];
                items = toys.map((id, i) => {                                                                          
                    return { 
                        item : toys[i]["id"],
                        qty : queryDupQtyAdded[i]["qty"],
                        subtotal : queryDupQtyAdded[i]["qty"] * Number(toys[i]["price"])
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
            })
    }
    else res.json({});
    
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