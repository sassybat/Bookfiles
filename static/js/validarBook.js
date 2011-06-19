$(document).ready(function(){
    $("#formBook").validate({
        rules:{
           title:{
                required: true,
                minlength: 2                
            },
            
            author:{
                required: true,
                minlength: 5
            },
                             
        },
        messages:{
            
            title:{
                required:"&nbsp;&nbsp;&nbsp;&nbsp;Title is required.",
            },
            author:{
                required:"&nbsp;&nbsp;&nbsp;&nbsp;Author is required.",
            },
            
        },
       
        errorPlacement: function(error, element) {
			error.appendTo( element.parent().next() );
		},
		success: function(label) {
           label.html("&nbsp;").addClass("checked");
        } 
    });
})        
