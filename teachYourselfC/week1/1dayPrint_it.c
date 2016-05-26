/* print_it.c - 이 프로그램은 소스 리스트에 줄 번호를 추가하여 출력한다. */
#include <stdio.h>
#include <stdlib.h>

void do_heading(char *filename);

int line, page;

int main( int argv, char *argc[] )
{
	char buffer[256];
	FILE *fp;

	if( argv < 2 )
	{
		fprintf(stderr, "\nProper Usage is:" );
		fprintf(stderr, "\n\nPRINT_IT filename.txt\n");
		exit(1);		
	}

	if( ( fp = fopen( argc[1], "r" )) == NULL )
	{
		fprintf( stderr,"Error opening file, %s!", argc[1] );
		exit(1);
	}

	page = 0;
	line = 1;
	do_heading( argc[1] );

	while( fgets( buffer, 256, fp ) != NULL )
	{
		if( line % 55 == 0 ) 
			do_heading( argc[1] );

		fprintf( stdout, "%4d:\t%s", line++, buffer );
	}

	fprintf( stdout, "\f");
	fclose(fp);
	return 0;
}

void do_heading( char *filename )
{
	page++;

	if( page > 1 )
		fprintf( stdout, "\f");

	fprintf( stdout, "Page: %d, %s\n\n", page, filename );
}
/* stdprn은 ANSI C / DOS용이다. 리눅스에서 stdout을 사용하자.*/