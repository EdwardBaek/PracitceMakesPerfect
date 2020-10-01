var conference = Conference || {};

Conference.checkInService = function(checkInRecorder) {
  // retain a reference to the injected checkInRecorder
  var recorder = checkInRecorder;

  return {
    checkIn: function(attendee) {
      attendee.checkIn();
      recorder.recordCheckIn(attendee);
    }
  };
};