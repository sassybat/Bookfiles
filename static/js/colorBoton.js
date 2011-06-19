$(document).ready(function() {
    $('.span').hover( function () {
        $('.span').css({background : 'url("../images/btn.png") repeat-x #3399DD',
                        border: '1px solid #3399DD'});
        $('a').css({color:'#FFFFFF', 'text-shadow':'0 -1px 0 #3399DD'});
      },
      function(){
          $('.span').css({'background' : 'url("../images/button.gif") repeat-x #DDDDDD',
                            'border-color': '#DDDDDD #DDDDDD #CCCCCC'});
          $('a').css({'color':'#666666', 'text-shadow':'1px 1px 0 #FFFFFF'});
       });
});
