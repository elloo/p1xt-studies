#define _XOPEN_SOURCE
#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <crypt.h>

int main(int argc, string argv[])
{
    // Ensuring key input is only one word long.
    if (argc != 2)
    {
        printf("ERROR: You need ONE hashed password.\n");
        return 1;
    }

    char* alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Need to generate hash that matches argv[1]
    string initHash = argv[1];

    int controlLoops = 0;
    int totalLoops = 0;

    int letters[3] = {0, 0, 0};
    int a = letters[0];
    int b = letters[1];
    int c = letters[2];

    // Control alphabet range with `a` and `i`
    for (int i = 0; i <= 53; i++)
    {
        // Counting iterations through alphabet
        if (i == 52)
        {
            controlLoops++;
            // Match should be found before loops == 4
            if (controlLoops == 5)
            {
                return 1;
            }
            i = 0;
        }

        char genKey[5];
        // Generating two-char genKeys
        if (totalLoops >= 51 && totalLoops <= 2755 && i == 0)
        {
            a++;
            if (totalLoops == 52)
            {
                a = 0;
            }
            genKey[0] = alpha[a];
            genKey[2] = '\0';
            controlLoops = 1;
        }
        // Generating three-char genKeys
        if (totalLoops >= 2756 && totalLoops <= 143363 && i == 0)
        {
            a++;
            if (totalLoops == 2756 || a > 51)
            {
                a = 0;
            }
            if ((totalLoops - 2756) % 2704 == 0)
            {
                genKey[0] = alpha[b];
                b++;
            }
            genKey[1] = alpha[a];
            genKey[3] = '\0';
            controlLoops = 2;
        }
        // Generating four-char genKeys
        if (totalLoops >= 143364 && totalLoops <= 7454979 && i == 0)
        {
            a++;
            // Resetting letter indices

            if (totalLoops == 143364 || a > 51)
            {
                a = 0;
            }
            if (totalLoops == 143364 || b > 51)
            {
                b = 0;
            }
            if (totalLoops == 143364 || c > 51)
            {
                c = 0;
            }
            // Setting characters
            if ((totalLoops - 143364) % 2704 == 0)
            {
                genKey[1] = alpha[b];
                b++;
            }
            if ((totalLoops - 143364) % 140608 == 0)
            {
                genKey[0] = alpha[c];
                c++;
            }
            genKey[2] = alpha[a];
            genKey[4] = '\0';
            controlLoops = 3;
        }

        genKey[controlLoops] = alpha[i];

       // Comparing initial and generated hash
        string genHash = crypt(genKey, "50");
        if (strcmp(initHash, genHash) == 0)
        {
            printf("%s\n", genKey);
            return 0;
        }

        totalLoops++;
    }
}