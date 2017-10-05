#include <cs50.h>
#include <stdio.h>

int main(void){
    printf("Minutes: ");
    int minutes = get_int();

    int bottles = minutes * 12;
    printf("Bottles: %i\n", bottles);
}