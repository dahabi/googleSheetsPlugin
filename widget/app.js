'use strict';

(function (angular) {
  angular.module('googleAppsSheetsPluginWidget', ['ui.bootstrap'])
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE) {
        var WidgetHome = this;

        /*
         * Fetch user's data from datastore
         */
        WidgetHome.init = function () {
          WidgetHome.success = function (result) {
              WidgetHome.data = result.data;
            if(WidgetHome.data&& WidgetHome.data.content.url)
            WidgetHome.data.content.url = WidgetHome.data.content.url.replace("/edit", "/htmlview");
            if (!WidgetHome.data.content)
                WidgetHome.data.content = {};
              console.log(">>>>>", WidgetHome.data);
            }
          WidgetHome.error = function (err) {
              if (err && err.code !== STATUS_CODE.NOT_FOUND) {
                console.error('Error while getting data', err);
              }
            };
          DataStore.get(TAG_NAMES.GOOGLE_APPS_SHEETS_DATA).then(WidgetHome.success, WidgetHome.error);
        };

        WidgetHome.onUpdateCallback = function (event) {
          if (event && event.tag === TAG_NAMES.GOOGLE_APPS_SHEETS_DATA) {
            WidgetHome.data = event.data;
            if(WidgetHome.data&& WidgetHome.data.content.url)
            WidgetHome.data.content.url = WidgetHome.data.content.url.replace("/edit", "/htmlview");
            if (WidgetHome.data&&!WidgetHome.data.design)
              WidgetHome.data.design = {};
            if (WidgetHome.data&&!WidgetHome.data.content)
              WidgetHome.data.content = {};
          }
        };
        
        DataStore.onUpdate().then(null, null, WidgetHome.onUpdateCallback);

        WidgetHome.init();

      }])
    .filter('returnUrl', ['$sce', function ($sce) {
      return function (url) {

        return $sce.trustAsResourceUrl(url);
      }
    }]);
})(window.angular);
