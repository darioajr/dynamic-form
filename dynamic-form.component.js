angular.
  module('tasyFormModule', []).
  info({ version: '0.1.0' }).
  component('dynamicForm', {
    templateUrl: 'dynamic-form.component.html',
    bindings: {
      model: '=',
      layout: '='
    },
    controller: function DynamicFormController($rootScope, $scope, $log) {
      
      var $ctrl = this;
      var layout = null;

      $scope.isEdittingForm = false;

      $scope.submitForm = function () {
        $rootScope.$broadcast('onFormSubmit', $ctrl.model);
      };

      $scope.onEditForm = function () {
        $scope.isEdittingForm = true;
        $ctrl.layout = angular.copy($ctrl.layout);
        layout = angular.copy($ctrl.layout);
      };

      $scope.onSaveForm = function () {
        $scope.isEdittingForm = false;
        $ctrl.layout = angular.copy($ctrl.layout);
        $rootScope.$broadcast('onSaveForm', $ctrl.layout);
      };

      $scope.onCancelForm = function () {
        $scope.isEdittingForm = false;
        $ctrl.layout = angular.copy(layout);
      };

      $scope.addLine = function (collection) {
        collection.push({});
      };

      $scope.deleteLine = function (collection, index) {
        collection.splice(index, 1);
      };
    }
  }).
  directive('resizable', function () {
    return {
      restrict: 'A',
      scope: {
        resizableEnabled: '=',
        resizableField: '='
      },
      link: function postLink(scope, elem, attrs) {
        if (!scope.resizableEnabled) {
          return;
        }

        //Desenha caixa de redimensionamento
        var resizer = document.createElement('div');
        resizer.className = 'resizer-top-left';
        elem.append(resizer);
        resizer = document.createElement('div');
        resizer.className = 'resizer-top-right';
        elem.append(resizer);
        resizer = document.createElement('div');
        resizer.className = 'resizer-bottom-left';
        elem.append(resizer);
        resizer = document.createElement('div');
        resizer.className = 'resizer-bottom-right';
        elem.append(resizer);

        //Define todos os movimentos possíveis
        elem.resizable({ handles: " n, e, s, w, ne, se, sw, nw" });  
        
        elem.on('resizestop', function (evt, ui) {
          scope.resizableField.width = ui.size.width;
          scope.resizableField.x = ui.position.left;
          scope.resizableField.y = ui.position.top;
        });
        elem.on('resize',function(evt,ui) {
          //Deixa marcado em azul
          elem.addClass('selected');
        });
        elem.on('mouseover',function() {
          elem.addClass('selected');            
        });
        elem.on('mouseleave',function() {
          elem.removeClass('selected');
        });

        //Ao mover
        elem.on('dragstart', function(evt, ui){
          // Exibe posição x, y na tela
          $('.field-position').show();
        });
        elem.on('drag', function(evt, ui){
          $('.field-position').text(ui.position.left + ' x ' + ui.position.top);
        });
        elem.on('dragstop',function(evt,ui) {
          $('.field-position').hide();
          scope.resizableField.x = ui.position.left;
          scope.resizableField.y = ui.position.top;
        });

        //Define por onde pode mover os objetos
        elem.draggable({containment: '.dynamic-form form'});        
      }
    };
  });