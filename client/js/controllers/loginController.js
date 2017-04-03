angular.module('stackets.login', [])

.controller('LoginController', function ($scope, $http, $window, $location, Snippets) {
	var query = $location.search()
  var photo = query["photo"];
  var imageKey = query["oe"];

  $scope.photo = photo;
  $scope.username = query["name"];
  $scope.imageUrl = photo + '&oe=' + imageKey;
  $scope.show = true;

  $scope.toggleShow = function() {
    $scope.show = $scope.show ? false : true;
  }

  $scope.loginUser = function(email, password) {
    $http({
          method: 'POST',
          url: '/login',
          data: {email: email, password: password}
    }).then(function(response){
      console.log('login response', response)
      $scope.loggedUserEmail = response.data.userEmail;
      $window.localStorage.stacketsToken = response.data.token;
      Snippets.setLogInStatus();
      $location.path('/');
    }, function(err){
      console.log(err)
    });
  }
})
