epc.common = epc.common || {};

epc.common.uiFSProgress = {
	_glassPaneId : "epc-ui-fsprogress-glass-pane",
	_inProgress: false,

	start: function() {
		if (!this._inProgress) {
			epc.lookup('body').append("<div id='" + this._glassPaneId + "' class='epc-glass'></div>");
			epc.lookup('#' + this._glassPaneId).spin();
			this._inProgress = true;			
		}
	},

	stop: function() {
		if (this._inProgress) {
			epc.lookup('#' + this._glassPaneId).spin(false);
			epc.lookup('#' + this._glassPaneId).remove();
			this._inProgress = false;			
		}
	}
};

epc.evtBus.subscribe(epc.evtBus.event.FSPROGRESS_START, null, epc.common.uiFSProgress.start.bind(epc.common.uiFSProgress));
epc.evtBus.subscribe(epc.evtBus.event.FSPROGRESS_STOP, null, epc.common.uiFSProgress.stop.bind(epc.common.uiFSProgress));