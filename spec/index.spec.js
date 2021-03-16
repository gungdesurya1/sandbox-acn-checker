describe("AcnCheckController", function () {
  beforeEach(module("ACNApp"));

  var $rootScope, $controller, $scope, controller;

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $scope = $rootScope.$new();
    controller = $controller("mainController", {
      $scope: $scope,
    });
  }));

  describe("$scope.onChangeAcn", function () {
    const validACN = [
      "000 000 019",
      "000 250 000",
      "000 500 005",
      "000 750 005",
      "001 000 004",
      "001250004",
      "001 500 009",
      "001 749 999",
      "001999999",
      "002249998",
      "002 499 998",
      "002 749 993",
      "002 999 993",
      "003249009",
    ];

    it("should be a valid ACN", function () {
      inject(function (mainService) {
        for (let index = 0; index < validACN.length; index++) {
          expect(mainService.isAcnValid(validACN[index]).status).toBeTrue();
        }
      });
    });

    const invalidACN = [
      "000 000 018",
      "000250001",
      "000 500 004",
      "000750006",
      "001 000 005",
      "001 250 003",
      "001500010",
      "001 749 998",
    ];

    it("should be an invalid ACN", function () {
      inject(function (mainService) {
        for (let index = 0; index < invalidACN.length; index++) {
          expect(mainService.isAcnValid(invalidACN[index]).status).toBeFalse();
        }
      });
    });

    const wrongFormatACN = [
      "aaa 000 019",
      "bbb bbb 000",
      "ccc ccc ccc",
      "ddddddddd",
    ];

    it("should be a wrong format ACN", function () {
      inject(function (mainService) {
        for (let index = 0; index < wrongFormatACN.length; index++) {
          expect(
            mainService.isAcnValid(wrongFormatACN[index]).status
          ).toBeFalse();
        }
      });
    });
  });
});
