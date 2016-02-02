/*
		function StatsAgeGenderParserToVaildJson( jsonStats )
		{
			return
			{
				getDetailData : 
				isValidData : 
				getMalePercent :
				getFemalePercent : 
				getAgeRate : function( idxAge ) {					

				getStrongGenderGroup : 
				getStrongGenderGroupPercent : 
				getStrongAgeGroup : 
			}
		}

		function StatsAgeGenderParserToVaildJson( jsonStats )
		{
			return
			{
				getData : function(){ return validJsonData },
				isValidData : function(){ isValidData },
				getMalePercent : function(){ return malePercent },
				getFemalePercent : function(){ return femalePercent },
			}
		}
		*/
		


		//StatsAgeGenderParseToArray
		/*
		사용할 데이터 : 유투버 채널의 연령별 남녀 성비 
		데이터 정보
		100% = 남성 전체 + 여성 전체
		
		가끔 남녀 쌍에서 하나가 없을 수 있다.
		bgKim - 나머지 정보를 더했을때 100%가 나온 것이 있었다.
		
		{  
		   "kind":"youtubeAnalytics#resultTable",
		   "columnHeaders":
		   [  
		      {  
		         "name":"ageGroup",
		         "columnType":"DIMENSION",
		         "dataType":"STRING"
		      },
		      {  
		         "name":"gender",
		         "columnType":"DIMENSION",
		         "dataType":"STRING"
		      },
		      {  
		         "name":"viewerPercentage",
		         "columnType":"METRIC",
		         "dataType":"FLOAT"
		      }
		   ],
		   "rows":
		   [  
		      [  
		         "age13-17",
		         "male",
		         0.5
		      ],
		      [  
		         "age13-17",
		         "female",
		         1.5
		      ],
		      [  
		         "age18-24",
		         "male",
		         3.3
		      ],
		      [  
		         "age18-24",
		         "female",
		         10.4
		      ],
		      ...
		   ]
		}
		*/
	
		/*
		0.rows
		[  
		 "age13-17",
		 "male",
		 0.5
		],
		[  
		 "age13-17",
		 "female",
		 1.5
		],


		1. 배열 > 배열
		[
			{
				'age13-17',
				0,
				0
			}
		];
		2. 배열 > 프로퍼티( 해쉬 )
		[
			{
				age: 'age13-17',
				male : 0,
				female : 0
			}
		];
		명시적인 것이 좋다. -> 2


		1.파라메터 정보 유무 확인
			값이 없을 경우 	-> validData = false, arrayData = null / []
							-> info에 에러 기록 
		2.이중 배열로 데이터 정렬 및 저장
		  정보 쌍(남/여) 체크
			쌍 일경우 		-> 다음으로 진행
			쌍이 아닐 경우 	-> 정보가 없는 것을 0으로 변경 후 -> info에 기록
		  					-> 반복문의 기준 인자수에 -1
		  배열에 저장
		3.전체 퍼센트 합산하여 
			100일 경우 -> isValidData = true
			100이 아닐 경우 -> isValidData = false
		*/
		/*
			*고쳐야 할 부분
			로직의 구현이 길다.
			연산 속도 또한 길다.
			단순한 로직을 단순하지 않았다.

			변수명이 명확하지 않다.
			
			*목표
			깔끔한 로직.
			명확한 변수명.

			*방안
			기존의 라이브러리를 참조한다.
			텍스트북을 타이핑한다.
			*/



			function setData( jsonStats ){
				var rowData = jsonStats.rows;
				var strAge;
				var fMalePercent = 0.0;
				var fFemalePercent = 0.0;
				for( var i = 0; i < rowData.length; i + 2 ){
					strAge = '-';
					fMalePercent = 0.0;
					fFemalePercent = 0.0;
					// check and extract data
					if( isLeftOverFare( rowData, i ) ){
						if( isMaleFemaleFare( rowData[ i ], rowData[ i + 1 ] ) ){
							//FIXME: rename
							var tempObj = extractMaleFemalePercent( rowData[ i ], rowData[ i + 1 ] );	
							fMalePercent = tempObj.male;
							fFemalePercent = tempObj.female;
						}else{
							//FIXME: rename
							var tempObj = extractOneObjPercent( rowData[ i ] );
							fMalePercent = tempObj.male;
							fFemalePercent = tempObj.female;
							i -= 1;
						}
					}else{
						//FIXME: rename
						var tempObj = extractOneObjPercent( rowData[ i ] );
						fMalePercent = tempObj.male;
						fFemalePercent = tempObj.female;
					}

					// put valid date to array
					// fMalePercent = jsonStats.rows[i][2]
					// fFemalePercent = jsonStats.rows[i+1][2]

					strAge = jsonStats.rows[ i ][ 0 ].substr( 3 );
					_arrayData.push(
						{
							age	: strAge,
							male : fMalePercent,
							female : fFemalePercent
						}
					);

					
				}
			}

			// function isLeftOverFare( rowData, i ){
			// 	var nowIndex = i + 1;
			// 	var totalNum = rowData.length;
			// 	var leftNumber = ( totalNum - nowIndex );
			// 	return ( 2 <= leftNumber );
			// }

			function boundaryCheck( rowData, i ){
				var nowIndex = i + 1;
				var totalItemNum = rowData.length;
				var remainNumber = ( totalNum - nowIndex );
				return ( 2 <= remainNumber );
			}

			function isMaleFemaleFare( obj1, obj2 ){
				var genderString1 = obj1[0];
				var genderString2 = obj2[0];
				return ( genderString1 == genderString2 );
			}

			//FIXME: rename
			function extractOneObjPercent( obj ){
				var returnOjb = {
					male : 0,
					female : 0
				};
				if( obj[1] === 'male' ){
					returnObj.male = obj[1];
				}else{
					returnObj.female = obj[1];
				}
				return returnObj;
			}

			function extractMaleFemalePercent( obj1, obj2 ){
				var returnOjb = {
					male : 0,
					female : 0
				};

				if( obj1 ){
					if( obj1[1] === 'male' ){
						returnOjb.male = obj1[2];
					}
					if( obj1[1] === 'female' ){
						returnOjb.female = obj1[2];	
					}
				}
				if( obj2 ){
					if( obj2[1] === 'male' ){
						returnOjb.male = obj2[2];
					}
					if( obj2[1] === 'female' ){
						returnOjb.female = obj2[2];	
					}
				}
				return returnOjb;
			}



			return{
				isValidData : function(){
					return _isValidData;
				},
				getArrayData : function(){
					return _arrayData;
				}
			};
