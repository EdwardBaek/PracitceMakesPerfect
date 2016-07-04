/* grades.c - 배열을 사용하는 프로그램 */ 
/* 10개의 점수를 읽어들이고 평균을 구한다. */ 

#include <stdio.h>

#define MAX_GRADE 100
#define STUDENTS 10

int grades [STUDENTS];

int idx;
int total = 0;	/* 평균을 저장한다. */

int main()
{
	for( idx = 0; idx < STUDENTS; ++idx ){
		printf( "Enter Person %d's grade: ", idx + 1);
		scanf( "%d", &grades[idx] );

		while ( grades[idx] > MAX_GRADE )
		{
			printf( "\nThe highest grade possible is %d", MAX_GRADE );
			printf( "\nEnter correct grade: ");;
			scanf( "%d", &grades[idx] );
		}

		total += grades[idx];
	}

	printf(" \n\nThe average score is %d\n", ( total / STUDENTS ) );

	return 0;
}