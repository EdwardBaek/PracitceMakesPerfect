describe('returnValuesSimpleCache', function() {
  'use strict';

  var testObject;
  var testValue;
  var arg;
  var spyReference;

  // Helper function to create a test ojbect. Includes adding the spy to
  // testFunction, and storing a reference to the spy in the spyReference
  // property of the returned object.
  function createATestObject() {
    var obj = {
      testFunction: function(arg) {
        return testValue;
      }
    };
    spyOn(obj, 'testFunction').and.callThrough();

    //
    obj.spyReference = obj.testFunction;

    return obj;
  }

  /*** beforeEach omitted ***/
  beforeEach(function() {
    testObject = createATestObject();

    // testObject.testFunction를 returnValueSimpleCache 애스팩트로 장식한다
    Aop.around('testFunction',
      Aspects.returnValueCache().advice, testObject);

    args = [{key:"value"}, "someValue"];
  });

  describe('advice(targetInfo)', function() {
    /*** existing tests omitted ***/
    it('may share an injected cache between instances', function() {
      // Create a simpleCache shared cache object
      var sharedCache = Conference.simpleCache();
      var object1 = createATestObject();
      var object2 = createATestObject();

      Aop.around('testFunction', new Aspects.returnValueCache(sharedCache).advice, object1);
      Aop.around('testFunction', new Aspects.returnValueCache(sharedCache).advice, object2);

      object1.testFunction(args);

      // Call to object2's testfunction should make use of the cached result
      // of the call to object's testFunction
      expect(object2.testFunction(args)).toBe(testValue);

      //Thus, object2's testFunction should not be executed
      expect(object2.spyReference.calls.count()).toBe(0);
    });

    it('')
  });
});