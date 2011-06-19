function csrf(xhr, settings) {
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
 } 
 
 function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function msjErrorEnForm(error){
    $('#errorForm').html('<div class="errorForm">'+error+'</div>')
    setTimeout(function(){
        $('.errorForm').fadeOut("slow");
    }, 4000);
}

String.prototype.capitalize = function() { return this.charAt(0).toUpperCase() + this.slice(1); }			    
