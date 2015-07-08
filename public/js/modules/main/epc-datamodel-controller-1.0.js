epc.main = epc.main || {};

epc.main.dataModelController = {
	rawData: undefined,
	allPayments: undefined,
	createdPayments: undefined,
	authorisedPayments: undefined,

	updateModel: function(evt, data) {
		this.rawData = data.data;

		// clone array
		this.allPayments = this.rawData.filter(function(row) {
			return true;
		});
		// clone array with created only
		this.createdPayments = this.rawData.filter(function(row) {
			return row.status === "Created";
		});
		// clone array with completed only
		this.authorisedPayments = this.rawData.filter(function(row) {
			return row.status === "Completed";
		});
		// publish data to any interested views
		epc.evtBus.publish(epc.evtBus.event.DATA_MODEL_ALL_UPDATED, {data: this.allPayments});
		epc.evtBus.publish(epc.evtBus.event.DATA_MODEL_CREATED_UPDATED, {data: this.createdPayments});
		epc.evtBus.publish(epc.evtBus.event.DATA_MODEL_AUTHORISED_UPDATED, {data: this.authorisedPayments});
	}

};

epc.evtBus.subscribe(epc.evtBus.event.DATA_MODEL_RAW_UPDATED, null, 
	epc.main.dataModelController.updateModel.bind(epc.main.dataModelController));