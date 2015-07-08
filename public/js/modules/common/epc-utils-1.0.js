epc.common = epc.common || {};

epc.common.utils = {
    loadTemplate: function(url, id, content) {
		return $.ajax({
			url: url,
			success: function(data) {
				var template = Handlebars.compile(data);
				$('#' + id).html(template(content));
			}
		});
    },
    
    initUIFields: function(uiFields, fieldNames) {
        for(var i=0; i<fieldNames.length; i++) {
            uiFields[ fieldNames[i] ] = $('#' + fieldNames[i]); 
        }
    },
    
    populateUIFields: function(uiFields, fieldNames, data) {
        for(var i=0; i<fieldNames.length; i++) {
            uiFields[fieldNames[i]].text( data[fieldNames[i]]);
        }
    },
    populateDataModel: function(uiFields, fieldNames, data) {
        for(var i=0; i<fieldNames.length; i++) {
            data[fieldNames[i]] = uiFields[fieldNames[i]].val();
        }
    },
    resetUIFields: function(uiFields, fieldNames) {
        for (var i=0; i<fieldNames.length; i++) {
            uiFields[fieldNames[i]].text("");
        }
    },

    table: {
        repopulate: function(table, data) {
            table.DataTable().clear();
            table.DataTable().rows.add(data);
            table.DataTable().draw();
        },

        getAllRowData: function(table) {
            return table.DataTable().rows().data();
        },

        getSelectedRow: function(table, row) {
            return table.DataTable().row(row).data();
        },
        addRowSelectionHandler: function(table, handler) {
            $('tbody tr', table).on('click', handler);
        }
    }
};