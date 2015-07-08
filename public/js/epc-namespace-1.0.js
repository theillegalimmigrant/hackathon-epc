var epc = {
	aggregatePromises: function() {
		return $.when.apply($,arguments);
	},

	createPromise: function() {
		return $.Deferred();
	},

	waitOnPromise: function(promise) {
		return $.when(promise);
	},

	lookup: function(selector) {
		return $(selector);
	},

	ajax: function(url, args) {
		return $.ajax(url, args);
	},

    evtBus : {
        subscribe : function(label, data, evtHandler) {
            $(epc).on(label, null, data, evtHandler);
        },

        publish : function(label, data) {
            $(epc).trigger(label, data);
        },
        event : {
        	APP_START: "appStart",
        	PAYMENTTAB_LOADED: "paymentTabLoaded",
        	AUTHPENDINGTAB_LOADED: "authPendingTabLoaded",
        	AUTHPAYMENTSTAB_LOADED: "authPaymentsTabLoaded",
        	PAYMENTLIST_SELECTED: "paymentListSelected",
        	NEW_PAYMENT: "newPayment",
        	MAIN_DETAILS_STARTED: "mainDetailsStarted",
        	MAIN_DETAILS_STARTING: "mainDetailsStarting",
        	MAIN_FORM_STARTED: "mainFormStarted",
        	DATA_MODEL_RAW_UPDATED: "dataModelRawUpdated",
        	DATA_MODEL_ALL_UPDATED: "dataModelAllUpdated",
        	DATA_MODEL_CREATED_UPDATED: "dataModelCreatedUpdated",
        	DATA_MODEL_AUTHORISED_UPDATED: "dataModelAuthorisedUpdated",
        	VIEW_CLOSE: "viewClose",
        	FSPROGRESS_START: "fsProgressStart",
        	FSPROGRESS_STOP: "fsProgressStop"
        },
    }

};