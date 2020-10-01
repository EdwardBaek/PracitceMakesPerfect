var conference = Conference || {};

Conference.checkInService = function(checkInRecorder) {
  // retain a reference to the injected checkInRecorder
  var recorder = checkInRecorder;

  return {
    checkIn: function(attendee) {
      attendee.checkIn();
      return recorder.recordCheckIn(attendee).then(
        // Success
        function onRecordCheckInSucceeded(checkInNumber) {
          attendee.setCheckInNumber(checkInNumber);
          return Promise.resolve(checkInNumber);
        },
        // Failure
        function onrecordcheckInFailed(reason) {
          attendee.undoCheckIn();
          return Promise.reject(reason);
        }
      );
    }
  };
};