# RELIABLE JAVASCRIPT

# Part 1 - LAYING A SOLID FOUNDATION / 제 1부 기초 다지기
## CHAPTER 1 Practicing Skillful Software Engineering - 좋은 소프트웨어 만들기
## 1.1 바르게 시작되는 코드 작성하기
자바스크립트의 특성을 완벽히 섭렵하라.

#### 함수 내부 중첩과 함수 반환: rj3.svg.line의 호출부
```javascript
var rj3 = {};
rj3.svg = {};
rj3.svg.line = function() {
  /*...*/
  function line(data) {/*...*/}
  /*...*/
  return line;
}
```
함수가 함수를 반환하는 일은 프로그래밍 언어에서 대개 혼동을 일으키는 금기 사항이지만, 자바스크립트에서는 아키텍처의 선택권을 넓혀주는, 지극히 당연한 습관이다.
> 자바스크립트 함수는 다른 함수 내부에 중첩될 수 있으며, 이는 스코프를 관리하는 중요한 수단이다.
> 자바스크립트 함수는 메서드/프로퍼티를 지닌 객체로, 다른 언어의 함수보다 훨씬 유연하고 강력하다.

#### 메소드 재정의와 오버로딩
```javascript
rj3.svg.line = function() {
  /*...*/
  GetX = function(point){/*...*/};
  /*...*/
  function line(data) {/*...*/}
  while ( ++i < n ) {
    d = data[i];
    points.push([+getX.call(this, d, i), +getY.call(this, d, i)]);
  }
  /*...*/
  line.x = function(funcToGetX) {
    if( !argumnets.length) return getX;
    getX = funcToGetX;
    return line;
  } 
  /*...*/
}
```
```javascript
(function(){
  var objectData = [
    {x: 10, y: 130},
    /*...*/
  ];
  var arrayData = objectData.map(function(d){
      return [+d.x, +d.y];
    }
  );
  var lineGenerator = rj3.svb.line(),
    path = lineGenerator(arrayData);
  document.getelementById('element').setAttribute('d', path);
})()
```
```javascript
// line.x와 line.y의 사용
(function() {
  var objectData = [
    {x: 10, y: 130},
    /*...*/
  ];
  var lineGenerator = rj3.svg.line()
        .x(function(d) { return d.x; }) 
        .y(function(d) { return d.y; }),
      path = lineGenerator(arrayData);
  document.getelementById('element').setAttribute('d', path);
})();
```

while 구문의 call : 두번째 인자 i는 배열 인덱스로, 여기서는 쓰지 않지만, 다른 곳에서는 쓸 수 있다. 이것이 함수 오버로딩이라는 객체 지향 개념을 자바스크립트에 녹인 원리다.
> 자바스크립트에서 객체 지향적 함수 오버로딩 개념은 함수의 arguments를 확인하고 이에 맞춰 조정하는 것이다.


#### 덕 타이핑(duck typing)
```javascript
function XYPair(x,y) {
  this.x = x;
  this.y = y;
}

var objectData = [
  new XYPair(10, 120),
  new XYPair(100, 60),/*...*/
]
```
```javascript
/* 판별 */
if( something instanceof XYPair)

/*  자바스크립트에서는 쉽게 생각해서 프로퍼티 존재 여부만 따져보면 그만이다.  */
if( 'x' in something)  // something이 x라는 프로퍼티를 소유 또는 상속하는가?
/* Or */
if(something.hasOwnProperty('x'))  // something이 x를 상속이 아닌 자신만의 프러퍼티로 소유하는가?
```

> 덕 타이핑을 잘 활용하라, 적은 코드로도 객체를 폭넓게 다룰 수 있다.

#### 클로저 (Closure)
내부 line 함수가 외부 line 함수 반환 이후, getX 변수에 어떻게 접근하지?
rj3.svg.line() 호출시 내부 line 함수를 반환하는 것 같지만, 실제로 반환하는 것은 클로저이다. 클로저는 함수 같은 객체지만, 함수의 생성 당시 환경(getX)를 내부에 고스란히 간직한다. 내부 line에 있는 함수들을 호출할 때, 이들은 line의 원래 환경을 전부 기억하는 셈이다. 
> 클로저는 자바스크립트의 정말 강력한 설계 요소다. 모든 함수는 클로저다. Closures are a very powerful design element in JavaScript. Every function is a closure.

