epc.payment = epc.payment || {};

epc.payment.auth = Object.create(epc.payment.list);
epc.payment.auth._tableID = "authPendingListTable";
epc.payment.auth._name = "authPendingList";
epc.payment.auth._containerID = "authPendingTab";
epc.payment.auth._dataEvent=epc.evtBus.event.DATA_MODEL_CREATED_UPDATED;
epc.payment.auth._publishEvent=epc.evtBus.event.AUTHPENDINGTAB_LOADED;


epc.evtBus.subscribe(epc.evtBus.event.MAIN_DETAILS_STARTING, null, epc.payment.auth.initUI.bind(epc.payment.auth));
    
