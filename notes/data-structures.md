# Data Structures

## Notes from CS50

CS50 focuses on four main types of data structures:

* Array
    * Insertion and deletion are bad. Both require lots of shifting.
    * Lookup is good - arbitrary access with constant time.
    * Relatively easy to sort.
    * Relatively small size but inflexible.
    
* Linked list
    * Insertion and deletion are easy. Simply redirect pointers.
    * Lookup is bad - relies on linear search.
    * Difficult to sort unless you compromise on fast insertion and sort during construction.
    * Relatively small but bigger than arrays.
    
* Hash table
    * Insertion is a two-step process: hash then insert
    * Deletion is easy once the element is found
    * Lookup is better than linked lists
    * Not ideal for sorting - arrays are better
    * Size is highly variable depending on malloc. 
        * Generally bigger than linked lists but smaller than tries.

* Trie
    * Insertion is initially complex with dynamic malloc but gets easier
    * Deletion is easy - just free a node
    * Fast lookup but not as fast as an array
    * Sorts as you build in almost all situations
    * Rapidly becomes huge, even with minimal data
    
Also remember:

* Stacks: Last in, first out
    * Two valid operations: push and pop
* Queues: First in, first out
    * Two valid operations: enqueue and dequeue
    
These are built with arrays or linked lists