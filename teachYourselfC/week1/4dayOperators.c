/* 나머지 연산자의 사용 예 */
/* 초 단위의 값을 입력하면 시,분, 초로 계산하여 출력한다. */
#include <stdio.h>

/* 상수 정의 */

#define SECS_PER_MIN 60
#define SECS_PER_HOUR 3600

unsigned seconds, minutes, hours, secs_left, mins_left;

int main ()
{
	/* 초 단위의 값 입력 */
	printf( "Enter number of seconds (< 6500) : ");
	scanf("%d", &seconds);
	hours = seconds / SECS_PER_HOUR;
	minutes = seconds / SECS_PER_MIN;
	mins_left = minutes % SECS_PER_MIN;
	secs_left = seconds % SECS_PER_MIN;

	printf("%u seconds in equal to ", seconds );
	printf("%u h, %u m, and %u s\n", hours, mins_left, secs_left);
		
	return 0;
}