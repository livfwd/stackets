angular.module('stackets.services', [])
  .factory('Snippets', function ($http) {
    var isLoggedIn = false;
    var data;
    var languages;
    var user = {}

    var setLogInStatus = function() {
      isLoggedIn = true;
    }

    var setLogOutStatus = function() {
      isLoggedIn = false;;
    }

    var getLogStatus = function() {
      return isLoggedIn;
    }


    var logIn = function(id) {
      getUserData(id)
      .then(function(response){
        var data = response.data;
        user.email = data.email;
        user.name = data.name;
        user.image = data.image;
        user.id = id;
      });
    }

    var getLoggedInUserData = function() {
      return user;
    }

    var addSnippet = function (snippet) {
      return $http({
        method: 'POST',
        url: '/api/snippets',
        data: JSON.stringify(snippet)
      });
    };

    var getAllSnippets = function () {
      return $http({
        method: 'GET',
        url: '/api/snippets',
      }).then(function (resp) {
        data = resp.data;
        return data;
      });
    };

    var getRecentSnippets = function () {
      return $http({
        method: 'GET',
        url: '/api/snippets/recent',
        data: {
          limit: 1
        }
      }).then(function (resp) {
        data = resp.data;
        return data;
      });
    };

    var getAllLanguages = function () {
      return $http({
        method: 'GET',
        url: '/api/languages',
      }).then(function (resp) {
        languages = resp.data;
        return languages;
      });
    };

    var getSnippetById = function (id) {
      return $http({
        method: 'GET',
        url: '/api/snippets/' + id
      }).then(function (resp) {
        data = resp.data;
        return data;
      });
    };

    var getSnippetsByUser = function (data) {
      return $http({
        method: 'GET',
        url: '/api/getSnippetsByUser/' + data.userId
      }).then(function (resp) {
        data = resp.data;
        return data;
      });
    };

    var getFavsBySnippet = function (data) {
      return $http({
        method: 'GET',
        url: '/api/getFavsBySnippet/' +  data.snippetId
      }).then(function (response) {
        return response;
      });
    };

    var getFavsByUser = function (userId) {
      return $http({
        method: 'GET',
        url: '/api/getFavsByUser/' +  userId
      }).then(function (response) {
        return response;
      });
    };

    var isFavSnippetByUser = function (data) {
      return $http({
        method: 'GET',
        url: '/api/isFavSnippetByUser/' +  data.snippetId + '/' + data.userId
      }).then(function (response) {
        return response;
      });
    };

    var toggleFavorite = function (data) {
      return $http({
        method: 'POST',
        url: '/api/favorite',
        data: data
      });
    };

    var getCategories = function() {
      return $http({
        method: 'GET',
        url: '/api/categories'
      }).then(function(response) {
        return response.data;
      })
    };

    var getSubcategories = function(id) {
      return $http({
        method: 'GET',
        url: '/api/sub-categories/' + id
      }).then(function(response) {
        return response.data;
      })
    };

    var getUserData = function (id) {
      return $http({
        method: 'GET',
        url: '/api/getUserData/' + id
      });
    };

    var authenticate = function() {
      return $http({
        method: 'GET',
        url: '/authenticate'
      })
    }

    return {
      addSnippet: addSnippet,
      getAllSnippets: getAllSnippets,
      getAllLanguages: getAllLanguages,
      getRecentSnippets: getRecentSnippets,
      getSnippetById: getSnippetById,
      data: data,
      toggleFavorite: toggleFavorite,
      isFavSnippetByUser: isFavSnippetByUser,
      getFavsBySnippet: getFavsBySnippet,
      getCategories: getCategories,
      getSubcategories: getSubcategories,
      getUserData: getUserData,
      getFavsByUser: getFavsByUser,
      getSnippetsByUser: getSnippetsByUser,
      logIn: logIn,
      getLoggedInUserData: getLoggedInUserData,
      user: user,
      authenticate: authenticate,
      isLoggedIn: isLoggedIn,
      setLogInStatus: setLogInStatus,
      setLogOutStatus: setLogOutStatus,
      getLogStatus: getLogStatus
    };
  });
