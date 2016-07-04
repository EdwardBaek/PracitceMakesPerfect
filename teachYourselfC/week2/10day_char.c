/* char 변수의 숫자형 특셩 */
#include <stdio.h>

/* 두 char형 변수 선언과 초기화 */

char c1 = 'a';
char c2 = 90;

unsigned char x; /* 확장 ASCII를 위해 부호 없는 형을 사용해야 함 */

main()
{
	/* 변수 c1을 문자형으로 출력하고 숫자형으로 출력 */
	printf("\nAs a character, variable c1 is %c", c1);
	printf("\nAs a number, variable c1 is %d", c1);

	/* 변수 c2을 문자형으로 출력하고 숫자형으로 출력 */
	printf("\nAs a character, variable c2 is %c", c2);
	printf("\nAs a number, variable c2 is %d\n", c2);

	for ( x = 180; x < 204; ++x)
	{
		printf("ASCII code %d is character %c\n", x, x );
	}

	return 0;
}