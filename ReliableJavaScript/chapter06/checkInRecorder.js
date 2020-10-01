var Conference = Conference || {};

Conference.checkInRecorder = function(){
  return {
    recordCheckIn: function(attendee) {
      return new Promise( function(resolve, reject) {
        if (attendee.isCheckedIn()) {
          resolve(4444);
        } else {
          reject(new Error(messages.mustBeCheckedIn));
        }
      });
    }
  };
};