var ACNApp = angular.module("ACNApp", []);

ACNApp.controller("mainController", function ($scope, mainService) {
  $scope.onSubmit = function (isValid) {
    if (isValid) {
      alert("ACN is valid");
    }
  };

  $scope.onChangeAcn = function (acn) {
    const acnValidation = mainService.isAcnValid(acn);
    $scope.form.acn.$error = {};
    $scope.form.acn.$setValidity(acnValidation.label, acnValidation.status);
  };
}).service("mainService", function () {
  this.isAcnValid = function (acn) {
    const pattern = /^(\d{3} \d{3} \d{3}|\d{9})$/i;
    const isFormatValid = acn.match(pattern) ? true : false;
    if (!isFormatValid) return { status: false, label: "format" };

    acn = acn.replaceAll(" ", "");
    let totalWeight = 0;
    let weight = 8;
    for (let i = 0; i < acn.length - 1; i++) {
      const digit = acn[i];
      totalWeight += digit * weight;
      weight--;
    }

    const remainder = totalWeight % 10;
    let complement = 10 - remainder;
    if (complement == 10) complement = 0;

    const isAcnValid = acn[8] == complement;
    return { status: isAcnValid, label: "acnValid" };
  };
});
