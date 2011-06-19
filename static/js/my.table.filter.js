function fnFilterColumn ( i )
{
	$('#my_table').dataTable().fnFilter( 
		$("#col"+(i+1)+"_filter").val(),
		i, 
		$("#col"+(i+1)+"_regex")[0].checked, 
		$("#col"+(i+1)+"_smart")[0].checked
	);
}

$(document).ready(function(){
    $('#filtrar_tabla').hide()
    $('#button').toggle(
        function(){
            $(this).attr('src', '/static/Toggle-Minus.png')
            $('#filtrar_tabla').show()
        },
        function(){
            $(this).attr('src', '/static/Toggle-Plus.png')
            $('#filtrar_tabla').hide()
        }		        
    );

    $("#col5_filter").keyup( function() { fnFilterColumn( 4 ); } );
	
	$("#col6_filter").keyup( function() { fnFilterColumn( 5 ); } );
	
	$("#col7_filter").keyup( function() { fnFilterColumn( 6 ); } );
	
	$("#col8_filter").keyup( function() { fnFilterColumn( 7 ); } );
})
