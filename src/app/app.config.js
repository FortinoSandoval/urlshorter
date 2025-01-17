(function() {
  'use strict';

  angular.module('app').config(configBlock);

  /** @ngInject */
  function configBlock($locationProvider, $logProvider, $translateProvider,
                       tmhDynamicLocaleProvider, $compileProvider) {
    $locationProvider.
        html5Mode(true);

    $logProvider.
        debugEnabled(true);

    $translateProvider.
        useStaticFilesLoader({
          // Update `config.locales.directory` in `gulp/config.js` if change.
          prefix: '/locales/',
          suffix: '.json',
        }).
        preferredLanguage('en').
        fallbackLanguage('en').
        useSanitizeValueStrategy('escape').
      useMissingTranslationHandlerLog();
    
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);

    tmhDynamicLocaleProvider.
        // Angular locales pattern used by `buildAngularLocales()` in
        // `gulp/locales.js`.
        localeLocationPattern('/locales/angular-locale_{{locale}}.js').
        defaultLocale('en');
  }

})();
