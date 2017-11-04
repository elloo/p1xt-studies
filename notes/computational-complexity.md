# Computational complexity

* Describes the efficiency of different algorithms
    * Big O describes the worst-case scenario
    * Big Omega(![Omega symbol](symbols/omega.png)) describes the best-case scenario
* It is enough to simply think of these ideas conceptually.

From fastest to slowest:

Computational complexity class | Class name | Explanation / example
---|---|---
O(1)|Constant time|Always takes a single operation in the worst case e.g. `return a + b`
O(log n)|Logarithmic time|Double `n` means adding just one more step. Searching by repeatedly tearing a phonebook in half. 
O(n)|Linear time|Always takes `n` operations in the worst case.
O(n log n)|Linearithmic time|
O(n<sup>2</sup>)|Quadratic time|
O(n<sup>c</sup>)|Polynomial time|
O(c<sup>n</sup>)|Exponential time|
O(n!)|Factorial time|
O(![Infinity symbol](symbols/infinity.png))|Infinite time|Stupid sort - random shuffle and check

## What's the runtime?

### O(m)

```
for (int j = 0; j < m; j++)
{
    // loop body that runs in O(1)
}
```

### O(p<sup>2</sup>)

```
for (int j = 0; j < p; j++)
{
    for (int k = 0l k < p; k++)
    {
        // loop body that runs in O(1)
    }
}
```

## References
* [CS50](https://www.youtube.com/embed/IM9sHGlYV5A?autoplay=1&rel=0)
* [Four Semesters of CS](http://btholt.github.io/four-semesters-of-cs/)