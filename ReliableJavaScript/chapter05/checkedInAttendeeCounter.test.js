describe('Conference.checkedInAttendeeCounter', function(){
  var counter;

  beforeEach(function(){
    counter = Conference.checkedInAttendeeCounter();
  });
  describe('increment()', function(){
    // increment tests
  });
  describe('countIfCheckedIn(attendee)', function(){
    var attendee;

    beforeEach(function() {
      attendee = Conference.attendee('Mike', 'Metacalf');
    });

    it('doesn\'t increment the count if the attendee isn\'t checked in', function(){
      counter.countIfCheckedIn(attendee);
      expect(counter.getCount()).toBe(0);
    });
    it('increments the count if the attendee is checked in', function(){
      attendee.checkIn();
      counter.countIfCheckedIn(attendee);
      expect(counter.getCount()).toBe(1);
    });
    it('doesn\'t need this to be the checkedInAttendeeCoutner instance', function() {
      attendee.checkIn();
      // excute counter.countIfCheckedIn with this assigned to
      // an empty ojbect
      counter.countIfCheckedIn.call({}, attendee);
      expect(counter.getCount()).toBe(1);
    });
  });
});