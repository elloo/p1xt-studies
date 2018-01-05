/**
 * Implements a dictionary's functionality.
 */

#include <stdbool.h>
#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

#include "dictionary.h"


#define LENGTH 45 // Maximum word length
typedef struct node {
    char word[LENGTH + 1];
    struct node *next;
}
node;

#define HASHSIZE 10000
node* hashTable[HASHSIZE]; // Declaring pointer for table

// Altered hash function djb2 - http://www.cse.yorku.ca/~oz/hash.html
unsigned long hash(const char *str)
{
    // Hashing lower-case word
    unsigned long hash = 31;
    int c = *str * strlen(str);

    hash = ((hash << 1) + hash) + c;

    return hash;
}

/**
 * Returns true if word is in dictionary else false.
 */
bool check(const char *word)
{
   int length = strlen(word);
   char lowWord[length + 1];

    // Converting words to lower-case
   for (int i = 0; i < length; i++)
   {
       lowWord[i] = tolower(word[i]);
   }

    lowWord[length] = '\0';

    struct node *cursor;
    for (cursor = hashTable[hash(lowWord)]; cursor != NULL; cursor = cursor->next)
    {
        if (strcmp(lowWord, cursor->word) == 0)
        {
          return true;
        }
    }
    return false;
}

/**
 * Loads dictionary into memory. Returns true if successful else false.
 */

// For use in size function
int count = 0;
bool loaded = false;

bool load(const char *dictionary)
{
    // Open dictionary file
    FILE *dict = fopen(dictionary, "r");

    if (dict == NULL)
    {
        printf("Could not open dictionary.\n");
        return false;
    }

    // Ensuring all linked lists end in NULL.
    for(int i = 0; i < HASHSIZE; i++)
    {
        hashTable[i] =  NULL;
    }

    // Parse through words
    while(true)
    {
        node* newNode = malloc(sizeof(node));

        if (newNode == NULL)
        {
            printf("Could not malloc for new node.\n");
            return false;
        }

        fscanf(dict, "%s", newNode->word);

        newNode->next = NULL;

        if(feof(dict))
        {
            free(newNode);
            break;
        }

        // Keep track of number of dictionary words - used in size
        count++;

        int hashVal = hash(newNode->word); // hashVal = the index of a bucket
        node* head = hashTable[hashVal];

        if(head == NULL)
        {
            hashTable[hashVal] = newNode; // Updating first node of hashTable
        }
        else
        {
            newNode->next = hashTable[hashVal]; // Inserting new node into front of hashTable
            hashTable[hashVal] = newNode; // Updating first node of hashTable
        }

    }

    fclose(dict);
    loaded = true;
    return true;
}

/**
 * Returns number of words in dictionary if loaded else 0 if not yet loaded.
 */
unsigned int size(void)
{
    if(loaded) // If dictionary has loaded, return count for words
    {
        return count;
    }
    else
    {
        return 0;
    }
}

/**
 * Unloads dictionary from memory. Returns true if successful else false.
 */
bool unload(void)
{
    for(int i = 0; i < HASHSIZE; i++)
    {
        node* cursor = hashTable[i];
        // Freeing the first node in each bucket until no nodes are left
        while(cursor != NULL)
        {
            node *temp = cursor;
            cursor = cursor->next;
            free(temp);
        }
    }

    loaded = false;
    return true;
}
