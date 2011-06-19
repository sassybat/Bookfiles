$(document).ready(function(){
    $("#formUser").validate({
        rules:{
           
            username:{
                required: true,
                minlength: 4
                
            },
            
            password:{
                required: true,
                minlength: 4
            },
            
            Confirmar:{
                required: true,
                minlength: 4,
                equalTo: "#password"
            }
                     
        },
        messages:{
            
            username:{
                required:"&nbsp;&nbsp;&nbsp;&nbsp;Username is required.",
                
                
            },
            password:{
                required:"&nbsp;&nbsp;&nbsp;&nbsp;Password is required.",
                
                
            },
            Confirmar:{
                required:"&nbsp;&nbsp;&nbsp;&nbsp;Confirmation is required.",
                equalTo:"&nbsp;&nbsp;&nbsp;&nbsp;Enter the same password as above."
            }
            
        },
       
        errorPlacement: function(error, element) {
			error.appendTo( element.parent().next() );
		},
		success: function(label) {
           label.html("&nbsp;").addClass("checked");
        } 
    });
})        
