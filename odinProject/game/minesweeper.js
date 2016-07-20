/**************************************************************************************************
	FileName 		: minesweeper.js
	Description 	: minesweeper game

	Update History
    2016.07.03		Edward      Create
    2016.07.21		Edward		Edit
**************************************************************************************************/
var _width = 12;
var _bombAmount = 15;
var _cells = new Array();
var _gameTable = 'gameTable';
var CELL_STATUS = {
	UNOPENED : 0,
	OPENED : 1,
};
var CELL_CONTENT = {
	BLANK : 0,
	BOMB : 9
}
var CELL = function(){
	this.status = 0;
	this.content = 0;
};

var initCells = function(){
	initCellData(_width*_width);
	setRamdomBombPosition( _cells, _bombAmount);
	setupCellLayout(_width);
};
var initCellData = function(max){
	for( var i = 0; i < max; ++i ){
		_cells[i] = new CELL();
		_cells[i].status = CELL_STATUS.UNOPENED;
		_cells[i].content = CELL_CONTENT.BLANK;
	}
};
var setRamdomBombPosition = function(cellArray, amount){
	var bombCount = 0;
	while( bombCount < amount ){
		var bombPositionIndex = getRamdomRangedInt(cellArray.length);
		var cellContent = cellArray[bombPositionIndex].content;
		if( cellContent !== CELL_CONTENT.BOMB ){
			cellArray[bombPositionIndex].content = CELL_CONTENT.BOMB;
			bombCount++;
			var adjecentCellArray = getAdjecentCellPositionArray(bombPositionIndex);
			addAdjecentBombNumber(adjecentCellArray);
		}
	}
};
var getAdjecentCellPositionArray = function(bombPositionIndex){
	var adjecentCellArray = new Array();
	var x = idToPointX(bombPositionIndex);
	var y = idToPointY(bombPositionIndex);
	var index = pointToId(x,y);

	adjecentCellArray.push([x-1, y-1]);
	adjecentCellArray.push([x,	 y-1]);
	adjecentCellArray.push([x+1, y-1]);
	adjecentCellArray.push([x-1, y  ]);
	adjecentCellArray.push([x+1, y  ]);
	adjecentCellArray.push([x-1, y+1]);
	adjecentCellArray.push([x,	 y+1]);
	adjecentCellArray.push([x+1, y+1]);

	for( var i = 0; i < adjecentCellArray.length; ++i){
		var x = adjecentCellArray[i][0];
		var y = adjecentCellArray[i][1];
		var index = pointToId(x,y);
		if( !isValidPosition( x, y ) || isCellStatusBomb( _cells[index].content ) ){
			adjecentCellArray.splice(i,1);
			i--;
		}
	}
	return adjecentCellArray;
};
var addAdjecentBombNumber = function(adjecentCellArray){
	for( var i = 0; i < adjecentCellArray.length; ++i){
		var x = adjecentCellArray[i][0];
		var y = adjecentCellArray[i][1];
		var index = pointToId(x,y);
		// console.log( index );
		_cells[ index ].content++;
	}
};
var setupCellLayout = function(_width){
	var table = $('#'+_gameTable);
	var id = 0;
	for( var y = 0; y < _width; ++y ){
		table.append( $('<tr>') );
		var tr = table.find('tr:last');
		for( var x = 0; x < _width; ++x){
			var td = $('<td>').attr('id', id).attr('class','unopened');
			var contentSpan = $('<span>').attr('class', 'content').text(_cells[id].content);
			var idSpan = $('<span>').attr('class', 'id').text(id);
			var cellStatus = _cells[id].content;
			tr.append( td.append( idSpan ).append( contentSpan ) );

			if( isCellStatusBomb( cellStatus ) ){
				td.addClass('bomb');
				td.find('.content').text('X');
			}else if( isCellStatusBlank( cellStatus ) ){
				td.addClass('blank');
				td.find('.content').text('');
			}

			id++;
		}
	}
};

