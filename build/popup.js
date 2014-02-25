(function() {
  angular.module('formstamp').directive('fsPopup', [
    '$rootScope', "$compile", 'fsPopupManager', function($rootScope, $compile, popupManager) {
      return {
        restrict: 'E',
        compile: function(tElement, tAttrs) {
          var content;
          content = "" + (tElement.html().trim());
          tElement.remove();
          return popupManager.add(tAttrs.name, content);
        }
      };
    }
  ]).factory('fsPopupManager', [
    '$document', '$compile', '$rootScope', function($document, $compile, $rootScope) {
      var attachTo, currentPopup, documentClickBind, popupManager;
      attachTo = void 0;
      currentPopup = void 0;
      documentClickBind = function(event) {
        if (event.target !== attachTo) {
          return $rootScope.$apply(function() {
            return $rootScope.popup.hide();
          });
        }
      };
      popupManager = {
        popups: {},
        add: function(name, popup) {
          return this.popups[name] = popup;
        },
        show: function(name, target) {
          var attachToElement, attachToScope, popupContent, popupElement;
          this.hide();
          popupContent = this.popups[name];
          if (popupContent == null) {
            return;
          }
          attachTo = target;
          attachToElement = angular.element(attachTo);
          attachToScope = attachToElement.scope();
          popupElement = angular.element("<div>" + popupContent + "</div>");
          currentPopup = $compile(popupElement)(attachToScope);
          currentPopup.bind('click', function(event) {
            event.preventDefault();
            return event.stopPropagation();
          });
          attachToElement.after(currentPopup);
          $document.bind('click', documentClickBind);
        },
        hide: function() {
          $document.unbind('click', documentClickBind);
          if (currentPopup != null) {
            currentPopup.remove();
          }
          currentPopup = attachTo = void 0;
        }
      };
      return $rootScope.popup = popupManager;
    }
  ]);

}).call(this);
