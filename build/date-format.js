(function() {
  angular.module('formstamp').directive('dateFormat', [
    'dateFilter', function(dateFilter) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          ngModel.$formatters.push(function(value) {
            var date, milis;
            date = angular.isString(value) ? (milis = Date.parse(value), !isNaN(milis) ? new Date(milis) : void 0) : value;
            return dateFilter(date, attrs.dateFormat);
          });
          return ngModel.$parsers.push(function(value) {
            return new Date(value);
          });
        }
      };
    }
  ]);

}).call(this);