#### this
```javascript
while ( ++i < n ) {
  d = data[i];
  points.push([+getX.call(this,d,i), +getY.call(this,d,i)});
}
```
```javascript
// 외부 객체에서 값을 얻음.
/*...*/
var lineGenerator = rj3.svg.line()
    .x(function(d,i) { return 10 + i * 50;})
    .y(function(d) { return 200 - this.getValue(d); });  // 외부 함수 getValue
(function() {
  var yearlyPriceGrapher = {
    lineGenerator: rj3.svg.samples.funcitonBasedLine(),
    getValue: function getValue(year) {
      return 10 * Math.pow(1.8, year-2010);
    }
  },
  years = [2010, 2011, 2012, 2013, 2014, 2015],
  path = yearlyPriceGrapher.lineGenerator(years);

  document.getElementById('pathFromFunction').setAttribute('d', path);
})();
```
> 자바스크립트에서 'this'는 설계 관점에서 절호의 기회가 될 수 있다. 잘 써먹도록 하자! In JavaScript, “this” offers a design opportunity. Use it!

#### 자바스크립트는 싱글 스레드로 움직인다.
비동기 프로그래밍을 하라.

#### 1.1.2 대규모 시스템에서 자바스크립트 함정을 피하라
##### 스크립트는 모듈이 아니다.
##### 스코프는 중첨 합수로 관리한다.
##### 규약을 지켜 코딩한다.

#### 1.1.3 소프트웨어 공학 원칙을 적용하라.
##### SOLID 원칙
- Single Responsibility Principle(단일 책임 원칙)
- Open/Closed Principle(개방/폐쇄 원칙)
- Liskov Substitution Principle(리스코프 치환 원칙)
- Interface Segregation Principle(인터페이스 분리 원칙)
- Dependency Inversion Principle(의존성 역전 원칙)
##### DRY 원칙 - Don't Repeat Yourself

## 1.2 바르게 유지되는 코드 작성하기
### 1.2.2 TDD(Test Driven Development) 테스트 주도 개발을 해라.
Also, writing the test after the fact ensures that the application code behaves as it was written, which is not neccessarily as it should behave.
사후 테스트를 작성하면 애플리케이션 코드가 어떻게 작동해야 한다는 것이 아니라 작성한 대로 작동 할 거라는 뚱딴지같은 사실을 확인하는 꼴이다.
-> 테스트란 명세/요구조건대로 코드가 실행되는지를 알아보는 것이다.

### 1.2.3 테스트하기 쉬운 코드로 다듬어라
관심사를 적절히 분리하라. 역할을 각 관심사별로 분리 추출하여, 새 객체에 단일 책임으로 부여하자. 서로 다른 관심사는 작고 간단한 모듈로 나누어 만들면 코드 작성과 테스트 그리고 이해하기 쉽다.

## 1.3 정리하기
rj3.svg.line은 아주 작은 함수이지만 함수의 객체성, 중첩 함수, 함수 오버로딩, 덕 타이핑, 클로저, this의 강력함을 잘 보여준다.
단위 테스트는 장기적인 관점에서 최선의 투자이다. 
테스트 주도 개발은, 장기적 믿음성을 보장하는 단위 테스트 제공하고, 더 나은 인터페이스 설계와 코드 개발 속도에 도움이 된다.
테스트성을 높이려면 관심사를 분리하는 일에 집중하고 단일 책임 원칙이나 의존성 주입같은 소프트웨어 공학 원칙을 잘 사용하자. 

## CHAPTER 2 Tooling Up
- 본인이 개발한 코드의 믿음성을 단위 테스팅 프레임워크인 재스민으로 보장한다.
- 의존성 주입(DI) 컴테이너로 모듈성, 재사용성, 테스트성을 높인다.
- 애스팩트 지향 프로그래밍(AOP)으로 코드를 더욱 간단하고 바르게 작성한다.
- 테스트 주도 개발의 사례를 든다.
- JSLint로 제품 출시 전 코드의 문제점을 발견한다.

