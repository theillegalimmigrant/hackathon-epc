epc.payment = epc.payment || {};

epc.payment.entry = {
    fieldNames: ["fromAccountName", "fromBsb",  "fromAccountNumber"],
    errorFieldNames: ["fromAccountNameError", "fromBsbError", "fromAccountNumberError"],
    uiFields: {},
    errorUIFields: {},
    dataModel: {},
    close: function() {
        
    },
    validateBsb: function(error) {
        if (this.dataModel['fromBsb'] === undefined || this.dataModel['fromBsb'] === "") {
            error['fromBsbError'] = "No BSB Provided";
        } else {
            var myRe = /^\d{3}-\d{3}$/;
            if (myRe.exec(this.dataModel['fromBsb']) === null) {
                error['fromBsbError'] = "Invalid BSB format";                
            }
        }
        return error;
    },
    validation: function() {
        epc.common.utils.populateDataModel(this.uiFields, this.fieldNames, this.dataModel);

        var error = {};
        this.validateBsb(error);
        return error;
    },
    displayValidationErrors: function(validationErrors) {
        epc.common.utils.populateUIFields(this.errorUIFields, this.errorFieldNames, validationErrors);
    },
    disableForm: function() {
        $("#paymentEntry input,textarea,button").attr("disabled", "disabled");
    },
    enableForm: function() {
        $("#paymentEntry input,textarea,button").attr("disabled", null);
    },
    submit: function() {
        console.log("Submitting");
        epc.common.utils.resetUIFields(this.errorUIFields, this.errorFieldNames);
        this.disableForm();
        var validationErrors = this.validation();
        if (validationErrors) {
            this.displayValidationErrors(validationErrors);
            this.enableForm();
        } else {
            // submit
        }
    },
    initUI: function() {
        $("#paymentEntry").dialog({modal: true, width: 1024});
        $("#close").button().click(this.close.bind(this));
        $("#submit").button().click(this.submit.bind(this));
        
        epc.common.utils.initUIFields(this.uiFields, this.fieldNames);
        epc.common.utils.initUIFields(this.errorUIFields, this.errorFieldNames);
    }
};

epc.evtBus.subscribe(epc.evtBus.event.NEW_PAYMENT, null, epc.payment.entry.initUI.bind(epc.payment.entry));