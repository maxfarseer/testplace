$(function() {
    var $loader = $('.loader-black');
    var percent = 0;
    var $percent = $('.percent');
    var $loaderTxt = $('.loader__txt');
    var loaderTimer = setInterval(function(){
        $loader.width($loader.width()+1);
        if ($loader.width() >= 285) {
            clearInterval(loaderTimer);
        };
    },100);
    var percentTimer = setInterval(function() {
        $($percent[0]).html(percent);
        $($percent[1]).html(percent);
        percent+=1;
        if (percent > 100) {
            $($loaderTxt[0]).html('Загрузка завершена');
            $($loaderTxt[1]).html('Загрузка завершена');
            clearInterval(percentTimer);
        };
    },285);
});