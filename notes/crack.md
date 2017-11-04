# Reflections on crack.c
[ [Problem](https://docs.cs50.net/problems/crack/crack.html)
| [Code](my-studies/cs50/pset2/crack.c) ]

Essentially, crack.c asks the student to cycle through all possibilities of a password. 

The hash function uses a set formula to assign every password to a unique encryption. This encryption is then compared with the one stored in the database. Students are required to answer, "What password generates a given encryption?"

Crack.c was the first CS50 problem that made me trip up. I was just about to settle on submitting the less comfortable problem set when I found my solution.

For my solution, a decent understanding of combinatronics is required. It helps to draw out how the different index positions would cycle through a given set of characters (52 for this problem).

As always, simplification helped immensely. 

1|2|3
---|---|---
a|-|-
b|-|-
a|a|-
a|b|-
b|a|-
b|b|-
a|a|a
a|a|b
a|b|a
a|b|b
b|a|a
b|a|b
b|b|a
b|b|b

The above table illustrates how the total number of combinations can be calculated. 

> If i = index position and n = number of characters
> then total number of combinations = n^i

Using this concept, I calculated very large and precise numbers - the largest being 7454979! These numbers were used for two main purposes:

* Determining when additional index positions would be introduced
* Determining when to begin a new loop of the character set

Of course, I also had C-related issues to overcome. The most memorable seemed to be related to state-tracking capabilities. For some reason, I could only assign a limited number of int variables.

I worked around this by using an array to store these integers. I was then able to create new variables to reference these array indices.
