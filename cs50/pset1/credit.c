#include <cs50.h>
#include <stdio.h>

int main(void)
{
    /* Requesting card number and making num value resettable */
    long long numOriginal = get_long_long("Number: ");
    long long num = numOriginal;

    /* Counting length of card number */
    int numLength = 0;

    for (int i = 0; i < num; i++)
    {
        num = num / 10;
        numLength = i + 2;
    }

    int digits[numLength];

    /* Resetting num value */
    num = numOriginal;

    /*
    Extracting individual digits from card number.
    Index notation refers to digits of card number in reverse order.
    */
    for (int i = 0; i <= numLength - 1; i++)
    {
        digits[i] = num % 10;
        num = num / 10;
    }

    /* Multiplying every odd number by two, starting from second-last.*/
    int otherDigits[numLength];
    int otherDigitsAdded = 0;

    for (int i = 0; i <= numLength - 1; i++ )
    {
        if (i % 2 == 1)
        {
            otherDigits[i] = digits[i] * 2;
        }
        else
        {
            otherDigits[i] = 0;
        }

        /* Adding individual digits of double-digit integers */
        if (otherDigits[i] > 0)
        {
            otherDigitsAdded += otherDigits[i] % 10;
            otherDigitsAdded += (otherDigits[i] / 10);
        }
    }

    /* Adding remaining digits */
    int remainingAdded = 0;

    for (int i = 0; i <= numLength - 1; i++ )
    {
        if (i % 2 == 0)
        {
            remainingAdded += digits[i];
        }
    }

    /* Checking last digit of otherDigitsAdded + remainingAdded */
    int checkInt = otherDigitsAdded + remainingAdded;

    if (checkInt % 10 == 0)
    {
        if (digits[numLength - 1] == 3)
        {
            printf("AMEX\n");
        }
        else if (digits[numLength - 1] == 5)
        {
            printf("MASTERCARD\n");
        }
        else
        {
            printf("VISA\n");
        }
    }
    else
    {
        printf("INVALID\n");
    }
}