### 2.1 테스팅 프레임워크
- 승현은 아래의 일을 하게되었다.
- 한 여행사의 차세대 예약 시스템 구축 프로젝트의 항공 예약 데이터 생성 모듈
- 작동 명세 : '승객(passenger) 객체, 항공편(flight) 객체를 입력받은 createReservation은 passenger Information 프로퍼티가 승객 객체, flightInformation 프로퍼티가 항공편 객체인 새로운 객체를 반환한다.'
```javascript
// TDD 없이 작성한 createreservation 구현부
function createReservation(passenger, flight) {
  return {
    passengerInfo: passenger,
    flightInfo: flight
  };
}
```
```javascript
// 테스트 작성 - 자스민 사용
describe('createReservation(passenger, flight)', function() {
  it('주어진 passenger를 passengerInfo 프로퍼티에 할당한다.', fucntion(){
    var testPassenger = {/*...*/}
    var testFlight = {/*...*/}
    var reservation = createReservation(testPassenger, testFlight);
    expect(reservation.passengerInfo).toBe(testPassenger);
  });
  it('주어진 flight를 flightInfo 프로퍼티에 할당한다.', fucntion(){
    var testPassenger = {/*...*/}
    var testFlight = {/*...*/}
    var reservation = createReservation(testPassenger, testFlight);
    expect(reservation.flightInfo).toBe(testFlight);
  });
})
```
> 두 단위 테스트에 반복될 설정 코드는 명백한 DRY(반복하지 마라) 원칙 위반이다. testPassenger와 testFlight가 중복 선언되었다.

다른 팀에서 createReservation 함수 통합 작업을 진행중, createReservation 함수 테스트가 모두 실패했다는 메일이 왔다. 명세에 예약 객체의 속성명이 passengerInformation과 flightInformation이라고 나와 있지만, 개발을 너무 서두른 나머지 속성명을 passengerInfo와 flightInfo로 잘못 코딩했다.

명세가 아니라 함수 코드의 개발에 따라 테스트를 작성한 탓에 테스트는 기대하는 함수 작동이 아닌, 구현된 함수의 (잘못된) 실제 작동을 확인한 꼴이다.

> 단위 테스트가 없는 기존 코드를 작업할 땐 실제 기능을 확인하는 테스트를 작성해야 한다. 그래야 밖으로 표출되는 기능을 변경하지 않은 상태에서 코드를 리팩토링할 수 있다.


#### 2.1.1 잘못된 코드 발견하기
- 명세: createReservation은 승객 객체, 항공편 객체를 입력받아 passengerInformation 프로퍼티가 승객 객체, flightInformation 프로퍼티가 항공편 객체인 새로운 객체를 반환한다.
- 명세에 맞추어 먼저 passengerInformation 프로퍼티 할당이 정상적인지 테스트를 작성한 후, 테스트를 성공시킬 createReservation 코드를 최소한으로 작성한다.
- createReservation 코드안에 에러가 있다면 즉시 확인하여 조치할 수 있다.
- createReservation 같은 사소한 함수에 일일이 테스트를 하는 것에 지나치다고 느낄 수 있다. 하지만, 에러가 발생했을시 하나 하나 확실히 검증된 테스트 부분을 확인한다면 보다 빠르게 에러를 찾아낼 수 있을 것이다.

#### 2.1.2 테스트성을 감안하여 설계하기
- 테스트를 먼저 작성하라는 것은 코드의 테스트성(testablity)을 차후에 두고 볼 문제가 아니라, 우선적인 주요 관심사로 생각하는 것이다.
- 코드의 테스트 용이성은 테스트가 얼마나 잘 이루어지는지와 직접적인 상관 관계가 있다.
- 테스트하기 쉬운 코드는 유지보수와 확장성이 우수하다. 
- SOLID 개발 원칙을 준수하면 코드 테스트에 도움이되며, 결국 테스트성을 설계 목표로 정하면 SOLID한 코드를 작성할 수 있다.

예를 들어 createReservation 함수로 생성한 모든 예약 데이터를 웹 서비스를 거쳐 데이터베이스에 저장해야한다고 하자.
- TDD 없이 개발시, 비동기 자바스크립트와 XML(AJAX)로 예약 데이터를 웹 서비스 종단점으로 전송하는 호출 코드를 createReservation에 추가하면 된다.
- TDD에 충실한 사람이면 crateReservation을 먼저 고치기보다는 일단 새 기능을 확인하는 테스트를 작성한다. 예약 데이터가 제대로 웹 서비스 종단점까지 보내졌는지를 확인한다.
- 정말 creatReservation이 웹 서비스 통신까지 맡아야 하나?
- 아니다. 대부분의 경우 필요없다. 웹 서비스 통신 전담 객체가 없으면 하나 만들고 테스트 하는 것이 좋다.
- 코드 테스트성을 극대화하면 SOLID 원칙을 어긴 코드를 쉽게 찾아 낼 수 있다.

