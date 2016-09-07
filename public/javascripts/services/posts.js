app.factory('posts', ['$http', function($http) {
  var postService = {
    posts: [],

    getAll: function() {
      // blank for now
    }
  };
  
  return postService;
}]);