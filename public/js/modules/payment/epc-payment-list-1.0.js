epc.payment = epc.payment || {};

epc.payment.list = {
    _tableRef: undefined,
    _name: "paymentList",
    _tableID: undefined,
    _containerID: undefined,
    _promise: undefined,
    _dataEvent: undefined,
    _publishEvent: undefined,
    
    updateTable: function(evt, data) {
        epc.common.utils.table.repopulate(this._tableRef, data.data);       
        epc.common.utils.table.addRowSelectionHandler(this._tableRef, this.handleRowSelected.bind(this));
    },

    handleRowSelected: function(event) {
        var rowObj = epc.common.utils.table.getSelectedRow(this._tableRef, event.currentTarget); 
        var rows = epc.common.utils.table.getAllRowData(this._tableRef);
        
        epc.evtBus.publish(epc.evtBus.event.PAYMENTLIST_SELECTED, {selected: rowObj, tableData: rows});
    },

    applyWidgets: function() {
        this._tableRef = epc.lookup("#" + this._tableID);

        //epc.payment.details.initUI();
        var paymentListTable = this._tableRef.dataTable({
            "columns": [
                    {"data": "from"},
                    {"data": "fromBSB"},
                    {"data": "fromAccount"},
                    {"data": "to"},
                    {"data": "toBSB"},
                    {"data": "toAccount"},
                    {"data": "amount"},
                    {"data": "status"},
                    {"data": "entitySource"},
                    {"data": "createdOn"},
                    {"data": "createdBy"},
                    {"data": "lastUpdatedOn"},
                    {"data": "lastUpdatedBy"},
                    {"data": "comments"}
                ] 
        });
        
        epc.evtBus.subscribe(this._dataEvent, null, this.updateTable.bind(this));
        epc.evtBus.publish(this._publishEvent);
    },
    
    initUI: function() {
        epc.common.utils.loadTemplate('templates/main-paymentListTab.html', this._containerID, {id: this._tableID})
            .success(
                this.applyWidgets.bind(this)
            );
    }
};

epc.payment.list._containerID="paymentListTab";
epc.payment.list._tableID="paymentListTable";
epc.payment.list._dataEvent=epc.evtBus.event.DATA_MODEL_ALL_UPDATED;
epc.payment.list._publishEvent=epc.evtBus.event.PAYMENTTAB_LOADED;

epc.evtBus.subscribe(epc.evtBus.event.MAIN_DETAILS_STARTING, null, epc.payment.list.initUI.bind(epc.payment.list));
    
