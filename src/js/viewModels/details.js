/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define(['accUtils','knockout',  "ojs/ojconverter-number",
"ojs/ojactioncard",
 "ojs/ojlabel","ojs/ojinputnumber", "ojs/ojformlayout"
],
 function(accUtils,ko,NumberConverter) {
    function details(args) {
      var fuelValues = {
        "petrol":99.43,
        "deisel":85.43,
        "oil":50.45
      };
      this.priceVal = ko.observable(76);
      this.rawValue = ko.observable(67);
     var self = this;
     this.rawValueChanged = function(event){
        console.log(event.detail.value);
        self.priceVal(parseFloat(event.detail.value) * parseFloat(self.valuePerLtr))
     }

     this.decimalHalfUpGroupRoundConverter = new NumberConverter.IntlNumberConverter({
      style: "decimal",
      roundingMode: "HALF_UP",
      maximumFractionDigits: 2,
      roundDuringParse: true,
  });
  
        console.log(args.params)
        this.selected = args.params.index;
        this.valuePerLtr = fuelValues[this.selected];
        
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
      this.connected = () => {
        accUtils.announce('About page loaded.');
        document.title = "About";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return details;
  }
);
