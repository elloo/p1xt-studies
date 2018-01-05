#include <stdio.h>
#include <stdint.h>

typedef uint8_t BYTE;

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        fprintf(stderr, "Usage: ./recover image\n");
        return 1;
    }

    // Assigning img pointer to argv[1]
    FILE *imgf = fopen(argv[1], "r");
    if (imgf == NULL)
    {
        fprintf(stderr, "Could not open %s.\n", argv[1]);
        return 2;
    }

    // Counting number of jpeg files, starting at 000
    int fCount = 0;

    BYTE buffer[512];
    FILE *img;
    char fName[8];

    // While there are at least 512 bytes remaining...
    // Note: fread will also execute in this conditional test
    while(fread(buffer, 1, 512, imgf) == 512){

        // Checking for jpeg header
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            // Close previous file if one exists
            if (fCount != 0)
            {
                fclose(img);
            }

            // Creating jpeg name then transferring 512-byte element from buffer to img
            sprintf(fName, "%03i.jpg", fCount);
            fCount++;

            img = fopen(fName, "w");

            fwrite(buffer, 512 * sizeof(BYTE), 1, img);
        } else // For jpeg elements that are NOT headers
        {
            fwrite(buffer, 512 * sizeof(BYTE), 1, img);
        }
    }
}