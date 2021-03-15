var validationApp = angular.module("ACNApp", []);

validationApp.controller("mainController", function ($scope) {
  $scope.onSubmit = function (isValid) {
    if (isValid) {
      alert("ACN is valid");
    }
  };

  $scope.onChangeAcn = function (acn) {
    const pattern = /^(\d{3} \d{3} \d{3}|\d{9})$/i;
    const isFormatValid = acn.match(pattern) ? true : false;
    $scope.form.acn.$setValidity("format", isFormatValid);
    if (!isFormatValid) return false;
    console.log("still");

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

    const isACNValid = acn[8] == complement;
    $scope.form.acn.$setValidity("acnValid", isACNValid);
  };
});
