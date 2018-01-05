/**
 * Copies a BMP piece by piece, just because.
 */

#include <stdio.h>
#include <stdlib.h>
#include <cs50.h>

#include "bmp.h"

int main(int argc, char *argv[])
{
    // ensure proper usage
    if (argc != 4)
    {
        fprintf(stderr, "Usage: ./resize scale infile outfile\n");
        return 1;
    }

    int scale = atof(argv[1]);

    // remember filenames
    char *infile = argv[2];
    char *outfile = argv[3];

    // open input file
    FILE *inptr = fopen(infile, "r");
    if (inptr == NULL)
    {
        fprintf(stderr, "Could not open %s.\n", infile);
        return 2;
    }

    // open output file
    FILE *outptr = fopen(outfile, "w");
    if (outptr == NULL)
    {
        fclose(inptr);
        fprintf(stderr, "Could not create %s.\n", outfile);
        return 3;
    }

    // read infile's BITMAPFILEHEADER
    BITMAPFILEHEADER bf, bfOut;
    fread(&bf, sizeof(BITMAPFILEHEADER), 1, inptr);
    bfOut = bf;

    // read infile's BITMAPINFOHEADER
    BITMAPINFOHEADER bi, biOut;
    fread(&bi, sizeof(BITMAPINFOHEADER), 1, inptr);
    biOut = bi;

    // ensure infile is (likely) a 24-bit uncompressed BMP 4.0
    if (bf.bfType != 0x4d42 || bf.bfOffBits != 54 || bi.biSize != 40 ||
        bi.biBitCount != 24 || bi.biCompression != 0)
    {
        fclose(outptr);
        fclose(inptr);
        fprintf(stderr, "Unsupported file format.\n");
        return 4;
    }

    // determine padding for scanlines
    int padding = (4 - (bi.biWidth * sizeof(RGBTRIPLE)) % 4) % 4;

    biOut.biWidth = bi.biWidth * scale;
    biOut.biHeight = bi.biHeight * scale;

    int paddingScaled = (4 - (biOut.biWidth * sizeof(RGBTRIPLE)) % 4) % 4;

    biOut.biSizeImage = ((sizeof(RGBTRIPLE) * biOut.biWidth) + paddingScaled) * abs(biOut.biHeight);
    bfOut.bfSize = biOut.biSizeImage + 54;

    // write outfile's BITMAPFILEHEADER
    fwrite(&bfOut, sizeof(BITMAPFILEHEADER), 1, outptr);

    // write outfile's BITMAPINFOHEADER
    fwrite(&biOut, sizeof(BITMAPINFOHEADER), 1, outptr);

    // iterate over infile's scanlines
    for (int i = 0, biHeight = abs(bi.biHeight); i < biHeight; i++)
    {
        // repeat vertical iterations according to scale
        for (int y = 0; y < scale; y++)
        {
            // iterate over pixels in scanline
            for (int j = 0; j < bi.biWidth; j++)
            {
                // temporary storage
                RGBTRIPLE triple;

                // read RGB triple from infile
                fread(&triple, sizeof(RGBTRIPLE), 1, inptr);

                // write RGB triple to outfile n times
                for (int x = 0; x < scale; x++){
                    fwrite(&triple, sizeof(RGBTRIPLE), 1, outptr);
                }
            }
                // iterate over infile padding
                fseek(inptr, padding, SEEK_CUR);

                // then add it back (to demonstrate how)
                for (int k = 0; k < paddingScaled; k++)
                {
                    fputc(0x00, outptr);
                }

                int initialPos = ftell(inptr);
                fseek(inptr, -((bi.biWidth * sizeof(RGBTRIPLE)) + padding), SEEK_CUR);
                int endPos = ftell(inptr);
                eprintf("initialPos: %i, endPos: %i\n", initialPos, endPos);
        }
                fseek(inptr, (bi.biWidth * sizeof(RGBTRIPLE)) + padding, SEEK_CUR);
    }
    // close infile
    fclose(inptr);

    // close outfile
    fclose(outptr);

    // success
    return 0;
}
