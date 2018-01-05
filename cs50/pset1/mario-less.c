#include <stdio.h>
#include <cs50.h>

int main(void)
{
    printf("Height: ");
    int height = get_int();

    /* Check to see if user input meets specified requirements.
    If not, repeat main function */
    if (1 <= height && height <= 23)
    {
        /* Loop controls creates new lines of the pyramid */
        for (int pyramid_height = 0; pyramid_height < height; pyramid_height++)
        {
            /* Loop prints alignment spaces to align hashtags */
            for (int pyramidSpaces = height; pyramidSpaces >= pyramid_height; pyramidSpaces--)
            {
                if (pyramidSpaces < height - 1)
                {
                    printf(" ");
                }
            }
            /* Printing first pyramid */
            int firstPyramid = pyramid_height + 1;

            while (firstPyramid >= 0)
            {
                firstPyramid--;
                printf("#");
            }

            printf("\n");
        }
    }
    else if (height == 0)
    {
        printf("");
    }
    else
    {
        main();
    }
}
