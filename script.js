window.onload = function() {
    //zczytanie tylko szerokosci i wysokosci
    Poruszanie(window.innerHeight, window.innerWidth);
    ustawCss();
    odswiez();

}

function Poruszanie(height,width){
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

    function ruchMyszka(e){
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
        wyslijNaSerwer();
    }

    function koniecRuchu(){
        window.removeEventListener('mouseup', koniecRuchu, true);
        window.removeEventListener('mousemove', ruchMyszkiLubDotykuZapisPozycji, true);
    }

    function Dotyk(e){
        if (e.changedTouches.length > 0) {
            ruchMyszkiLubDotykuZapisPozycji(e.changedTouches[0]);
        }
		//zeby nie odswiezalo jak sie figury w dol da
        //anuluje zdarzenie
        e.preventDefault();
        //Przerywa dalsze propagowanie bieżącego zdarzenia.
        e.stopPropagation();
    }
    for (var i = 0; i < figury.length; i++) {
        var figura = figury[i];
        figura.addEventListener('mousedown', ruchMyszka, true);
        figura.addEventListener('touchstart', ruchDotykiem, false);
        figura.addEventListener('touchmove', Dotyk, false);
    }
}

function ustawCss(){
    var request = new XMLHttpRequest();
    //otrzymanie odpowiedzi od serwera
    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            console.log("Ustawiony CSS:" + response);
            document.getElementById("pagestyle").setAttribute("href", response);
        }
    }
    request.open("POST", "praca.php", true);
    request.send(JSON.stringify({ 
        polecenie: 1
    }));
}

function odswiez(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            var response = JSON.parse(this.responseText);

            document.getElementById("kwadrat").style.top = response.kwadratx;
            document.getElementById("kwadrat").style.left = response.kwadraty;

            document.getElementById("prostokat").style.top = response.prostokatx;
            document.getElementById("prostokat").style.left = response.prostokaty;

            document.getElementById("kolo").style.top = response.kolox;
            document.getElementById("kolo").style.left = response.koloy;
            
            document.getElementById("trojkat").style.top = response.trojkatx;
            document.getElementById("trojkat").style.left = response.trojkaty;
  
        }
    }
    request.open("POST", "praca.php", true);
    request.send(JSON.stringify({
        polecenie: 2
    }));
}

function wyslijNaSerwer() {
    var request = new XMLHttpRequest();
    request.open("POST", "praca.php", true);
    request.send(JSON.stringify({
        polecenie: 3,

        "kwadratx": document.getElementById("kwadrat").style.top,
        "kwadraty": document.getElementById("kwadrat").style.left,

        "prostokatx": document.getElementById("prostokat").style.top,
        "prostokaty": document.getElementById("prostokat").style.left,

        "kolox": document.getElementById("kolo").style.top,
        "koloy": document.getElementById("kolo").style.left,

        "trojkatx": document.getElementById("trojkat").style.top,
        "trojkaty": document.getElementById("trojkat").style.left,

    }));
}

setInterval(odswiez, 600);