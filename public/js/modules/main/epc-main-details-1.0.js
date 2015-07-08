epc.main = epc.main || {};

epc.main.detailForm = {
	_name: "detailForm",

    applyWidgets: function() {
		$('#mainDetailTab').tabs();
		
		var paymentListPromise = epc.createPromise();
		var authPendingPromise = epc.createPromise();
		var authPaymentsPromise = epc.createPromise();
		
		
		epc.evtBus.subscribe(epc.evtBus.event.PAYMENTTAB_LOADED, null, function() {
			paymentListPromise.resolve();
		});
		
		epc.evtBus.subscribe(epc.evtBus.event.AUTHPAYMENTSTAB_LOADED, null, function() {
			authPaymentsPromise.resolve();
		});
		
		epc.evtBus.subscribe(epc.evtBus.event.AUTHPENDINGTAB_LOADED,null,function() {
			authPendingPromise.resolve();
		})

		epc.aggregatePromises(paymentListPromise, authPaymentsPromise, authPendingPromise).then(function() {
			epc.evtBus.publish(epc.evtBus.event.MAIN_DETAILS_STARTED);
		})
		
		epc.evtBus.publish(epc.evtBus.event.MAIN_DETAILS_STARTING);
    },
    
	initUI: function() {
	    this.applyWidgets();
	    
	}
	
};

epc.evtBus.subscribe(epc.evtBus.event.APP_START, null, epc.main.detailForm.initUI.bind(epc.main.detailForm));