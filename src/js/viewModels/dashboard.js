/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['accUtils','ojs/ojarraydataprovider','knockout', 
"ojs/ojmodulerouter-adapter",
'ojs/ojknockouttemplateutils',
 'ojs/ojmodule-element', 'ojs/ojknockout'
,"ojs/ojnavigationlist"],
 function(accUtils,ArrayDataProvider,ko,ModuleRouterAdapter) {
    function DashboardViewModel(args) {
      console.log(args);
      var self = this;
      this.router = args.parentRouter;
      
     const data = [
      { name: "Deisel", id: "deisel", icons: "oj-ux-ico-home" },
      {
          name: "Petrol",
          id: "petrol",
          icons: "oj-ux-ico-education",
      },
      { name: "Engine Oil", id: "oil", icons: "oj-ux-ico-book" },
     
  ];
  this.dataProvider = new ArrayDataProvider(data, { keyAttributes: "id" });
  // observable for medium and up screens
  this.selectedItem = ko.observable("deisel");
  this.args = args;
  // Create a child router with one default path
  this.router = this.args.parentRouter.createChildRouter([
    { path: 'details' },
   // { path: 'deisel' },
  //  { path: '', redirect: 'details' },
     
  ]);

  this.tabChanged = function(selectionChanged,selection){
    console.log(this.selectedItem());
    console.log(selectionChanged.detail.value);
    //self.router.go({path:'petrol',params:{}});

  }
  this.selectedItem = ko.pureComputed({
    // The observable derives its value from the active record (this.record),
    // which is updated by the router.currentState observable below.
    read: () => {
      return 'petrol';
      
    },
    // When a list selection changes (by user action), the router is instructed
    // to navigate to the new state identified by the selection.
    write: (selected) => {
     // alert(selected);
        this.router.go({ path: 'details', params: { index: selected } });
    }
});
  // When router state changes, update the viewmodel's record based on the
  // index from parameters
  this.router.currentState.subscribe((args) => {
      const state = args.state;
      if (state) {
          //this.record(this.incidentData[state.params.index]);
      }
  });
  // ModuleRouterAdapter automatically loads the assocaited module for the
  // router state
  this.module = new ModuleRouterAdapter(this.router, {
      viewPath: 'views/',
      viewModelPath: 'viewModels/'
  });
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
        accUtils.announce('Dashboard page loaded.');
        document.title = "Dashboard";
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
    return DashboardViewModel;
  }
);
