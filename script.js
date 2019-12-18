window.onload = function() {
    //zczytanie tylko szerokosci i wysokosci
    poruszanie(window.innerHeight, window.innerWidth);
    //odswiez();
}

function poruszanie(height,width){
    var figury = document.querySelectorAll(".figury");
    var wspolrzednaX, wspolrzednaY, element;

    function startRuchu(e,That){
        wspolrzednaX = e.pageX;
        wspolrzednaY = e.pageY;
        element = That;
    }

    function ruchDotykiem(e){
        if(e.changedTouches.length > 0){
            startRuchu(e.changedTouches[0], this);
        }
    }

    function RuchMyszka(e){
        window.addEventListener('mousemove', ruchMyszkiLubDotykuZapisPozycji, true);
        window.addEventListener('mouseup', koniecRuchu, true);
        startRuchu(e, this);
    }

    function ruchMyszkiLubDotykuZapisPozycji(e){
        var dx=e.pageX-wspolrzednaX;
        var dy=e.pageY-wspolrzednaY;
        wspolrzednaX = e.pageX;
        wspolrzednaY = e.pageY;
        element.style.top = (element.offsetTop + dy) + 'px';
        element.style.left = (element.offsetLeft + dx) + 'px';
        //Wyslij();
    }

    function koniecRuchu(){
        window.removeEventListener('mouseup', koniecRuchu, true);
        window.removeEventListener('mousemove', ruchMyszkiLubDotykuZapisPozycji, true);
    }

    function Dotyk(e){
        if (e.changedTouches.length > 0) {
            ruchMyszkiLubDotykuZapisPozycji(e.changedTouches[0]);
        }
        //anuluje zdarzenie
        e.preventDefault();
        //Przerywa dalsze propagowanie bieżącego zdarzenia.
        e.stopPropagation();
    }
    for (var i = 0; i < figury.length; i++) {
        var figura = figury[i];
        figura.addEventListener('mousedown', RuchMyszka, true);
        figura.addEventListener('touchstart', ruchDotykiem, false);
        figura.addEventListener('touchmove', Dotyk, false);
    }

}