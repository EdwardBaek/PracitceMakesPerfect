#include <stdio.h>
/* 겹쳐진 while문의 사용 예 */

int array[5];

int main()
{
	int ctr = 0,
		nbr = 0;

	printf("This program prompts you to enter 5 numbers\n");
	printf("Each number shoud be from 1 to 10\n");

	while ( ctr < 5 )
	{
		nbr = 0;
		while ( nbr < 1 || nbr > 10 )
		{
			printf("\nEnter number %d of 5: ", ctr + 1 );
			scanf("%d", &nbr);			
		}

		array[ctr] = nbr;
		ctr++;
	}

	for ( ctr = 0; ctr < 5; ctr++ )
		printf("\nValue %d is %d", ctr + 1, array[ctr] );

	return 0;
}