define(['accUtils', 'knockout', 'ojs/ojarraydataprovider', 'ojs/ojrouter'],
 function(accUtils, ko, ArrayDataProvider, Router) {

    function FormulariosViewModel() {
      var self = this;
      var browsers = [
        { value: 'IE', label: 'Internet Explorer' },
        { value: 'FF', label: 'Firefox' },
        { value: 'CH', label: 'Chrome' },
        { value: 'OP', label: 'Opera' },
        { value: 'SA', label: 'Safari' }
      ];
      this.browsersDP = new ArrayDataProvider(browsers, { keyAttributes: 'value' });

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


    return FormulariosViewModel;
  }
);


