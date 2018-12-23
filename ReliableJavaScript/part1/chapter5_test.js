describe('Conference.attendeeCollection', function() {
  var collection;
  var attendee = [
    Conference.attendee('윤지', '김')
  ];
  var attendees = [
    Conference.attendee('Tom', 'Kazansky'),
    Conference.attendee('charlotte', 'Blackwood'),
    Conference.attendee('태영', '김')
  ];

  function addAttendeesToCollection(attendeeArray) {
    attendeeArray.forEach(function(attendee) {
      collection.add(attendee);
    });
  }

  beforeEach(function() {
    collection = Conference.attendeeCollection();
  });
  
  describe('contains(attendee)', function() {
    it('등록한 참가자의 유무를 확인한다.', function() {
      addAttendeesToCollection(attendees);
      attendees.forEach(function(attendee) {
        expect(collection.contains(attendee)).toBe(true);
      });
    });

    it('등록하지 않은 참가자의 유무를 확인한다.', function() {
      expect(collection.contains(attendee)).toBe(false);
      addAttendeesToCollection(attendees);
      attendees.forEach(function(attendee) {
        expect(collection.contains(attendee)).toBe(true);
      });
      expect(collection.contains(attendee)).toBe(false);
    });
  });
  
  describe('add(attendee)', function() {
    it('참가자를 추가한다.', function() {
      collection.add(attendee);
      expect(collection.getCount()).toBe(attendee.length);

      addAttendeesToCollection(attendees);

      expect(collection.getCount()).toBe(attendee.length + attendees.length);
    });
    it('중복 추가자를 추가하지 않는다.', function() {
      collection.add(attendee);
      collection.add(attendee);
      expect(collection.getCount()).toBe(1);
    });
  });

  describe('remove(attendee)', function() {

  });

  describe('getCount()', function() {

  });

  describe('iterate(callback)', function() {
    var callbackSpy;

    

    function verifyCallbackWasExcutedForEachAttendee(attendeeArray) {
      // 각 원소가 한 번씩 스파이가 호출되었는지 확인한다.

      expect(callbackSpy.calls.count()).toBe(attendeeArray.length);

      // 각 호출마다 spy에 전달한 첫 번째 인자가 해당 attendee인지 확인한다.
      var allCalls = callbackSpy.calls.all();
      for (var i = 0; i < allCalls.length; ++i) {
        expect(allCalls[i].args[0]).toBe(attendeeArray[i]);
      }
    }

    beforeEach(function() {
      callbackSpy = jasmine.createSpy();
    });

    it('빈 컬렉션에서는 콜백을 실행하지 않는다.', function() {
    // it('does not excute the callback when the collection is empty.', function() {
      collection.iterate(callbackSpy);
      expect(callbackSpy).not.toHaveBeenCalled();
    });

    it('원소가 하나뿐인 컬렉션은 콜백을 한 번만 실행한다', function() {
    // it('excutes the callback once for a single element collection.', function() {
      
      addAttendeesToCollection(attendee);

      collection.iterate(callbackSpy);

      verifyCallbackWasExcutedForEachAttendee(attendee);
    });

    it('컬렉션 원소마다 한 번씩 콜백을 실행한다', function() {
    // it('excutes the callback once for each element in a collection', function() {
      
      addAttendeesToCollection(attendees);

      collection.iterate(callbackSpy);

      verifyCallbackWasExcutedForEachAttendee(attendees);
    });
  });
});


describe('Conferenct.checkInService', function(){
  var checkInService;
  var checkInRecorder;
  var attendee;

  beforeEach(function() {
    checkInRecorder = Conference.checkInRecorder();
    spyOn(checkInRecorder, 'recordCheckIn');

    // checkInRecorder를 주입하면서,
    // 이 함수의 recordCheckIn 함수에 스파이를 심는다.
    checkInService = Conference.checkInService(checkInRecorder);

    attendee = Conference.attendee('형철', '서');
  });

  describe('checkInService.checkIn(attendee)', function() {
    it('참가자를 체크인 처리한 것으로 표시한다.', function() {
    // it('makes the attendee checked in', function() {
      checkInService.checkIn(attendee);
      expect(attendee.isCheckedIn()).toBe(true);
    });
    it('체크인을 등록한다', function() {
    // it('recordes the check-in', function() {
      checkInService.checkIn(attendee);
      expect(checkInRecorder.recordCheckIn).toHaveBeenCalledWith(attendee);
    });
  });
});


describe('Conference.checkedInAttendeeCounter', function() {
  var counter;

  beforeEach(function() {
    counter = Conference.checkedInAttendeeCounter();
  });
  describe('increment()', function() {
    // increament 테스트
  });
  describe('getCount()', function() {
    // getCount 테스트
  });
  describe('countIfCheckedIn(attendee)', function() {
    var attendee;

    beforeEach(function() {
      attendee = Conference.attendee('태영', '김');
    });

    it('참가자가 체크인하지 않으면 인원수를 세지 않는다.', function() {
    // it('doesn\'t increments the count if the attendee isn\'t checked in, function() {
      counter.countIfCheckedIn(attendee);
      expect(counter.getCount()).toBe(0);
    });

    it('참가자가 체크인하면 인원수를 센다', function() {
    // it('increments the count if the attendee is checked in', function() {
      attendee.checkIn();
      counter.countIfCheckedIn(attendee);
      expect(counter.getCount()).toBe(1);
    });

    it('this가 꼭 checkedInAttendeeCounter 인스턴스를 가리키는 것은 아니다', function() {
    // it('does\'t need this to be the checkedInAttendeeCounter instance', function() {
      attendee.checkIn();
      // this에 빈 객체를 넣고
      // counter.countIfCheckedIn을 실행한다.
      counter.countIfCheckedIn.call({}, attendee);
      expect(counter.getCount()).toBe(1);
    })
  });
});