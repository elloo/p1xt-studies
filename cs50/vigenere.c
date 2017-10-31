#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main(int argc, string argv[])
{

    /* Checking argument validity. */
    if (argc != 2)
    {
        printf("ERROR: You need to submit ONE keyword.\n");
        return 1;
    } else
    {
        for (int i = 0; i < strlen(argv[1]); i++)
        {
            if (isalpha(argv[1][i]) == 0)
            {
                printf("ERROR: You can only submit alphabetical characters.\n");
                return 1;
            }
        }
    }

    /* Assigning provided keyword to 'k'. */
    string k = argv[1];
    int kLength = strlen(k);

    /* Assigning numerical values to 'k' characters. */
    for (int i = 0; i < kLength; i++)
    {
        if (97 <= k[i] && k[i] <= 122)
        {
            k[i] = (int)k[i] - 97;
        }
        else if (65 <= k[i] && k[i] <= 90)
        {
            k[i] = (int)k[i] - 65;
        }
    }

    /* Prompt user for a string of plaintext - 'p'. */
    string p = get_string("plaintext: ");
    int pLength = strlen(p);

    /* Encrypting only characters, skipping non-alphabetical characters.
       Non-alphabetical characters will simply be printed. */
    printf("ciphertext: ");
    int kIndex = 0;
    /*char kChar = k[kIndex];.*/

    for (int i = 0; i < pLength; i++)
    {
        int pInt = (int) p[i]; // Storing p char as integer

        if (isalpha(p[i]) != 0)     // Checking if p[i] is alphabetical
        {
            /* Encrypting lowercase characters */
            if (97 <= pInt && pInt <= 122)
            {
                pInt = pInt + k[kIndex];

                if (pInt > 122)
                {
                    pInt = (pInt - 122) + 96;
                    printf("%c", (char) pInt);
                } else
                {
                    printf("%c", (char) pInt);
                }
            }

            /* Encrypting uppercase characters */
            if (65 <= pInt && pInt <= 90)
            {
                pInt = pInt + k[kIndex];

                if (pInt > 90)
                {
                    pInt = (pInt - 90) + 64;
                    printf("%c", (char) pInt);
                } else
                {
                    printf("%c", (char) pInt);
                }
            }

            /* Increment or reset kIndex */
            kIndex++;
            if (kIndex == kLength)
            {
                kIndex = 0;
            }
        } else
        {
            printf("%c", p[i]);
        }
    }

    printf("\n");
    return 0;
}