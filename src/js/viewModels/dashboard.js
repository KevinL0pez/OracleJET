/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['accUtils', 'knockout',],
 function(accUtils, ko) {

    function DashboardViewModel() {
      var self = this;

      // var data = [
      //   { name: "Águilas Doradas", items: [29] },
      //   { name: "Millonarios", items: [26] },
      //   { name: "Alianza Petrolera", items: [26] },
      //   { name: "Boyacá Chicó", items: [25] },
      //   { name: "Boyacá América", items: [25] },
      //   { name: "Pasto", items: [22] },
      //   { name: "Junior", items: [21] },
      //   { name: "Santa Fe", items: [20] },
      //   { name: "Atlético Nacional", items: [19] },
      //   { name: "Medellín", items: [19] },
      //   { name: "Enivado", items: [18] },
      //   { name: "Tolima", items: [18] },
      // ];

      // self.dataSource = ko.observableArray(data);
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);
