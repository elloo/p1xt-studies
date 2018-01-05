/**
 * generate.c
 *
 * Generates pseudorandom numbers in [0,MAX), one per line.
 *
 * Usage: generate n [s]
 *
 * where n is number of pseudorandom numbers to print
 * and s is an optional seed
 */

#define _XOPEN_SOURCE

#include <cs50.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// upper limit on range of integers that can be generated
#define LIMIT 65536

int main(int argc, string argv[])
{
    // If the user does not provide a number of values to print (n) or
    // If the user does not provide a number of values to print AND a seed (s).
    if (argc != 2 && argc != 3)
    {
        printf("Usage: ./generate n [s]\n");
        return 1;
    }

    // Convert the first provided argument to an integer
    // Assign that integer to `n`
    int n = atoi(argv[1]);

    // If a seed value is provided:
    // Convert that value to a long integer and use it for the seedval argument
    // If no seed value is provided:
    // Use the current time as a long integer for the seed value
    if (argc == 3)
    {
        srand48((long) atoi(argv[2]));
    }
    else
    {
        srand48((long) time(NULL));
    }

    // Generate `n` number of integers between 0.0 and 1.0
    // Multiply these integers by the previously defined `LIMIT` constant
    // Print each integer on a new line
    for (int i = 0; i < n; i++)
    {
        printf("%i\n", (int) (drand48() * LIMIT));
    }

    // success
    return 0;
}
