Source: [Programming for the Web with JavaScript](https://github.com/elloo/p1xt-js-2.0-guided-studies/tree/master/programming-for-the-web-with-javascript)

# Introduction to the DOM

The _D_ocument _O_bject _M_odel is a structured tree representation of the HTML of a web page.
* It allows us to programtically access that structure in JavaScript through the __document__ object.
    * _document.getElementByID('id') returns specific HTML elements with that ID.
    * _element.innerHTML_ can be modified to change the element's HTML/content.
    * _element.style_ can be modified to change the element's CSS/appearance.

Data can be stored in the browser across multiple page requests using __localStorage__.
* One example is storing JSON strings.

JavaScript Object Notation is a textual representation of a JavaScript Object that can be stored as a string, in a .json file, or exchanged between programs. 
* JavaScript objects can be converted to a JSON string via _JSON.stringify(myObject)_.
* String representations can be converted back to an object via _JSON.parse(jsonString)_.

## DOM events

_Event-Driven programming_ is when a program's behaviour is based on events. 
* __element.addEventListener(event, function)__ is used to associate callback functions to events.
* It is a form of asynchronous programming
    * The browser is told to listen for events / actions and run associated callback functions when they occur.
    * In the meantime, other code is able to be run.
    * As opposed to synchronous where a text field is continuously re-checked until text has been input by the user.

A _callback function_ is a function that is invoked as the result of some type of action or event.

# Introduction to jQuery

jQuery is a library that simplifies the way JavaScript and the DOM are used.
* It needs to be included within the <head> of the HTML document.

To manipulate DOM contents, the general format is $(selector).action(arguments...)
* e.g. $("#name").html("Hello");
    * Other actions include .append, .addClass, .val(), .hide(), and .show()
* $ is used to select DOM elements along with basic CSS element selector syntax.

.on() allows multiple callback functions to be defined for different actions/events.
