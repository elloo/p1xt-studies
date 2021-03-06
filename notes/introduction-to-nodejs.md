Source: [Programming for the Web with JavaScript](https://github.com/elloo/p1xt-js-2.0-guided-studies/tree/master/programming-for-the-web-with-javascript)

# Introduction to Node.js

An asynchronous, event-driven JavaScript runtime environment for building web applications

* Treats HTTP requests as events that invoke callback functions/handlers that construct the HTTP response
* Also includes a package manager to simplify the deployment of JavaScript apps

Create a new project by locating to a new folder with Terminal / Command Prompt etc and typing `npm init`

## Express

Express is a web application framework that sits on top of a Node.js server

Express helps you modularise and streamline your web application

Within Express, you can organise your app in many ways:

* Define separate modules that have different responsibilities
* Handle requests via different routes and routers
* Split each step in the processing of a request into Middlewares

An HTTP request is represented as an object in Express. It's passed as a parameter to the callback function / event handler

__Package__: A package is a module of JavaScript code, usually with a specific purpose, that can be re-used and assembled with other modules

__Dependency__: A dependency is a piece of code that your program relies on to work correctly

Node.js and Express are server-side frameworks that allow you to build web apps in JavaScript. These apps run on the server and dynamically generate content.

In Node Express, Requests (req) and Responses (res) are treated as objects. e.g. use the Response objects's status function to change the status code: `req.status(500)`

__Request Object Functions__

* method: the HTTP Request verb/action
* url: the resource that was requested
* headers: object containing all headers
* get(_field_): request header field

__Response Object Functions__

* status: set the HTTP status code
* type: set the HTTP content type
* write: add content to the body of the response
* end: send the response and close the connection

## Node Routing and Middleware

Routing allows us to specify different functionality for different HTTP requests

A __middleware__ is a function that is invoked in the handling of an HTTP request

* It is used in the "middle" between receiving a request and sending a response
* Multiple middlewares can be chained together on the same request
    * They are called in the order that they are specified
    * Each uses the same Request and Response objects
    * A middleware function can modify the Request so that it can then be used by subsequent middleware functions "downstream" in the route
    * We can combine middleware functions into "subroutes" using Routers - `express.Router()` - and then use those in our routes
        * Useful if the same combination of middleware is used repetitively
* The simplest middleware is `express.static` - This serves static files that are locally stored

Middleware that we use in our Express apps are just functions.

* They can contain any amount of JavaScript code with any functionality
* They take three parameters: `req`, `res`, and `next`
* `next()` must be called at the end of the function to invoke the next middleware or the final response

## Getting Data from Users: HTTP Requests

__Query parameters__

* Key/value pairs that are part of the URL
* Can be part of a static URL or be generated by an HTML form using the "GET" method
* An HTTP Request object can include __query__ properties that come from the URL 
    * http:// localhost:3000/?__name__=[VALUE]&__location__=[VALUE]
* An HTTP Request object can include __param__ properties that come from a parameterised URL
    * http:// localhost:3000/name/[VALUE]/location/[VALUE]

__POST data__

* Key/value pairs that are included in the body of the HTTP request
* Result from an HTML form using the "POST" method
* HTML forms specify the _action_ and _method_ that result when the user chooses to _submit_ the form
    * Action: The URL to be requested
    * Method: The HTTP Request "verb" e.g. GET or POST
        * When the form's method is GET, the data is sent in the URL query parameters
        * When the form's method is POST, the data is sent to the __body__ of the HTTP request. To read the body of the HTTP Request in Express, use the body-parser middleware.
        
In summary, there are three different to get data from an HTTP request:

1. HTTP Request __query__ properties
2. HTTP Request __param__ properties
3. HTTP Request __body__ properties


## What is EJS?

EJS, or EmbeddedJS, is a __view engine__ that uses data and embedded JavaScript to produce HTML

* This allows webpages to be developed statically and rendered dynamically server-side
* It needs to be set as the default rendering method with `app.set('view engine', 'ejs');`
* Then generate and send the HTML from an .ejs file using the Response's render function
    * Arguments to the .ejs file are passed as objects
    * By default, `.ejs` files are in the `views/` subdirectory
    
### Writing EJS files

A .ejs file is just an HTML file that has JavaScript code embedded in it

* Anything between `<%=` and `%>` tags will be evaluated and incorporated into the HTML. This includes executing any JavaScript that appears within the tags. The tags do not enclose the entire document!
* By default, the .ejs files should be in the `views/` subdirectory of the Express project
* This generates the HTML on the server to be sent to the browser
* It is rendered with `res.render('showAnimals', {name: name, animals: animals});` where showAnimals is the .ejs file
