/* 
정수를 입력받아 배열에 저장한다. 
0이 입력되거나 배열의 마지막에 도달하면(10개) 입력과정은 종료된다.
배열에서 가장 큰 값과 가장 작은 값을 출력한다.
*/
#include <stdio.h>

#define MAX_LENGTH 10
int get_max_number(int *array, int length);
int get_min_number(int *array, int length);

int main()
{
	int input;
	int array[MAX_LENGTH];
	int count;
	int max_number;
	int min_number;

	input = -1;
	count = 0;

	while ( 1 )
	{
		printf("input integer number one per line %d\n", count+1);
		printf("input 0 when finished.>");
		scanf("%d", &input);

		if( count == ( MAX_LENGTH -1 ) || input == 0 )
			break;

		array[count] = input;
		++count;
	}

	int i;

	printf("array = {");
	for( i = 0; i < count; ++i )
	{
		printf(" %d,", array[i]);
	}
	printf(" }\n");

	printf("In array, max number is %d, min number is %d.\n", get_max_number(array, count), get_min_number(array, count));

	return 0;
}

int get_max_number(int *array, int length)
{
	int max_number;
	int number;

	int i;
	max_number = array[0];
	for( i = 1; i < length; ++i )
	{
		number = array[i];
		if( max_number < number )
			max_number = number;
	}

	return max_number;	
}
int get_min_number(int *array, int length)
{
	int min_number;
	int number;

	int i;
	min_number = array[0];
	for( i = 1; i < length; ++i )
	{
		number = array[i];
		if( min_number > number )
			min_number = number;
	}

	return min_number;	
}