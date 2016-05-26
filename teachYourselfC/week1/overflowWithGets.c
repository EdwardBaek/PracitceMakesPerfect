#include <stdio.h>

int main()
{
	puts("test");
    char buff[1];
    printf("beffer size is - %lu\n", sizeof(buff) );
    printf("Input string : ");
    gets(buff);
    printf("[%s]\n", buff);
    printf("beffer size is - %lu\n", sizeof(buff) );    
    return 0;
}