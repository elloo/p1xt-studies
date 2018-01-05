/**
 * helpers.c
 *
 * Helper functions for Problem Set 3.
 */

#include <cs50.h>
#include <string.h>
#include <stdio.h>

#include "helpers.h"

/**
 * Returns true if value is in array of n values, else false.
 */
bool search(int value, int values[], int n)
{
    // If n is non-positive, return false
    if (n < 0)
    {
    return false;
    }

    // Implementing binary search
    int arrStart = 0;
    int arrEnd = n;

    while (arrEnd - arrStart >= 0)
    {
        int midVal = (arrEnd - arrStart) / 2;
        int arrMiddle = arrStart + midVal;

        if (values[arrMiddle] == value)
        {
            return true;
        } else
        if (value > values[arrMiddle])
        {
            arrStart = arrMiddle + 1;
        } else
        if (value < values[arrMiddle])
        {
            arrEnd = arrMiddle - 1;
        }
    }

    return false;
}

/**
 * Sorts array of n values.
 */
void sort(int values[], int n)
{
    int swapCount = -1;
    while (swapCount != 0)
    {
        for (int i = 0; i < n; i++)
        {
            int valOne = values[i];
            int valTwo = values[i + 1];

            if (valOne > valTwo && valOne != values[n - 1])
            {
                values[i] = valTwo;
                values[i + 1] = valOne;
                swapCount++;
            } else
            if (i == n - 1 && swapCount != 0)
            {
                i = -1;
                swapCount = 0;
            }
        }
    }

    return;
}
