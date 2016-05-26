/* 변수와 상수의 사용 예*/
#include <stdio.h>

/* 파운드를 그램으로 변환하는 상수 */
#define GRAMS_PER_POUND 454

/* 다음 세기의 시작에 대한 상수 */
const int THIS_YEAR = 2016;

/* 필요한 변수 선언 */
long weight_in_grams, weight_in_pounds;
int year_of_birth, age_in_this_year;

int main()
{
	/* 사용자로부터 데이터 입력 */

	printf( "Enter your weight in pounds: ");
	scanf( "%ld", &weight_in_pounds );
	printf( "Enter your year of birth: ");
	scanf( "%d", &year_of_birth );

	/* 변환 동작 */

	weight_in_grams = weight_in_pounds * GRAMS_PER_POUND;
	age_in_this_year = THIS_YEAR - year_of_birth;

	printf( "\nYour weight in grams = %ld.", weight_in_grams );
	printf( "\nYour weight in killo grams = %ld.", weight_in_grams / 1000 );
	printf( "\nIn %d your are %d years old.", THIS_YEAR, age_in_this_year );

}