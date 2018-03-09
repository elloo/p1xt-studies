Source: [Programming for the Web with JavaScript](https://github.com/elloo/p1xt-js-2.0-guided-studies/tree/master/programming-for-the-web-with-javascript)

# Introduction to React

React is a JavaScript library created and maintained by Facebook. 

* HTML pages are composed of recyclable, interactive _'components'_ that have a lifecycle during which the state of the component changes.
** Allows for modularity = easy code organisation
** Lifecycle maintenance where components are modified based on state, event listeners can be added, simplified conditional rendering
** JSX - a technology that converts HTML to JavaScript, so that we can then use it in the JavaScript function that renders a React component.

* _VirtualDOM_ makes this highly efficient
** Components make up the nodes of the VirtualDOM tree
*** Each component maintains state (that changes with events) independently
**** Applications can be configured to respond to component-level events. 
** VirtualDOM __selectively__ renders and re-renders subtrees of nodes based on state changes.
*** As opposed to normal DOM, which re-renders all nodes.
** When a node is updated, two things occur:
*** _'diff'_ determines which nodes within the DOM have changed
*** _'reconciliation'_ to update the nodes that are affected

## React components

Components are JavaScript objects based off the React.Component prototype.

React omponents define properties, event-based state variables, and callback functions.
* ReactDOM.render( __<HTML/JSX>, <location>__ ) function is used to render its HTML.
* React.createClass() allows us to define a component and returns an object. The parameter takes an object.
* ES6 allows a _class_ to be defined using React.Component as the prototype.
** e.g. class <name> extends React.Component{}

### Component attributes

_Properties_ are attributes and values that are set when the component is created. 
* Assigned during object creation.
* They should never be modified after initialisation.
* Component accesses its properties through this.props

_State_ refers to attributes and values that represent the current state of the component, based on what it does/represents.
* Initialised in the constructor.
* They can be modified during the component's lifecycle.
** Typically changes in response to a user action or event.
1. We can bind an event to a callback function within a React component.
2. That component can then change state using its setState function.
3. This will automatically re-render the component and any other affected component.
* Components accesses its state through this.state

Both properties and state can be used when rendering the component.

The _component lifecycle_ involves three categories / stages of callback functions.
These are invoked by the React VirtualDOM. Optionally, they can be implemented to control the component.

1. Mounting
Called when a component is being created and added to the VirtualDOM.
__constructor:__ creates component, initialises state based on properties
__componentWillMount:__ invoked before component is added to VirtualDom
__componentDidMount:__ invoked after component has been added to the VirtualDOM and has been rendered

2. Updating
Called when a component's props or state is changing and the component is re-rendered.
__componentWillReceiveProps:__ invoked before receiving new props, e.g. when its parent component re-renders
__shouldComponentUpdate:__ can be used to determine whether to re-render
__componentWillUpdate:__ invoked before re-rendering after change to state
__componentDidUpdate:__ invoked after being re-rendered

3. Unmounting
Called when a component is being removed from the VirtualDOM
__componentWillUnmount:__ invoked before component is removed from VirtualDOM and destroyed
