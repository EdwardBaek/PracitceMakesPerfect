var conference = Conference || {};
Conference.caches = Conference.caches || {};

// Create an object literal {singleton} to use as a cache
// for the restaurantApi.getRestaurantWithinRadius function
Conference.caches.restaurantsWithinRadiusCache = {};

// Apply memoization to getRestaurantsWithinRadius

Aop.around(
  'restaurantApi',
  function addMemoizatiojnToGetRestaurantsWithinRadius(targetInfo) {

    // Original API returned from ThirdParty.restaurantApi().
    var api = Aop.next.call(this, targetInfo);

    // decorate the getRestaurantsWithinRaduis function to add
    // memoozation (with a shared cache) to it
    Aop.around('getRestaurantWithinRadius',
    Aspects
    .returnValueCache(Conference.caches.restaurantsWithinRadiusCache).advice,
    api
    );
    // Return the revised API.
    return api;
  },
  ThirdParty
);