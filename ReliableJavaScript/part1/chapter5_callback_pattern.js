/****** Attendee ******/
var Conference = Conference || {};

Conference.attendee = function(firstName, lastName) {
  var checkedIn = false;
  var first = firstName || 'None';
  var last = lastName || 'None';
  return {
    getFullName: function() {
      return first + ' ' + last;
    },
    isCheckedIn: function() {
      return checkedIn;
    },
    checkIn: function() {
      checkedIn = true;
    }
  };
};

/****** AttendeeCollection ******/
var Conference = Conference || {};

Conference.attendeeCollection = function() {
  var attendees = [];
  return {
    contains: function(attendee) {
      return attendees.indexOf(attendee) > -1;
    },
    add: function(attendee) {
      if( !this.contains(attendee)) {
        attendees.push(attendee);
      }
    },
    remove: function(attendee) {
      var index = attendees.indexOf(attendee);
      if ( index > -1 ) {
        attendees.splice(index, 1);
      }
    },
    getCount: function() {
      return attendees.length;
    },
    iterate: function(callback) {
      // attendees의 각 attendee에 대해 콜백을 실행한다.
      attendees.forEach(callback);
    }
  }
}


/****** checkInRecorder ******/
var Conference = Conference || {};

Conference.checkInRecorder = function() {
  return {
    recordCheckIn: function(attendee) {
      // 외부 서비스를 통해 체크인 등록한다.
    }
  };
};


/*** checkInService ***/
var Conference = Conference || {};

Conference.checkInService = function(checkInRecorder) {
  // 주입한 checkInrecorder의 참조값을 보관한다.
  var recorder = checkInRecorder;
  return {
    checkIn: function(attendee) {
      attendee.checkIn();
      recorder.recordCheckIn(attendee);
    }
  };
};

/*
var checkInService = Conference.checkInService(Conference.checkInRecorder());
var attendees = Conferenece.attendeeCollection();

// UI에서 선택된 참가자들을 컬렉션에 추가한다.

attendees.iterate(checkInService.checkIn);
*/


/****** checkedInAttendeeCounter ******/
var Conference = Conference || {};

Conference.checkedInAttendeeCounter = function() {
  var checkedInAttendees = 0;
  // 자신의 참조값을 self라는 변수에 담고 this 대신 self를 참조하면 countIfCheckedIn 함수를 다른 곳에서도 사용할 수 있다.
  var self = {
    increment: function() {
      checkedInAttendees++;
    },
    getCount: function() {
      return checkedInAttendees;
    },
    countIfCheckedIn: function(attendee) {
      if (attendee.isCheckedIn()) {
        // this.increament();
        self.increment();
      }
    }
  };
  return self;
};