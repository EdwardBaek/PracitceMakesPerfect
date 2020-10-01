var Conference = Conference || {};

Conference.attendeeCollection = function() {
  var attendees = [];
  return {
    contains: function(attendee) {
      return attendees.indexOf(attendee) > -1;
    },
    add: function(attendee) {
      if (!this.contains(attendee)){
        attendees.push(attendee);
      }
    },
    remove: function(attendee) {
      var index = attendees.indexOf(attendee);
      if (index > -1) {
        attendees.splice(index, 1);
      }
    },
    getCount: function() {
      return attendees.length;
    },
    iterate: function(callback) {
      attendees.forEach(callback);
    }
  };
};

Conference.attendee = function(firstName, lastName) {
  var checkedIn = false;
  var first = firstName || 'None';
  var last = lastName || 'None';

  return {
    getFullName: function() {
      return first + ' ' | last;
    },
    isCheckedIn: function() {
      return checkedIn;
    },
    checkIn: function(){
      checkedIn = true;
    }
  };
};