///////////////////////////////////////////////////////////////
//		BEGIN FUNCTIONAL FUNCTION							 
//
var getRamdomRangedInt = function( max ){
	return Math.floor( (Math.random() * max ) );
};

///////////////////////////////////////////////////////////////
//		BEGIN VALIDATION FUNCTION							 
//
var isValidPosition = function(x, y){
	return (
		(( -1 < x ) && ( x < _width ))
		&& (( -1 < y ) && ( y < _width ))
	)
};
var isCellStatusBomb = function( content ){
	return ( content === CELL_CONTENT.BOMB );
};
var isCellStatusBlank = function( content ){
	return ( content === CELL_CONTENT.BLANK );
};
var isCellOpened = function(id){
	return ( _cells[id].status === CELL_STATUS.OPENED );
};
var hasBlankCellTopside = function(id){
	var x = idToPointX(id);
	var y = idToPointY(id);
	y--;
	if( isValidPosition(x,y) ){
		var movedId = pointToId(x,y);
		if( !isCellStatusBlank(movedId) ){
			return true
		}
	}
	return false;
};
var hasBlankCellBottomSide = function(id){
	var x = idToPointX(id);
	var y = idToPointY(id);
	y++;
	if( isValidPosition(x,y) ){
		var movedId = pointToId(x,y);
		if( !isCellStatusBlank(movedId) ){
			return true
		}
	}
	return false;
};

///////////////////////////////////////////////////////////////
//	BEGIN CONVERT FUNCTION
//
var idToPointX = function(id){
	return Math.floor( id % _width );
};
var idToPointY = function(id){
	return Math.floor( id / _width );
};

var pointToId = function(x,y){
	return (y*_width) + x;
};

///////////////////////////////////////////////////////////////
//	BEGIN CHANGE CELL STATUS
//
var openCell = function(id){
	$('#'+id).removeClass('unopened');
	$('#'+id).addClass('opened');
	changeCellStatus( id, CELL_STATUS.OPENED );
};
var openBlankCell = function(id){
	var adjecentCellArray = getAdjecentCellPositionArray(id);

	for( var i = 0; i < adjecentCellArray.length; ++i ){
		var tempId = pointToId( adjecentCellArray[i][0], adjecentCellArray[i][1] );
		openCell( tempId );
	}
};
var changeCellStatus = function(id, status){
	_cells[id].status = status;
};

///////////////////////////////////////////////////////////////
//	BEGIN CONTROL GAME
//
var registerClickEvent = function(){
	$('#'+_gameTable+' td').click(function(){
		var id = $(this).attr('id');
		onClickCell(id);
	});
};
var gameover = function(){
	alert('game over');
};
var onClickCell = function(id){
	var cell = _cells[id];
	var status = cell.status;
	if( isCellStatusBomb(_cells[id].content) ){
			gameover();
			return;
	}
	if( _cells[id].content === CELL_CONTENT.BLANK ){
		multiOpenCells(id);
	}else{
		openCell(id);
	}
};

