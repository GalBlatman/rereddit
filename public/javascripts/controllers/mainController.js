app.controller('MainCtrl', ['$scope','posts', function($scope, postService){
  $scope.posts = postService.posts;

  $scope.ESCAPE_KEY = 27;
  $scope.editedPost = {};

  $scope.addPost = function() {
    if ($scope.title === '') { return; }
    $scope.posts.push({ 
      title: $scope.title, 
      link: $scope.link,
      upvotes: 0,
      comments: [
        { author: 'Joe', body: 'Cool post!', upvotes: 0 },
        { author: 'Bob', body: 'Bad post!', upvotes: 3 },
        { author: 'Jim', body: 'Ok post!', upvotes: 1 }
      ]
    });
    $scope.title = '';
    $scope.link = '';
  }

  $scope.incrementUpvotes = function(item) {
    item.upvotes += 1;
  }
  
  $scope.removeTodo = function (index) {
    posts.splice(index, 1);
  };

  $scope.editPost = function (post) {
    $scope.editedPost = post;

    // Clone the original post to restore it on demand. 
    $scope.originalPost = angular.copy(post);
  };
  
  $scope.doneEditing = function (post, index) {
    $scope.editedPost = {};
    post.title = post.title.trim();

    if (!post.title) {
      $scope.removePost(index);
    }
  };


  $scope.revertEditing = function (index) {
    $scope.editedPost = {};
    posts[index] = $scope.originalPost;
  };

}]);



