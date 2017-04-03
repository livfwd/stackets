//This controller relates to the add snippet page and routes all the form inputs to the scope variable.

angular.module('stackets.addSnippet', ['ui.ace'])
  .controller('AddSnippetController', function ($scope, $location, Snippets) {
    $scope.addSnippetTitle = 'Add a Snippet'; // NOTE: I think this is unused
    $scope.languages = {};
    $scope.code = '';
    $scope.ace = 'javascript';
    $scope.resourceUrls = [];
    $scope.categories = [];
    $scope.subcategories = [];
    var userInfo = Snippets.getLoggedInUserData();
    var userId = userInfo.id;

    Snippets.getCategories().then(function(categories) {
      $scope.categories = categories;
    });

    $scope.setCategory = function(catIndex) {
      Snippets.getSubcategories(catIndex).then(function(subcategories) {
        $scope.subcategories = subcategories;
      })
    };

    Snippets.getAllLanguages().then(function (languages) {
      $scope.languages = languages;
    });

    //the method below will add a snippet using the add snippet form.
    $scope.addSnippet = function (form) {
      this.snippet.snippet = JSON.stringify($scope.code);
      this.snippet.resources = $scope.resourceUrls.length > 0 ? $scope.resourceUrls : [this.snippet.resources];
      this.snippet.userId = userId;
      Snippets.addSnippet(this.snippet).then(function(data) {
        $location.path('/snippets/' + data.data.id);
      });
      form.$setPristine();
      form.$setUntouched();
    };
//the method below ties the language selected for the snippet to the ace editor's style guide for that language.
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
//the method below will modify the text input field for the snippet on the add snippet page to embed the ace editor in its place.
    $scope.aceLoaded = function (_editor) {
      // Ace @ https://ace.c9.io/
    // Ace @ https://github.com/ajaxorg/ace
    // ui-ace @ https://www.npmjs.com/package/angular-ui-ace
    // CDN @ https://cdnjs.com/libraries/ace/
    // Editor font size
      $scope._editor = _editor;
      document.getElementById('editor').style.fontSize='14px';
      // Options
      var _session = _editor.getSession();
      var _renderer = _editor.renderer;
      _editor.setHighlightActiveLine(true);
      _editor.setShowPrintMargin(false);
      _editor.setReadOnly(false);
      _session.setUseWrapMode(true);
      _session.setTabSize(2);
      _session.setUseSoftTabs(true);
      // Theme @ https://github.com/ajaxorg/ace/tree/master/lib/ace/theme
      _editor.setTheme("ace/theme/cobalt");
      // Mode @ https://github.com/ajaxorg/ace/tree/master/lib/ace/mode
      _session.setMode("ace/mode/" + $scope.ace);
      // Load the snippet's code
      _session.setValue('');
      // Events
      _session.on("change", function(e) {
        $scope.code = _session.getValue();
      });
    };

    $scope.addResource = function(e) {
      var input = e.target.value;
      if (e.keyCode === 13) {
        $scope.resourceUrls.push(input);
        e.target.value = '';
      }
    }

    $scope.removeResource = function(resourceIndex) {
      $scope.resourceUrls.splice(resourceIndex, 1);
    }

  });
