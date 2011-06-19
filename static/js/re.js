META HTTP-EQUIV='refresh' CONTENT='60; URL=index.php'>-->
            $(document).ready(function()
            {
<!--                var value = $('[name="opcion"]');-->
<!--                $(value).each(function(){-->
<!--                    alert($(this).val());-->
<!--                });-->
                $('#si').attr('checked', true); 
                setContrato('si');
                
                $('#si').click(function(){
                    $('#contratoN').attr('value', 'no');
                    $('#contratoJ').attr('value', 'no');
                });
                
               $('#no').click(function(){-->
                    $('#contratoN').attr('value', 'no');
                   $('#contratoJ').attr('value', 'no');
               });
                
                function setContrato(str){
                    $('#contratoN').attr('value', str);
                    $('#contratoJ').attr('value', str);
                }
            }); 
            
            
            <script type="text/javascript">
            $(document).ready(function(){
                $('#ingresarCliente').click(function(e){
                    e.preventDefault()
                    $.ajax({
                        url: $(this).attr('href'),
                        beforeSend:function(){
                            $('#contentLoad').html('<img src="../static/images/ajax-loader.gif">')
                        },
                        success: function(data){
                            $('#contentLoad').html(data)
                        }
                    });
                })
            
                $('#ingresarEmpleado').click(function(e){
                    e.preventDefault()
                    $.ajax({
                        url: $(this).attr('href'),
                        beforeSend:function(){
                            $('#contentLoad').html('<img src="../static/images/ajax-loader.gif">')
                        },
                        success: function(data){
                            $('#contentLoad').html(data)
                        }
                    });
                })
            })
        </script>   
        
        <!--    window.onscroll=function(){-->
<!--        Jz=window.pageYOffset?window.pageYOffset:(document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)-->
<!--        iHeaderHeight=document.getElementById('leftContainer').parentNode.offsetTop;-->
<!--        Ph=document.getElementById('leftContainer');-->
<!--        Ph.style.position=(Jz>iHeaderHeight?'fixed':'relative');-->
<!--        Ph.style.top = '0px'-->
<!--    }-->

<!--		    $('#ingresar_puesto').click(function(e){-->
<!--	           e.preventDefault()-->
<!--	           var descripcion = $('#descripcion').attr('value').capitalize()-->
<!--	           if (descripcion.length > 0){-->
<!--		            url = '{%url parametrizar_puestos%}' -->
<!--	                $.ajax({-->
<!--	                   type: "POST",-->
<!--                       url: url,-->
<!--                       data: "descripcion=" + descripcion +"",-->
<!--                       beforeSend: function(xhr, settings) {-->
<!--                             function getCookie(name) {-->
<!--                                 var cookieValue = null;-->
<!--                                 if (document.cookie && document.cookie != '') {-->
<!--                                     var cookies = document.cookie.split(';');-->
<!--                                     for (var i = 0; i < cookies.length; i++) {-->
<!--                                         var cookie = jQuery.trim(cookies[i]);-->
<!--                                         // Does this cookie string begin with the name we want?-->
<!--                                     if (cookie.substring(0, name.length + 1) == (name + '=')) {-->
<!--                                         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));-->
<!--                                         break;-->
<!--                                     }-->
<!--                                 }-->
<!--                             }-->
<!--                             return cookieValue;-->
<!--                             }-->
<!--                             if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {-->
<!--                                 // Only send the token to relative URLs i.e. locally.-->
<!--                                 xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));-->
<!--                             }-->
<!--                         } ,-->
<!--                       success: function(data){-->
<!--                            $('#contentLoad').html(data) -->
<!--                        }-->
<!--                     });-->
<!--			    }else-->
<!--    			     $('#errorForm').html('<div class="errorForm">Ingrese una descripcion.</div>')-->
<!--		    });-->

		    
		    $('#my_table tr').click(function(){
		        var tab_active = $('a.active').text()
		        if (tab_active == 'Modificar'){
		            var id = $(this).attr("id");
		            var text = $('#'+id+'_descripcion').text()
		            $('#descripcion_m').val(text) 
		        }
		            
		    });
		    
		    $('#modificar_puesto').click(function(e){
	           e.preventDefault()
	           var descripcion = $('#descripcion_m').attr('value').capitalize()
	           var id = $(".row_selected").attr("id");   
               if (descripcion.length > 0){
	                url = '/home/modificar/puesto/'+id+'/' 
                    $.ajax({
                       type: "POST",
                       url: url,
                       data: "descripcion=" + descripcion +"",
                       beforeSend: function(xhr, settings) {
                             function getCookie(name) {
                                 var cookieValue = null;
                                 if (document.cookie && document.cookie != '') {
                                     var cookies = document.cookie.split(';');
                                     for (var i = 0; i < cookies.length; i++) {
                                         var cookie = jQuery.trim(cookies[i]);
                                         // Does this cookie string begin with the name we want?
                                     if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                         break;
                                     }
                                 }
                             }
                             return cookieValue;
                             }
                             if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                                 // Only send the token to relative URLs i.e. locally.
                                 xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                             }
                         } ,
                       success: function(data){
                            $('#contentLoad').html(data) 
                        }
                     });
		        }else
    			     $('#errorForm').html('<div class="errorForm">Ingrese una descripcion.</div>')
		    });
		    
			$('#eliminar_puesto').click(function(e){
			    e.preventDefault()
			    if ($(".row_selected").length) {
			        var id = $(".row_selected").attr("id");
		          url  = '/home/eliminar/puesto/'+id+'/'
			        $.ajax({
                       url: url,
                       beforeSend: function(xhr, settings) {
                             function getCookie(name) {
                                 var cookieValue = null;
                                 if (document.cookie && document.cookie != '') {
                                     var cookies = document.cookie.split(';');
                                     for (var i = 0; i < cookies.length; i++) {
                                         var cookie = jQuery.trim(cookies[i]);
                                         // Does this cookie string begin with the name we want?
                                     if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                         break;
                                     }
                                 }
                             }
                             return cookieValue;
                             }
                             if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                                 // Only send the token to relative URLs i.e. locally.
                                 xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                             }
                         } ,
                       success: function(data){
                            $('#contentLoad').html(data) 
                        }
                     });
		     }
		     else{
		        $('#errorForm').html('<div class="errorForm">Debe de seleccionar un puesto.</div>')
		     }
	    } );
