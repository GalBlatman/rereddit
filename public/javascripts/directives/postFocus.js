app.directive('postFocus', function ($timeout) {
  return function (scope, elem, attrs) {
    scope.$watch(attrs.postFocus, function (newVal) {
      if (newVal) {
        $timeout(function () {
          elem[0].focus();
        }, 0, false);
      }
    });
  };
});