#### 2.1.3 필요한 코드만 작성하기
TDD 작업 절차는
1. 작은 기능 하나를 검증하려는 테스트를 작성한다.
2. 테스트를 성공시킬 만큼의 최소한의 코딩을 한다.
3. 내부적으로 구현 세부를 변경하는 리팩토링으로 중복 코드를 제거한다.
이런 과정을 거치면 결국 꼭 필요한 코드만 남게된다.

#### 2.1.4 안전한 유지 보수와 리팩토링
- 종합적인 단위 테스트가 마련된 제품 코드의 확장 보수시에 실수로 다른 코드를 건드리지 않았다는 확신을 가지고 코드 일부를 변경할 수 있기 때문에 안도감과 실제 코드 품질의 안정감을 얻는다.

#### 2.1.5 실행 가능한 명세
- TDD는 구축된 단위 테스트는 테스트 대상 코드의 실행 가능한 명세(runable specification) 역할을 한다.
- 자스민의 개별 테스느인 스팩은 검중할 작동 로직을 일상 문장으로 표현하며 시작한다. 각 테스트 실행시 이 문장들은 테스트 결과로 화면에 표시된다.
- 결국 단위 테스트한 결과 메세지만을 보고도 해당 함수가 무슨 일을 하는지 알아 볼 수 있다.

