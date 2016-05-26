/*프로그램 이름 : week1.c										*/
/*				100명까지의 나이와 수입을 입력하는 프로그램으로,	*/
/*				입력된 숫자에 따라 결과를 출력한다. 				*/
/*----------------------------------------------------------*/
/*----------------------*/
/*	헤더 파일				*/
/*----------------------*/
#include <stdio.h>

/*----------------------*/
/*	상수 정의 			*/
/*----------------------*/

#define MAX 100
#define YES	1
#define NO	0

/*----------------------*/
/*	변수		 			*/
/*----------------------*/

long	income[MAX];						/*	수입 저장			*/
int 	month[MAX], day[MAX], year[MAX];	/*	생일 저장			*/
int		x, y, ctr;							/*	카운터			*/
int 	cont;								/*	프로그램 제어용	*/
long 	month_total, grand_total;			/*	합계				*/

/*----------------------*/
/*	함수 원형	 			*/
/*----------------------*/

void main(void);
int display_instructions(void);
void get_data(void);
void display_report(void);
int continue_function(void);

/*----------------------*/
/*	프로그램의 시작		*/
/*----------------------*/

void main(void)
{
	cont = display_instructions();

	if ( cont == YES )
	{
		get_data();
		display_report();
	}
	else
	{
		printf("\nProgram Aborted by User!\n\n");
	}
}
/*----------------------------------------------------------*
 *	함수 :	display_instructions()							*
 *	목적 :	프로그램의 사용 방법을 알려주고, 					*
 *			계속하기 위해 /을 입력하도록 요구한다.				*
 *	반환값 : NO - 사용자가 0을 입력할 때						*
 * 			YES - 사용자가 0이 아닌 값을 입력할 때				*
 *----------------------------------------------------------*/
int display_instructions( void )
{
	printf("\n\n");
	printf("\nThis program enables you to enter up to 99 people\'s");
	printf("\nincomes and birthdays. It then prints the incomes by");
	printf("\nmonth along with the overall income and overall average.");
	printf("\n");

	cont = continue_function();
	return( cont );
}


/*----------------------------------------------------------*
 *	함수 :	get_data()										*
 *	목적 :	사용자로부터 데이터를 읽어들인다. 					*
 *			100명이 입력될 때가지 또는 0이 입력될 때까지			*
 *			데이터를 계속 읽어들인다.							*
 *	반환값 : 없음.											*
 * 	참고 :	생일에 0/0/0을 입력하게 해준다.						*
 *			또한, 월별로 31을 허용한다.							*
 *----------------------------------------------------------*/
void get_data( void )
{
	for ( cont = YES, ctr = 0; ctr < MAX && cont == YES; ctr++ )
	{
		printf("\nEnter information for Person %d.", ctr+1 );
		printf("\n\tEnter Birthday:");

		do
		{
			printf("\n\tMonth ( 0 - 12 ):");
			scanf("%d", &month[ctr]);			
		}while( month[ctr] < 0 || month[ctr] > 12 );

		do
		{
			printf("\n\tDay ( 0 - 31 ):");
			scanf("%d", &day[ctr]);			
		}while( day[ctr] < 0 || day[ctr] > 31 );

		do
		{
			printf("\n\tYear ( 0 - 3000 ):");
			scanf("%d", &year[ctr]);			
		}while( day[ctr] < 0 || day[ctr] > 3000 );

		printf("nEnter Yearly Income (whole dollars) : ");
		scanf("%ld", &income[ctr]);

		cont = continue_function();
	}
	/* ctr은 입력된 사람 수와 같다. */
}


/*----------------------------------------------------------*
 *	함수 :	display_report()								*
 *	목적 :	화면으로 결과를 출력한다.		 					*
 *	반환값 : 없음.											*
 * 	참고 :	더 많은 정보를 출력할 수도 있다.						*
 *----------------------------------------------------------*/

void display_report( void )
{
	grand_total = 0;
	printf("\n\n\n");
	printf("\n 		SALARY SUMMARY");
	printf("		==============");

	for( x = 0; x <= 12; x++ )
	{
		month_total = 0;
		for( y = 0; y < ctr; y++ )
		{
			if( month[y] == x )
				month_total += income[y];
		}
		printf("\ntotal for month %d is %ld", x, month_total);
		grand_total += month_total;
	}
	printf("\nReport totals:");
	printf("\ntotal Income is %ld", grand_total);
	printf("\nAverage Income is %ld", grand_total/ctr);

	printf("\n\n***end of Report***\n");
}

/*----------------------------------------------------------*
 *	함수 :	continue_function()								*
 *	목적 :	사용자에게 진행 여부를 묻는다.						*
 *	반환값 : YES - 계속하기를 원할 때 							*
 * 			NO  - 마치기를 원할 때          					*
 *----------------------------------------------------------*/

int continue_function( void )
{
	printf("\n\nDo you wish to continue? (0=NO/1=YES):");
	scanf("%d",&x);

	while( x < 0 || x > 1 )
	{
		printf("\n%d is invalid!", x);
		printf("\nPlease enter 0 to Quit or 1 to Continue:");
		scanf("%d", &x);
	}
	if( x == 0 )
		return NO;
	else
		return YES;
}


