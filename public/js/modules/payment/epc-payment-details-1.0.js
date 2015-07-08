epc.payment = epc.payment || {};

epc.payment.details = {
    myDialog: undefined,
    fieldNames : ["from", "fromBSB", "fromAccount", "to", "toBSB", "toAccount", "amount", "status", "entitySource", "createdOn", 
                    "createdBy", "lastUpdatedOn", "lastUpdatedBy", "comments"],
    uiFields : {},
    rows: undefined,
    currentIndex : 0,
    applyWidgets: function() {
        epc.common.utils.initUIFields(this.uiFields, this.fieldNames);
        $('#paymentDetailsNextButton').on("click", (function() {
            epc.common.utils.populateUIFields(this.uiFields, this.fieldNames, this.rows[this.currentIndex++]);
        }).bind(this));
        $('#paymentDetailsCloseButton').on("click", function() {
            epc.evtBus.publish(epc.evtBus.event.VIEW_CLOSE);
        })
    },
    initUI: function() {
        epc.common.utils.loadTemplate('templates/payment-details.html', 'paymentDetails')
            .success(
                this.applyWidgets.bind(this)
            );
        //this.applyWidgets();
    },
    show: function(evt, data) {
        this.rows = data.tableData;
        epc.common.utils.populateUIFields(this.uiFields, this.fieldNames, data.selected);
    }
};

epc.evtBus.subscribe(epc.evtBus.event.APP_START, epc.payment.details.initUI.bind(epc.payment.details));
epc.evtBus.subscribe(epc.evtBus.event.PAYMENTLIST_SELECTED, null, epc.payment.details.show.bind(epc.payment.details));