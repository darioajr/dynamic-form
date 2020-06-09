var app = angular.module('app', ['tasyFormModule']);

app.controller('AppController', function ($rootScope, $scope, $timeout) {

  $scope.formSubmitData = null;
  $scope.saveFormData = null;

  //Deve vir de uma API
  $scope.model = {
    layout: {
      reportname: 'Report 1',
      entityname: 'Philips Hospital',
      balance: 500,
      medications: [
        {medication: "AAS", balance: 300},
        {medication: "Aspirine", balance: 100}
      ]
    }
  };


  // Deve vir de uma api
  $scope.layout = {
    name: "Tela 1",
    layout: [
      {key: "reportname", type: "label", label: "Report Name", x: 10, y: 10, width: 300},
      {key: "entityname", type: "label", label: "Entity Name", x: 350, y: 10, width: 500},
      {key: "balance", type: "textbox", label: "Balance", mask: "currency", x: 10, y: 80},
      {key: "medications", type: "grid", columns: [
        {key: "medication", label: "Medication", order: 1, width: 400},
        {key: "balance", label: "Balance", order: 2, width: 100}
      ], x:10, y: 160}
    ]
  };

  $rootScope.$on('onFormSubmit', function (event, data) {
    $scope.formSubmitData = data;
  });

  $rootScope.$on('onSaveForm', function (event, data) {
    $scope.saveFormData = data;
  });

});