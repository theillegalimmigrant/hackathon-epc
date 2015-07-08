epc.payment = epc.payment || {};

epc.payment.comp = Object.create(epc.payment.list);
epc.payment.comp._tableID = "authPaymentListTable";
epc.payment.comp._name = "authPaymentList";
epc.payment.comp._containerID = "authPaymentsTab";
epc.payment.comp._dataEvent=epc.evtBus.event.DATA_MODEL_AUTHORISED_UPDATED;
epc.payment.comp._publishEvent=epc.evtBus.event.AUTHPAYMENTSTAB_LOADED;

epc.evtBus.subscribe(epc.evtBus.event.MAIN_DETAILS_STARTING, null, epc.payment.comp.initUI.bind(epc.payment.comp));
    
