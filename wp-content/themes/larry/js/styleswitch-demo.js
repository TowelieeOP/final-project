jQuery(document).ready(function($){

    $(".switcher-control").on('click', function(){
        jQuery('.switcher').toggleClass('toggled');
    });

    $(".styleswitch").on('click', function(){
        $(".styleswitch").removeClass('active');
        $(this).addClass('active');
        $('.gmap').removeClass('active').filter($(this).attr('data-map')).addClass('active');
        $('.brand-img').attr('src',$(this).attr('data-brand-img'));
    });

    $('.color-panel  a').on('click', function(e){
        $('#larry_style_new-css').prop('disabled',true); 
        e.preventDefault();
        $("#larry_style_old-css").attr('href',$(this).data('style'));
    });

});

