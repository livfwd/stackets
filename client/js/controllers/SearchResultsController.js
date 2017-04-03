//This controller serves the results of all the snippets to the search page.
angular.module('stackets.searchResults', [])
  .controller('SearchResultsController', function ($scope, $state, $stateParams, Snippets, $location, $window) {
    $scope.searchResultsTitle = 'Search Results';
    $scope.data = {};
    var userId = $window.localStorage.userId;
    $scope.search = {
      search: $state.params.query || ''
    };
    $scope.search = $state.params.query;

    var truncateTitle = function(title) {
      var newTitle = [];
      var charCount = 0;
      title.split(' ').forEach(word => {
        if (charCount + word.length <= 21) newTitle.push(word);
        charCount += word.length;
      });
      newTitle = newTitle.join(' ');
      return newTitle + '...';
    };

    var truncateNote = function(note) {
      return note.split(' ').splice(0, 21).join(' ') + '...';
    };

    if ($location.$$path.split('/')[2] === 'mysnippets') {

      Snippets.getAllSnippets().then(function(snippets) {
        snippets = snippets.map(snippet => {
          if (snippet.notes.length > 20) snippet.notes = truncateNote(snippet.notes);
          if (snippet.title.length > 20) snippet.title = truncateTitle(snippet.title);
          snippet.snippet = JSON.parse(snippet.snippet);
          return snippet;
        });
        $scope.data.snippets = snippets;
      });

    } else if (!$location.$$path.split('/')[2]) {
      Snippets.getAllSnippets().then(function (snippets) {
        snippets = snippets.map(snippet => {
          if (snippet.notes.length > 20) snippet.notes = truncateNote(snippet.notes);
          if (snippet.title.length > 22) snippet.title = truncateTitle(snippet.title);
          snippet.snippet = JSON.parse(snippet.snippet);
          return snippet;
        });
        $scope.data.snippets = snippets;
      });

      $scope.user = function(snippet) {
        if (Number(snippet.user.id) === Number(userId)) {
          return true;
        }
        return false;
      }
      $state.params.query = '';
    } else if ($location.$$path.split('/')[2] === 'myfavorites') {
      Snippets.getFavsByUser(userId).then(function(response) {
        var snippets = response.data;
        snippets = snippets.map(snippet => {
          if (snippet.notes.length > 20) snippet.notes = truncateNote(snippet.notes);
          if (snippet.title.length > 22) snippet.title = truncateTitle(snippet.title);
          snippet.snippet = JSON.parse(snippet.snippet);
          return snippet;
        });
        $scope.data.snippets = snippets;
    });
  } else {
    $scope.category = $location.$$path.split('/')[2] || '';

    Snippets.getAllSnippets().then(function (snippets) {
      snippets = snippets.map(snippet => {
        if (snippet.notes.length > 20) snippet.notes = truncateNote(snippet.notes);
        if (snippet.title.length > 22) snippet.title = truncateTitle(snippet.title);
        snippet.snippet = JSON.parse(snippet.snippet);
        return snippet;
      });
      $scope.data.snippets = snippets;
    });

  }

    $scope.setAceEditorLang = function (form) {
      var languageId = Number(this.snippet.LanguageId);
      var language;
      for (var i = 0; i < $scope.languages.length; i++) {
        if ($scope.languages[i].id === languageId) {
          language = $scope.languages[i];
          break;
        }
      }
      $scope.ace = language.name;
      $scope._editor.getSession().setMode("ace/mode/" + $scope.ace);
    };
//the method below will serve the ace editor into the text box displaying the snippet.
    $scope.aceLoaded = function (_editor) {
      // Ace @ https://ace.c9.io/
    // Ace @ https://github.com/ajaxorg/ace
    // ui-ace @ https://www.npmjs.com/package/angular-ui-ace
    // CDN @ https://cdnjs.com/libraries/ace/
    // Editor font size
      // document.getElementById('editor').style.fontSize='14px';
      // Options
      var _session = _editor.getSession();
      var _renderer = _editor.renderer;
      _editor.setHighlightActiveLine(true);
      _editor.setShowPrintMargin(false);
      _editor.setReadOnly(true);
      _session.setUseWrapMode(true);
      _session.setTabSize(2);
      _session.setUseSoftTabs(true);
      // turn off syntax checking
      _session.setOption("useWorker", false);
      // Theme @ https://github.com/ajaxorg/ace/tree/master/lib/ace/theme
      _editor.setTheme("ace/theme/cobalt");
      // Mode @ https://github.com/ajaxorg/ace/tree/master/lib/ace/mode
      _session.setMode("ace/mode/javascript");
      _editor.$blockScrolling = Infinity;
      // Load the snippet's code
      _session.setValue('');
    };

  })
  .directive('searchresult', function(){
    return {
      controller: 'SearchResultsController',
      templateUrl: '../partials/search-results.html'
    }
  });
