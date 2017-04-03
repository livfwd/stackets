//this controller generates the view of each individual snippet with all the items related to it such as title, language, code sample, etc.

angular.module('stackets.view', [])
  .controller('ViewSnippetController', function ($scope, Snippets, $stateParams) {
    $scope.snippet = {};
    $scope.code = '';

    Snippets.getSnippetById($stateParams.id).then(function (snippet) {
      $scope.id = snippet.id;
      $scope.snippet = snippet;
      $scope.code = JSON.parse(snippet.snippet);
    });

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
      document.getElementById('editor').style.fontSize='14px';
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
      // Events
      _session.on("change", function(e) {
        $scope.code = _session.getValue();
      });
    };
//the method below will serve the ace editor into the text box displaying the code sample.

  });
