define(['accUtils', 'knockout', 'ojs/ojarraydataprovider', 'ojs/ojrouter'],
 function(accUtils, ko, ArrayDataProvider, Router) {

    function HomeViewModel() {
      var self = this;
      

      
      self.miFuncion = function() {
        console.log("Mi primer log");
      }

      self.connected = function() {
        accUtils.announce('Home page loaded.', 'assertive');
        document.title = "Home";
      };

      self.disconnected = function() {
        // Implement if needed
      };

      self.transitionCompleted = function() {
        // Implement if needed
      };

    }


    return HomeViewModel;
  }
);


