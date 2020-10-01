describe('Conference.attendeeColoection', function() {
  describe('contains(attendee)', function() {
    // 
  });
  describe('add(attendee)', function() {
    // 
  });
  describe('remove(attendee)', function() {
    // 
  });
  describe('iterate(callback)', function() {
    var collection;
    var callbackSpy;

    // Helper functions
    function addAttendeesToCollection(attendeeArray) {
      attendeeArray.forEach(function(attendee) {
        collection.add(attendee);
      });
    }
    // ensure that the spy was called once for each element
    function verifyCallbackWasExecutedForEachAttendee(attendeeArray) {
      expect(callbackSpy.calls.count()).toBe(attendeeArray.length);
      
      var allCalls = callbackSpy.calls.all();
      for (var i = 0; i < allCalls.length; i++) {
        expect(allCalls[i].args[0]).toBe(attendeeArray[i]);
      }
    }

    beforeEach(function() {
      collection = Conference.attendeeCollection();
      callbackSpy = jasmine.createSpy();
    });
  
    it('does not execute the callback when the collection is empty', function() {
      collection.iterate(callbackSpy);
      expect(callbackSpy).not.toHaveBeenCalled();
    });
    it('executes the callback once for a single element collection', function() {
      var attendees = [
        Conference.attendee('Pete', 'Mitchell')
      ];
      addAttendeesToCollection(attendees);
      collection.iterate(callbackSpy);
      verifyCallbackWasExecutedForEachAttendee(attendees);
    });
    it('executes the callback once for each element in a collection', function() {
      var attendees = [
        Conference.attendee('Pete', 'Mitchell'),
        Conference.attendee('Charlotte', 'Blackwood'),
        Conference.attendee('Mike', 'Metcalf')
      ];
      addAttendeesToCollection(attendees);
      collection.iterate(callbackSpy);
      verifyCallbackWasExecutedForEachAttendee(attendees);
    });
  });
  
});