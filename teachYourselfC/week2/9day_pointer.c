#include <stdio.h>

int iArray[10] = {0,12,22,32,42,52,62,72,82,92};
int *p_test1;
int *p_test2;
int *p_test3;

int main()
{

	p_test1 = &iArray[3];
	p_test2 = &iArray[4];
	printf( "&iArray[3] \t= %d,\t&iArray[4] \t= %d \n", &iArray[3], &iArray[4]);
	printf( "p_test1 \t= %d,\tp_test2 \t= %d \n", p_test1, p_test2);
	printf( "iArray[3] \t= %d,\tiArray[4] \t= %d \n", iArray[3], iArray[4]);
	printf( "*p_test1 \t= %d,\t*p_test2 \t= %d \n", *p_test1, *p_test2);
	printf( "iArray[4] - iArray[3] = %d \n", iArray[4] - iArray[3] );
	printf( "&iArray[4] - &iArray[3] = %d \n", &iArray[4] - &iArray[3]);
	printf( "*p_test2 - *p_test1 = %d \n", *p_test2 - *p_test1 );
	printf( "p_test2 - p_test1 = %d \n", p_test2 - p_test1 );

	p_test3 = p_test1 + 1;
	printf( "*(p_test1 + 1) = %d\n", *(p_test1 + 1)) ;
	printf( "*p_test2 = %d\n", *p_test2);

	return 0;
}