// TODO : 중복체크를 확인하기 위해서 체크항목을 따로 작성하여 체크.
// TODO : 단방향체크이기에 위를 체크할 경우 아래로 내려가지 못함. 
// TODO : ID 0 일 경우에 체크를 못하는가? ID 12에서 올라가지 않았다!!!
// XXX : 커스텀 로거를 쓰는 것은 어떨까?
var multiOpenCells = function(id){
	checkAndOpenCellsHorizontalUp(id);
	checkAndOpenCellsHorizontalDown(id);
	console.log('multiOpenCells ends');
};
var moveCellPointToUp = function(id){
	var x = idToPointX(id);
	var y = idToPointY(id);
	if(hasBlankCellTopside(id)){
		var y = idToPointY(id) - 1;
		return pointToId(idToPointX(id),y);
	}
	return -1;
};
var moveCellPointToDown = function(id){
	var x = idToPointX(id);
	var y = idToPointY(id);
	if(hasBlankCellBottomSide(id)){
		var y = idToPointY(id) + 1;
		return pointToId(idToPointX(id),y);
	}
	return -1;
};
var checkAndOpenCellsHorizontalUp = function(id){
	var x = idToPointX(id);
	var y = idToPointY(id);
	// console.log( '\n>>>---BEGIN checkAndOpenCellsHorizontalUp checking id is ' + id);

	if( !isCellStatusBlank( _cells[id].content ) )
		return;

	var tempId;
	while( isValidPosition(x,y) && ( isCellStatusBlank(_cells[pointToId(x,y)].content) ) ){
		tempId = pointToId(x,y);
		var movedTowardUpId = moveCellPointToUp(tempId);
		if( movedTowardUpId != -1 )
			checkAndOpenCellsHorizontalUp( movedTowardUpId );

		// console.log('___Open toRight id-x/y is ' + tempId + '-'+ x + '/' + y );
		openBlankCell(tempId)
		++x;
	}
	// console.log( '--- ' + id + ' rigth side done' );

	x = idToPointX(id) - 1;
	if( isValidPosition(x,y) )
		tempId = pointToId(x,y);
	else return;

	while( isValidPosition(x,y) && ( isCellStatusBlank(_cells[pointToId(x,y)].content) ) ){
		var movedTowardUpId = moveCellPointToUp(tempId);
		// console.log(  tempId + ' hasUnopenedCellTopside(id) - ' + hasUnopenedCellTopside(tempId) );
		if( movedTowardUpId != -1 )
			checkAndOpenCellsHorizontalUp( movedTowardUpId );

		tempId = pointToId(x,y);
		// console.log('___Open toLeft id-x/y is ' + id + '-'+ x + '/' + y );
		openBlankCell(tempId)
		--x;
	}
	// console.log( '--- ' + id + ' left side done' );
	// console.log( '\n--->>>END checkAndOpenCellsHorizontalUp checking id is ' + id + '\n');
};
var checkAndOpenCellsHorizontalDown = function(id){
	var x = idToPointX(id);
	var y = idToPointY(id);
	// console.log( '\n>>>---BEGIN checkAndOpenCellsHorizontalDown checking id is ' + id);

	if( !isCellStatusBlank(_cells[id].content ) )
		return;

	var tempId;
	while( isValidPosition(x,y) && ( isCellStatusBlank(_cells[pointToId(x,y)].content) ) ){
		tempId = pointToId(x,y);
		var movedTowardDownId = moveCellPointToDown(tempId);
		// console.log( tempId + ' hasUnopenedCellBottomSide(id) - ' + hasBlankCellBottomSide(tempId) );
		// console.log( tempId + ' movedTowardDownId(id) - ' + movedTowardDownId );
		if( movedTowardDownId != -1 )
			checkAndOpenCellsHorizontalDown( movedTowardDownId );

		// console.log('___Open toRight id-x/y is ' + tempId + '-'+ x + '/' + y );
		openBlankCell(tempId);
		++x;
	}
	// console.log( '--- ' + id + ' rigth side done' );

	x = idToPointX(id) - 1;
	if( isValidPosition(x,y) )
		tempId = pointToId(x,y);
	else return;

	while( isValidPosition(x,y) && ( isCellStatusBlank(_cells[pointToId(x,y)].content) ) ){
		var movedTowardDownId = moveCellPointToDown(tempId);
		// console.log(  tempId + ' hasUnopenedCellBottomSide(id) - ' + hasBlankCellBottomSide(tempId) );
		if( movedTowardDownId != -1 )
			checkAndOpenCellsHorizontalDown( movedTowardDownId );

		tempId = pointToId(x,y);
		// console.log('___Open toLeft id-x/y is ' + id + '-'+ x + '/' + y );
		openBlankCell(tempId);
		--x;
	}
	// console.log( '--- ' + id + ' left side done' );
	// console.log( '\n--->>>END checkAndOpenCellsHorizontalDown checking id is ' + id + '\n');
};


///////////////////////////////////////////////////////////////
//	PAGE LOADING
//
(function(){
	initCells();

	registerClickEvent();
})();