var oTable;
var giRedraw = false;
var paginate = true;
var filter = true;
var info = true;

function set_tabla(){
	    paginate = false;
        filter = false;
        info = false;
	}
$(document).ready(function() {
	/* Add a click handler to the rows - this could be used as a callback */
	$("#my_table tbody").click(function(event) {
		$(oTable.fnSettings().aoData).each(function (){
			$(this.nTr).removeClass('row_selected');
		});
		$(event.target.parentNode).addClass('row_selected');
	});
	/* Add a click handler for the delete row */
	$('#delete').click( function() {
		var anSelected = fnGetSelected( oTable );
		oTable.fnDeleteRow( anSelected[0] );
	} );
//	oTable.fnGetPosition( this );
	/* Init the table */
	oTable = $('#my_table').dataTable({
		"bJQueryUI": true,
		"bSort": false,
		"sPaginationType": "full_numbers",
		"bPaginate": paginate,
		"bFilter": filter,
		"bInfo": info
	});
    /* Get the rows which are currently selected */
    function fnGetSelected( oTableLocal )
    {
	    var aReturn = new Array();
	    var aTrs = oTableLocal.fnGetNodes();
	
	    for ( var i=0 ; i<aTrs.length ; i++ )
	    {
		    if ( $(aTrs[i]).hasClass('row_selected') )
		    {
			    aReturn.push( aTrs[i] );
		    }
	    }
	    return aReturn;
    }
})
