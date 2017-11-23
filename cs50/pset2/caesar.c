#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(int argc, string argv[])
{
    // Ensuring only one key is input
    if (argc != 2)
    {
        printf("ERROR: You can only enter one key.\n");
        return 1;
    }

    // Assigning key
    long k = strtol(argv[1], NULL, 10);

    // Requesting plain text
    string pText = get_string("What would you like encrypted?\n");
    int pLength = strlen(pText);

    printf("ciphertext: ");

    // Adding key (k) to plain text (p)
    for (int i = 0; i < pLength; i++)
    {
        int p = (int) pText[i];
        int c;

        if (65 <= p && p <= 90)
        {
            c = (k % 26) + p;

            if ( c > 90)
            {
                c = (c - 91) + 65;
            }

            printf("%c", (char) c);
        } else
        if (97 <= p && p <= 122)
        {
            c = (k % 26) + p;

            if ( c > 122)
            {
                c = (c - 123) + 97;
            }

            printf("%c", (char) c);
        } else
        {
            printf("%c", (char) p);
        }
    }
    printf("\n");
}