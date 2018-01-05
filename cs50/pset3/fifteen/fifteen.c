/**
 * fifteen.c
 *
 * Implements Game of Fifteen (generalized to d x d).
 *
 * Usage: fifteen d
 *
 * whereby the board's dimensions are to be d x d,
 * where d must be in [DIM_MIN,DIM_MAX]
 *
 * Note that usleep is obsolete, but it offers more granularity than
 * sleep and is simpler to use than nanosleep; `man usleep` for more.
 */

#define _XOPEN_SOURCE 500

#include <cs50.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

// constants
#define DIM_MIN 3
#define DIM_MAX 9

// board
int board[DIM_MAX][DIM_MAX];

// dimensions
int d;

// prototypes
void clear(void);
void greet(void);
void init(void);
void draw(void);
bool move(int tile);
bool won(void);

int main(int argc, string argv[])
{
    // ensure proper usage
    if (argc != 2)
    {
        printf("Usage: fifteen d\n");
        return 1;
    }

    // ensure valid dimensions
    d = atoi(argv[1]);
    if (d < DIM_MIN || d > DIM_MAX)
    {
        printf("Board must be between %i x %i and %i x %i, inclusive.\n",
            DIM_MIN, DIM_MIN, DIM_MAX, DIM_MAX);
        return 2;
    }

    // open log
    FILE *file = fopen("log.txt", "w");
    if (file == NULL)
    {
        return 3;
    }
    // greet user with instructions
    greet();

    // initialize the board
    init();

    // accept moves until game is won
    while (true)
    {
        // clear the screen
        clear();

        // draw the current state of the board
        draw();

        // log the current state of the board (for testing)
        for (int i = 0; i < d; i++)
        {
            for (int j = 0; j < d; j++)
            {
                fprintf(file, "%i", board[i][j]);
                if (j < d - 1)
                {
                    fprintf(file, "|");
                }
            }
            fprintf(file, "\n");
        }
        fflush(file);

        // check for win
        if (won())
        {
            printf("ftw!\n");
            break;
        }

        // prompt for move
        printf("Tile to move: ");
        int tile = get_int();

        // quit if user inputs 0 (for testing)
        if (tile == 0)
        {
            break;
        }

        // log move (for testing)
        fprintf(file, "%i\n", tile);
        fflush(file);

        // move if possible, else report illegality
        if (!move(tile))
        {
            printf("\nIllegal move.\n");
            usleep(500000);
        }

        // sleep thread for animation's sake
        usleep(500000);
    }

    // close log
    fclose(file);

    // success
    return 0;
}

/**
 * Clears screen using ANSI escape sequences.
 */
void clear(void)
{
    printf("\033[2J");
    printf("\033[%d;%dH", 0, 0);
}

/**
 * Greets player.
 */
void greet(void)
{
    clear();
    printf("WELCOME TO GAME OF FIFTEEN\n");
    usleep(2000000);
}

/**
 * Initializes the game's board with tiles numbered 1 through d*d - 1
 * (i.e., fills 2D array with values but does not actually print them).
 */
void init(void)
{
    int num = (d*d) - 1;
    for (int i = 0; i < d; i++)
    {
        for (int j = 0; j < d; j++)
        {
            board[i][j] = num;
            num--;

            if (i == d - 1 && j == d - 1)
            {
            board[i][j] = 0;
            }

            if (board[i][j] == 1 && d % 2 == 0)
            {
                board[i][j] = 2;
                board[i][j - 1] = 1;
            }
        }
    }
}

/**
 * Prints the board in its current state.
 */
void draw(void)
{
    for (int i = 0; i < d; i++)
    {
        printf("\n");
        for (int j = 0; j < d; j++)
        {
            if (board[i][j] == 0)
            {
                printf(" _ ");
            } else
            {
                printf("%2i ", board[i][j]);
            }

        }
    }
    printf("\n\n");
}

/**
 * If tile borders empty space, moves tile and returns true, else
 * returns false.
 */
bool move(int tile)
{
    for (int a = 0; a < d; a++)
    {
        for (int b = 0; b < d; b++)
        {
            if (board[a][b] == tile && board[a + 1][b] == 0 && a + 1 != d)
            {
                int temp = board[a][b];
                board[a][b] = board[a + 1][b];
                board[a + 1][b] = temp;
                return true;
            }else
            if (board[a][b] == tile && board[a - 1][b] == 0 && a - 1 != -1)
            {
                int temp = board[a][b];
                board[a][b] = board[a - 1][b];
                board[a - 1][b] = temp;
                return true;
            } else
            if (board[a][b] == tile && board[a][b + 1] == 0 && b + 1 != d)
            {
                int temp = board[a][b];
                board[a][b] = board[a][b + 1];
                board[a][b + 1] = temp;
                return true;
            } else
            if (board[a][b] == tile && board[a][b - 1] == 0 && b - 1 != -1)
            {
                int temp = board[a][b];
                board[a][b] = board[a][b - 1];
                board[a][b - 1] = temp;
                return true;
            }
        }
    }
    return false;
}

/**
 * Returns true if game is won (i.e., board is in winning configuration),
 * else false.
 */
bool won(void)
{
    int count = 0;
    int num = 1;

    for (int i = 0; i < d; i++)
    {
        for (int j = 0; j < d; j++)
        {
            if (board[i][j] == num)
            {
                count++;
                if (count == d * d - 1 && i == d - 1 && j == d - 2)
                {
                    return true;
                }
            }
            num++;
        }
    }
    return false;
}
