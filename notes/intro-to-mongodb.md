Source: [Programming for the Web with JavaScript](https://github.com/elloo/p1xt-js-2.0-guided-studies/tree/master/programming-for-the-web-with-javascript)

# Introduction to MongoDB

MongoDB is a NoSQL Database designed for use with JavaScript apps. It stores __collections__ of __documents__ (similar to JavaScript objects) rather than tables of rows

* The `save` JavaScript function is used to write the __Schema__ (blueprint for Documents) that you will use in the Collection.
    
    * MongoDB allows us to have a Schema in which one document contains other documents

* You can access MongoDB directly from your Node/Express app using libraries such as Mongoose
* We can use the `find` or `findOne` function to select all documents in a collection, or pass a query object to select only certain ones

    * We can then do queries for documents using the properties of the documents they contain
    * We can also do "all" and "any" queries by passing objects to the `find` function
    * "Or" queries can be done using an object with "$or" as the property and an array of query terms as the value. e.g. `{ $or: [{items.colors: 'red'}, {items.colors: 'white'}] }`
    * And sort the results using `sort`

* Once we have a document, we can update it using the `save` function

## What is a NoSQL Database?

A NoSQL Database is a database that does not use SQL, the traditional method of storing data

* In SQL, data is stored in tables and rows. This is also known as a relational database
* NoSQL Databases attempt to address some of the shortcomings of SQL and other relational databases by organising and storing data differently

## What is an API?

An API is an Application Programming Interface

* It is a URL or set of URLs that returns pure data to requests 

APIs can be used to incorporate data and functionality from other sources in your webapp

You can also create your own API using Node.js to return JSON data to HTTP requests