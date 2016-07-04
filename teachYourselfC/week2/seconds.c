/* seconds.c */
/* 잠깐 멈추는 프로그램 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void sleep ( int nbr_seconds );

void main ( void )
{
	int x1;
	int wait = 13;
	/* 몇 초간 멈춤 
	 * eorlgksms ehddks ch eksdnlfh wjadmf cnffur */

	printf("Delay for %d seconds\n", wait );
	printf(">");

	for ( x1 = 1; x1 <= wait; ++x1 )
	{
		printf(".");	/* 점을 출력 */
		fflush(stdout);	/* 버퍼를 사용하는 경우에 출력을 강요함 */
		sleep( (int) 1 ); /* 1초간 멈춤 */
	}

	printf("Done!\n");	
}

void sleep( int nbr_seconds )
{
	clock_t goal;
	goal = ( nbr_seconds * CLOCKS_PER_SEC ) + clock();

	while( goal > clock() )
	{
		;
	}
}