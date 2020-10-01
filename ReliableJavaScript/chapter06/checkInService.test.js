describe('Conference.checkInService', function() {
  var checkInService;
  var checkInRecorder;
  var attendee;

  beforeEach(function() {
    checkInRecorder = Conference.checkInRecorder();
    checkInService = Conference.checkInService(checkInRecorder);
    attendee = Conference.attendee('Sam', 'Wells')
  });

  describe('checkInService.checkIn(attendee)', function() {
    describe('when checkInrecorder suceesds', function() {
      var checkInNumber = 1234;
      beforeEach(function() {
        spyOn(checkInRecorder, 'recordCheckIn').and.callFake(function(){
          return Promise.resolve(checkInNumber);
        });
      });
      it('marks the attendee checked in', function() {
        checkInService.checkIn(attendee);
        expect(attendee.isCheckedIn()).toBe(true);
      });
      it('records the check-in', function(){
        checkInService.checkIn(attendee);
        expect(checkInRecorder.recordCheckIn).toHaveBeenCalledWith(attendee);
      });
      it('sets the attendee\'s checkInNumber', function(done){
        checkInService.checkIn(attendee).then(
          function onPromiseResolved() {
            expect(attendee.getCheckInNumber()).toBe(checkInNumber);
            // done();
          },
          function onPromiseRejected() {
            expect('this failure branch was executed').toBe(false);
            // done();
          }
        );
      });
    });

    describe('when checkInrecorder fails', function() {
      var recorderError = 'Check-in recording failed!';
      beforeEach(function() {
        spyOn(checkInRecorder, 'recordCheckIn').and.returnValue(
          Promise.reject(new Error(recorderError))
        );
        spyOn(attendee, 'undoCheckIn');
      });
      it('returns a Promise rejected with the expected reason', function(data) {
        checkInService.checkIn(attendee).then(
          function promiseResolved() {
            expect('This success function to excute').toBe(false);
            done();
          },
          function promiserejected(reason) {
            expect(reason.message).toBe(recorderError);
            done();
          }
        );
      });
    });

  });
});