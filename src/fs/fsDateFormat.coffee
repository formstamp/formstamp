angular
.module('formstamp')
.directive('fsDateFormat', ['$filter', 'fsConfig', ($filter, fsConfig)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      format = attrs.fsDateFormat || fsConfig.dateFormat

      ngModel.$formatters.push (value)->
        moment(value).format(format)

      ngModel.$parsers.unshift (value)->
        return null unless value
        return null if value == ''
        if moment(value).isValid()
          new Date(moment(value, format).valueOf())
        else
          null
  ])
