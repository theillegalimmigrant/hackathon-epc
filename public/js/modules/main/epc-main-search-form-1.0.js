epc.main = epc.main || {};

epc.main.searchForm = {
	_name: "searchForm",
	
	handleSearchResults: function(data) {
		epc.evtBus.publish(epc.evtBus.event.DATA_MODEL_RAW_UPDATED, data);
	},
	doSearch: function() {
		epc.ajax("../testdata/paymentList.json").done(this.handleSearchResults);
	},

	applyWidgets: function() {
		$('#paymentDate').datepicker();
		$('#autoRefreshSpinner').spinner({min: 1});
		$('#newPaymentButton').button().click(function(event) {
			epc.evtBus.publish(epc.evtBus.event.NEW_PAYMENT);
		});	
		$('#importButton').button().click(function(event) {
			// TODO
		});	
		$('#todayButton').button().click(function(event) {
			// TODO
		});		
		$('#exportButton').button().click(function(event) {
			// TODO
		});
		
		epc.evtBus.publish(epc.evtBus.event.MAIN_FORM_STARTED);	
		
	},

	initUI: function() {
		epc.common.utils.loadTemplate('templates/main-search-form.html', 'mainSearchForm')
			.done(function() {
				epc.common.utils.loadTemplate('templates/payment-entry-dialog.html', 'paymentEntryDialogContainer'); 
				})
			.done(this.applyWidgets.bind(this));
			

	}
	
};

epc.evtBus.subscribe(epc.evtBus.event.APP_START, null, epc.main.searchForm.initUI.bind(epc.main.searchForm));
epc.evtBus.subscribe(epc.evtBus.event.MAIN_DETAILS_STARTED, null, epc.main.searchForm.doSearch.bind(epc.main.searchForm));