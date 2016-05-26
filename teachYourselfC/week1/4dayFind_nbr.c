/*
이름 : Find_nbr.c
목적 : 이 프로그램은 임의의 수를 선택해서 사용자가 추축하게 한다.
변환 값 : 없음
*/
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define NO 0
#define YES 1

void main(void)
{
	int guess_value = -1;
	int number;
	int nbr_of_guesses;
	int done = NO;

	printf("\n\nGetting a Random number\n");

	/* 난수 생성기를 사용할 차례 */
	srand( (unsigned)time( NULL ) );
	number = rand();

	printf("\nNumber is %d", number);

	nbr_of_guesses = 0;
	while( done == NO )
	{
		printf("\nPick a number between 0 and %d> ", RAND_MAX );
		scanf( "%d", &guess_value ); 

		nbr_of_guesses++;

		if( number == guess_value )
		{
			done = YES;
		}
		else if( number < guess_value )
		{
			printf("\nYour guessed high!");
		}
		else
		{
			printf("\nYour guessed low!");
		}
	}

	printf("\n\nCongratulations! You guessed right in %d Guesses!", nbr_of_guesses );
	printf("\n\nthe number was %d\n\n", number);
}
