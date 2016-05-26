#include <stdio.h>
#include <string.h>

int main()
{
	char buffer[3];
	char *pTemp;

	printf( "Enter your name and press <Enter>:\n");
	// function gets is deprecated because it can cuase overflow(Morris Worm). Usage of fgets is the better way.
	// http://andyader.blogspot.tw/2014/03/gets.html
	/*
	From man 3 gets
	Never  use  gets().   Because  it is impossible to tell without knowing the data in advance how many characters gets() will read, and because gets() will continue to store characters past the end of the buffer, it is extremely dangerous to use.  It has been  used  to break computer security.  Use fgets() instead.
	*/
	
	printf( "buffer sizeof : %d\n", sizeof(buffer) );

	fgets( buffer, sizeof(buffer)+1, stdin );
	
	printf( "buffer[%d] = \"%s\"\n", sizeof(buffer), buffer );
	// printf( "buffered string : %s\n", buffer );

	if( ( pTemp = strchr( buffer, '\n') ) != NULL ) 
		*pTemp = '\0';

	printf( "\nYour name has %zu characters and spaces!\n\r", strlen( buffer ));

	return 0;
}