#### 2.1.6 최신 오픈 소스 및 상용 프레임워크
##### QUint
- 제이쿼리 개발자가 작성
- 노드JS나 리노 자바스크립트 엔진 같이 브라우저가 아닌 환경에서 실행가능
> [QUnit 홈페이지 참조](http://qunitjs.com/) 
##### D.O.H.
- 도조(Dojo) 자바스크립트 프레임워크 개발자/운영자를 위해 개발되었지만, D.O.H. 자체는 도조와 의존 관계가 없어 범용 자바스크립트 테스팅 프레임워크로도 사용됨
- 노드JS나 리노 자바스크립트 엔진 같이 브라우저가 아닌 환경에서 실행가능
> [D.O.H. 홈페이지 참조](http://dojotoolkit.org/reference-guide/1.10/util/doh.html#util-doh)

#### 2.1.7 자스민
- 자스민은 행위 주도 개발(Behavio-Driven Development, BDD) 방식으로 자바스크립트 단위 테스트를 작성하기 위한 라이브러리이다.
- BDD는 단위 테스트로 확인할 기능 또는 작동 로직을 일상 언어로 서술하여 개발자가 '어떻게'가 아니라 '무엇'을 해야 하는지 테스트 코드에 표현할 수 있다.
- 행위 주도 스타일로 정의/구성한 테스트는 쉬운 문장으로 서술한 기능 명세서로 삼을 수 있다.

##### 기본과 beforeEach/afterEach
```javascript
describe('createReservation(passenger, flight)', function() {
  var testPassenger = null,
    testFlight = null,
    testReservation = null;
  beforeEach(function() {
    testPassenger = {/*...*/};
    testFlight = {/*...*/};
    testReservation = createReservation(testPassenger, testFlight);
  })
  it('passenger를 passengerInformation 프로퍼티에 할당한다.', function() {
    expect(testReservation.passengerInformation).toBe(testPassenger);
  })
  it('flight를 flightInformation 프로퍼티에 할당한다.', function() {
    expect(testReservation.flightInformation).toBe(testFlight);
  })
})
```
```javascript
// createReservation
function createReservation(passenger, flight) {
  return {
    passengerInformation: passenger,
    flightInformation: flight
  };
}
```

##### 기대식과 매처 - Expectations and Matchers 
- 기대식(expect)가 테스트 대상 코드의 실제값을 인자로 받아 매처(matcher)-여기서는 toBe-로 기댓값과 비교한다.
```javascript
expect(testReservation.passengerInformation).toBe(testPassenger);
```
- 자스민 기본 내장 매처가 용도에 맞지 않다면, 커스텀 매처를 만들어 사용가능하다.
> [자스민-제이쿼리](https://github.com/velesin/jasmine-jquery) 매처 라이브러리

##### 스파이 - Spy
- 자스민 스파이(spy)는 테스트 더블(test double) 역할을 하는 함수이다.
- 테스트 더블은 함수/객체의 본래 구현부를 테스트를 위해 다른 (간단한) 코드로 대체한 것이다. 보통 웹 서비스 같은 외부 자원(네트워크 연결등)과의 의존 관계를 없애고 단위 테스트의 복잡도를 낯출 목적으로 사용된다.
- createReservation 함수에 다른 팀원이 만든 ReservationSaver라는 객체를 추가 사용하여보자.
- ReservationSaver는 내부 saveReservation 함수로 웹 서비스에 예약 데이터를 전송하는 기능을 캡슐화했다.
- createReservation 함수를 확장하여 ReservationSaver 인스턴스를 인자로 받아 saveReservation 함수를 실행한다. 테스트시에 saveReservation 함수가 실행되는지를 확인한다.
- saveReservation 함수의 웹 서비스 통신에 데이터 테스트는 단위 테스트에서 할 필요가 없다.
> 외부 시스템과 연동하는 테스트를 통합 테스트(Integration Test)라 한다. 

```javascript
// test
describe('createReservation', function() {
  var testPassenger = null;
  var testFlight = null;
  var testReservation = null;
  var testSaver = null;
  beforeEach(function() {
    testPassenger = {/*...*/};
    testFlifht = {/*...*/};
    testSaver = new ReservationSaver();
    spyOn(testSaver, 'saveReservation');
    testReservation = createReservation(testPassenger, testFlight, testSaver);
  });
  /*...passenger, flight 프로퍼티 할당 테스트...*/
  it('예약 정보를 저장한다.', function() {
    expect(testSaver.saveReservation).toHaveBeenCalled();
  });
})

// createReservation
function createReservation(passenger, flight, saver) {
  var reservation = {
    passengerInformatino: passenger,
    flightInformatin: flight
  };
  saver.saveReservation(reservation);
  return reservation;
}
function ReservationSaver() {
  this.saveReservation = function(reservation) {/*...*/}
}
```
- **spyOn(객체, '함수')**는 객체에 임의의 함수를 넣어 감시할 수 있게한다.
- **expect(함수).toHaveBeenCalled()**는 함수가 실행되었는지 확인가능하다. (toHaveBeenCalledTimes로 몇번 호출되었는지도 알 수 있다.)

> 다음 다섯 가지를 테스트 더블이라한다.
> - 더미(dummy): 보통 인자 리스트를 채우기 위해 사용되며, 전달은 하지만 실제로 사용되지는 않는다.
> - 틀(stub): 더미를 조금 더 구현하여 아직 개발되지 않은 클래스나 메서드가 실제로 작동하는 것처럼 보이게 만든 객체로 보통 리턴값을 하드 코딩한다.
> - 스파이(spy): 들과 비슷하지만 내부적으로 기록을 남긴다는 점이 다른다. 특정 객체가 사용되었는지, 예상되는 메서드가 특정한 인자로 호출되었는지 등의 상황을 감시(spying)하고 이러한 정보를 제공하기도 한다.
> - 모의체(fake): 들에서 조금 더 발전하여 실제로 간단히 구현된 코드를 갖고는 있지만, 운영 환경에서 사용할 수는 없는 객체다.
> - 모형(mock): 더미, 틀, 스파이를 혼합한 형태와 비슷하나 행위를 검증하는 용도로 주로 사용된다.


### 2.2 의존성 주입 프레임워크
#### 2.1.1 의존성 주입이란?**
- 승현은 자바스크립트 콘퍼런스 행사의 웹 사이트 구축 업무에 자원했다. **좌석 예약 기능**을 갖춘 클라이언트 측 코드 개발을 맡게 되었다.
- 승현은 먼저 ConferenceWebSvc 객체에 서비스를 캡슐화하고 팝업 메세지를 표시할 객체 Messenger를 작성한다.
- 참가자는 1인당 세션을 10개까지 등록할 수 있다. 참가자가 한 세션을 등록하면 그 결과의 성공/실패 메세지가 나와야한다.
- ConferenceWebSvc는 동기 호출하였다. 더 나은 방법은 5, 6장에 소개한다.

```javascript
// Attendee 초기 버전
Attendee = function(attendeeId) {
  // 'New'로 생성하도록 강제한다.
  if( !(this instanceof Attendee)) {
    return new Attendee(attendeeId);
  }

  this.attendeeId = attendeeId;

  this.service = new ConferenceWebSvc();
  this.messenger = new Messenger();
};

// 주어진 세션에 좌석 예약을 시도한다.
// 성공/실패 여부를 메세지로 알려준다.
Attendee.prototype.reserve = function(seesionId) {
  if( this.service.reserve(this.attendeeId, sesstionId)) {
    this.messenger.success('좌석 예약이 완료되었습니다!' + 
      ' 고객님은 ' + this.service.getRemainingReservations() + 
      ' 좌석을 추가 예약하실 수 있습니다.');
  } else {
    this.messenger.failure('죄송합니다, 해당 좌석은 예약하실 수 없습니다.');
  }
};
```
- 단위 테스트는 그 자체로 신속하고 확고해야 한다.
- HTTP 호출이 있는 ConferenceWebSvc와 메시지마다 OK 버튼이 있는 Messenger는 단위 테스트의 대상이 아니다. 
- 모든 단위가 미처 준비되기 전에 시스템 테스트의 늪으로 빠지지 말자.
- 이 단위 테스트의 주체는 Attendee 객체이다. 의존성 주입으로 해결할 수 있다.
- 이 객체가 의존하는 코드는 의존성 주입 방식으로 바꾸고, 단위 테스트에서는 모의체(fake - 메서드는 같지만 처리 로직은 가짜인 객체)나 자스민 스파이 같은 대체제를 주입한다.

```javascript
// 운영 환경
var attendee = new Attendee(new ConferenceWebSvc(), new Messenger(), id);

// 개발(테스트) 환경
var attendee = new Attendee(fakeService, fakeMessenger, id);
```

> DI 프레임워크를 사용하지 않고 의존성을 주입(DI)하는 것을 '빈자의 의존성 주입(poor man's dependency injection)'이라 한다. 

```javascript
Attendee = function(service, messenger, attendeeId) {
  /*...*/
  this.attendeeId = attendeeId;
  this.service = service;
  this.messenger = messenger;
}
```

#### 2.2.2 의존성을 주입하여 믿음직한 코드 만들기
- DI로 주입한 스파이나 모의 객체는 더 많은 제어권을 가지므로, 다양한 에러 조건과 기이한 상황을 만들어낼 수 있다.
- 이는 폭넓은 테스트 범위를 제공한다.

#### 2.2.3 의존성 주입의 모든 것

DI 제다이가 되기 위한 질문 리스트. 한 가지라도 "예"라면 직접 인스턴스화(instantiation)하지 말고 주입하는 방향으로 생각을 전환하라.

- [ ] 객체 또는 의존성 중 어느 하나라도 DB, 설정 파일, HTTP, 기타 인프라 등의 외부 자원에 의존하는가?
- [ ] 객체 내부에서 발생할지 모를 에러를 테스트에서 고려해야 하나?
- [ ] 특정한 방향으로 객체를 작동시켜야 할 테스트가 있는가?
- [ ] 서드파티(third-party) 제공 객체가 아니라 온전히 내가 소유한 객체인가?

좋은 의존성 주입 프레임워크를 골라 써야 API랑 친해지기 쉽고 여러모로 도움이 된다. 

2.2.4 사례 연구: 경량급 의존성 주입 프레임 워크 개발

의존성 주입 프레임 워크는 이렇게 작동한다.

1. 애플리케이션이 시작되자마자 각 인젝터블(injectable) 명을 확인하고 해당 인젝터블이 지닌 의존성을 지칭하며 순서대로 DI 컨테이너에 등록한다.
2. 객체가 필요하면 컨테이너에 요청한다.
3. 컨테이너는 일단 요청받은 객체와 그 의존성을 모두 재귀적으로 인스턴스화한다. 그런 다음, 요건에 따라 필요한 객체에 각각 주입한다.

앵귤러JS는 위와 같은 프로세스를 사용한다. 

##### 프레임 워크 개발 step 1

컨테이너는 두 가지 일을 한다.
1. 인젝터블과 의존성을 등록한다. 
1. 요청시 객체를 내어준다.

컨테이너의 register 함수의 인자
- 인젝터블 명
- 의존성 명을 담은 배열
- 인젝터블 객체를 반환하는 함수 - 인젝터블 인스턴스를 요청하면 컨테이너는 이 함수를 호출아혀 반환값을 다시 그대로 반환한다. 요청받은 객체의 의존성 인스턴스 역시 이 함수에 전달한다. 

```javascript
DiContainer = function() {
};

인자를 확인하는 테스트
DiContainer.prototype.register = function(name, dependencies, func) {
};
```
```javascript
describe('DiContainer', function() {
  var container;
  beforeEach(function() {
    container = new DiContainer();
  });
  describe('register(name, dependecies, func)', function() {
    // 01
    it('인자가 하나라도 빠졌거나 타입이 잘못되면 예외를 던진다', function() {
      var badArgs = [
        // 인자가 아예 없는 경우
        [],
        // name 만 있는 경우
        ['Name'],
        // name과 dependencies만 있는 경우
        ['Name',['Dependencies'], ['Dependencies']],
        // dependencies 가 빠진 경우
        // (사용 프레임워크는 지원하지만 DiContainer는 지원하지 않음)
        ['Name', function(){}],
        // 타입이 잘못된 다양한 사례들
        [1, ['a','b'], function() {}],
        ['Name', [1,2], function() {}],
        ['Name', ['a','b'], 'should be a function'],
      ];
      badArgs.forEach(function(args) {
        expect(fucntion() {
          container.register.apply(container, args);
        }).toThrow();
      });
    });
  });
});
```

인자 체크 기능을 보탠 DiContainer.register
```javascript
DiContainer.prototype.messages = {
  registerRequiresArgs: '이 생성자 함수는 인자가 3개 있어야 합니다: ' + '문자열, 문자열 배열, 함수'
};

DiContainer.prototype.register = function(name, dependencies, func) {
  var ix;

  if(typeof name !== 'string'
  || !Array.isArray(dependencies)
  || typeof func !== 'function') {
    throw new Error(this.messages.registerRequiresArgs);
  }
  for (ix=0; ix<dependecies.lenght; ++ix) {
    if (typeof dependencies[ix] !== 'string') {
      throw new Error(this.messages.registerRequiresArgs);
    }
  }
};
```

메세지가 프로토 타입에 있어서 외부에 드러나 있다. 이런 식으로 테스트를 더 견고하게 작성할 수 있다.
함수가 toThrow() 할 거라 기대하지 말고, 다음과 같이 바꾸면 더 정확하고 명확한 테스트가 된다.

```javascript
.toThrowError(container.message.registerRequiresArgs);
```

> 확실한 네거티브 테스트(negative test)를 위해서는 에러가 났다는 사실뿐만 아니라 실제 에러 메세지까지 확인하라. 프로토 타입이나 함수를 통해 테스트 대상이이 가진 메세지를 밖으로 표출하는 것이다.

##### 프레임 워크 개발 step 2

register 함수는 아무 일도 하지 않으며, 의존성을 다시 끌어내기 어려우므로 잘 들어갔는지 테스트하기 어렵다.
get 함수를 먼저 살펴보자. 

인자 확인으로 시작하는 것은 언제나 좋다. 에러 체크를 빨리 할 수록 코드는 견고해진다.
'코드를 다 짤때까지' 기다렸다가 시기를 놓치기 쉽다.

> 에러 처리 코드를 제일 먼저 테스트하라. 그 다음 다른 업무로 넘어가도 늦지 않다.

```javascript
describe('get(name', function() {
  it('성명이 등록되어 있지 않으면 undeifned를 반환한다.', function() {
    expect(container.get('notDefined')).toBeUndefined();
  });
});
```

테스트는 실패한다. 당장 에러를 조치할 만큼만 코딩을 한다.

```javascript
DiContainer.prototype.get = function() {
};
```

테스트가 성공한다. TDD에서 '우연히' 성공하는 테스트는 괜찮다. 앞으로 무엇을 테스트할지 확실히 알고 있다면 잘못된 상환은 저절로 바로 잡힌다. 지금 다른 코드가 들어차 있다면 테스트를 앞질러 가버린 셈이다.

> 코드가 전혀 없어도 좋다. 테스트를 성공시킬 최소한의 코드만 작성하라. 테스트코드를 앞서 가지 마라.

```javascript
it('등록된 함수를 실행한 결과를 반환한다.', function() {
  var name = 'MyName'
  var returnFromRegisteredFunction = 'something';
  container.register(name, [], function() {
    return returnFromRegisteredFunction;
  });
  expect(container.get(name).toBe(returnFromRegisteredFunction))
});
```







### 2.3 애스팩트 툴킷
### 2.4 코드 검사 도구
### 2.5 정리하기


## CHAPTER 3 Constructing Reliable Objects










