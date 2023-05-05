define([
  "accUtils",
  "knockout",
  "ojs/ojarraydataprovider",
  "ojs/ojrouter",
], function (accUtils, ko, ArrayDataProvider, Router) {
  function HomeViewModel() {
    var self = this;
    var deptArray = [
      {
        DepartmentId: 310022,
        DepartmentName: "Administration12",
        LocationId: 200,
        ManagerId: 300,
      },
      {
        DepartmentId: 311022,
        DepartmentName: "Marketing13",
        LocationId: 200,
        ManagerId: 300,
      },
      {
        DepartmentId: 312022,
        DepartmentName: "Purchasing14",
        LocationId: 200,
        ManagerId: 300,
      },
      {
        DepartmentId: 313022,
        DepartmentName: "Human Resources15",
        LocationId: 200,
        ManagerId: 300,
      },
    ];
    this.dataprovider = new ArrayDataProvider(deptArray, {
      keyAttributes: "DepartmentId",
      implicitSort: [{ attribute: "DepartmentId", direction: "ascending" }],
    });

    self.miFuncion = function () {
      console.log("Mi primer log");
    };

    self.connected = function () {
      accUtils.announce("Home page loaded.", "assertive");
      document.title = "Home";
    };

    self.disconnected = function () {
      // Implement if needed
    };

    self.transitionCompleted = function () {
      // Implement if needed
    };
  }

  return HomeViewModel;
});
