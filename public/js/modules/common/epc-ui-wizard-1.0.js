epc.common = epc.common ||  {};

// TODO: Docs
epc.common.uiWizard = {

	wizardRef: undefined,
	progressPageRef: undefined,
	activePromise: undefined,
	currentPage: 0,
	pages: [],
	pageCount: 0,

	pageTransition: {
		startPage: undefined,
		fromPage: undefined,
		toPage: undefined,
		progressPage: undefined,
		progressPromise: undefined,

		_hidePage: function(page) {
			var promise = epc.createPromise();
			page.animate({'opacity': 0}, {complete: function() {			
				promise.resolve();
			}});
			return promise.then((function() {
				page.css('display', 'none');
			}).bind(this));		
		},

		_showPage: function(page) {
			var promise = epc.createPromise();
			
			page.css('display', 'flex').animate({'opacity': 1}, {complete: function() {
				promise.resolve();
			}});
			return promise;
		},

		_hideFromPage: function() {
			return this._hidePage(this.fromPage);
		},

		_hideProgressPage: function() {
			return this._hidePage(this.progressPage);
		},

		_showToPage: function() {
			return this._showPage(this.toPage);
		},

		_showProgressPage: function() {
			return this._showPage(this.progressPage);
		},

		_transitionFromPageToProgressPage: function() {
			return this._hideFromPage().then(this._showProgressPage.bind(this));
		},

		_transitionProgressPageToToPage: function() {
			return this._hideProgressPage().then(this._showToPage.bind(this));
		},

		_completeTransition: function() {
			return epc.waitOnPromise(this.progressPromise).then(this._transitionProgressPageToToPage.bind(this));
		},

		create: function(fromPage, toPage, progressPage, progressPromise) {
			var t = Object.create(this);
			t.fromPage = fromPage;
			t.toPage = toPage;
			t.progressPage = progressPage;
			t.progressPromise = progressPromise;

			return t;
		},

		transition: function() {
			// if there is no promise object provided, move straight to toPage
			if (this.progressPromise === undefined || this.progressPromise === null) {
				console.log("transitioning without progress indication...")
				return this._hideFromPage().then(this._showToPage.bind(this));
			}
			console.log("transitioning with progress indication...")

			// move from current page to progress panel... 
			return this._transitionFromPageToProgressPage().then(this._completeTransition.bind(this)) ;
		},		

		load: function() {
			if (this.progressPromise === undefined || this.progressPromise === null) {
				this._showPage(this.toPage);
			} else {
				this._showProgressPage().then(this._completeTransition.bind(this));
			}
		}
	},

	init: function(wizardId, startingPage, promise) {
		this.wizardRef = epc.lookup('#' + wizardId);
		this.currentPage = startingPage === undefined ? this.currentPage : startingPage;

		// iterate through all the divs under the wizard and initialize them
		this.wizardRef.children().each((function(index, element) {
			epc.lookup(element).attr('pageWizId', 'wizPage'+index).css('display', 'none').css('opacity', '0');
			this.pages.push(epc.lookup(element));
		}).bind(this));

		// add our load progress bar panel
		this.wizardRef.append("<div pageWizId='wizProgressPanel' style='display: none; opacity: 0'>" + 
			"<span><i class='fa fa-spinner fa-pulse'></i> Loading....</span></div>");
		this.pageCount = this.pages.length;
		this.progressPageRef = epc.lookup('[pageWizId*=' + 'wizProgressPanel' + ']');
		this.activePromise = promise;

		this.pageTransition.create(null, this.pages[this.currentPage], this.progressPageRef, promise).load();
	},

	_hasActivePromise: function() {
		return this.activePromise && this.activePromise.state() !== "resolved";
	},

	_transitionPage: function(fromPage, toPage, promise) {
		if (this._hasActivePromise()) {
			throw new Error("Cannot transition when an active promise is present");
		}
		this.activePromise = promise;
		var t = this.pageTransition.create(fromPage, toPage, this.progressPageRef, promise);
		return t.transition();
	},

	_transitionPageNumbers: function(fromPageNumber, toPageNumber, promise) {
		return this._transitionPage(this.pages[fromPageNumber], this.pages[toPageNumber], promise);
	},

	moveToPageNumber: function(pageNumber, promise) {
		return this._transitionPageNumbers(this.currentPage, pageNumber, promise).then((function() {
			this.currentPage = pageNumber;
		}).bind(this));
	},

	moveToNextPage: function(promise) {
		if (this.currentPage < this.pageCount - 1) {
			return this.moveToPageNumber(this.currentPage + 1, promise);
		}
	},

	moveToPreviousPage: function(promise) {
		if (this.currentPage > 0) {
			return this.moveToPageNumber(this.currentPage - 1, promise);
		}
	},

	moveToFirstPage: function(promise) {
		return this.moveToPageNumber(0, promise);
	},

	moveToLastPage: function(promise) {
		return this.moveToPageNumber(this.pageCount - 1, promise);
	}
};