var predmeti = [];
var aktivnosti = [];
var tip = [];
var dan = [];


function ucitavanje(){
    var dajPredmete = new XMLHttpRequest();
    dajPredmete.onreadystatechange = function() {// Anonimna funkcija
        if (dajPredmete.readyState == 4 && dajPredmete.status == 200)
            predmeti = JSON.parse(dajPredmete.responseText);
        if (dajPredmete.readyState == 4 && dajPredmete.status == 404)
            console.log("Greška");
    }
    dajPredmete.open("GET", "http://localhost:3000/v2/predmet", true);
    dajPredmete.setRequestHeader("Content-Type", "application/json");
    dajPredmete.send();

    var dajAktivnosti = new XMLHttpRequest();
    dajAktivnosti.onreadystatechange = function() {// Anonimna funkcija
        if (dajAktivnosti.readyState == 4 && dajAktivnosti.status == 200)
            aktivnosti = JSON.parse(dajAktivnosti.responseText);
        if (dajAktivnosti.readyState == 4 && dajAktivnosti.status == 404)
            console.log("Greška");
    }
    dajAktivnosti.open("GET", "http://localhost:3000/v2/aktivnost", true);
    dajAktivnosti.setRequestHeader("Content-Type", "application/json");
    dajAktivnosti.send();

    var dajDane = new XMLHttpRequest();
    dajDane.onreadystatechange = function() {// Anonimna funkcija
        if (dajDane.readyState == 4 && dajDane.status == 200){
            dan = JSON.parse(dajDane.responseText);
            dan.forEach(o => {
                var izbor = document.getElementById("dani");
                var opcija = document.createElement("option");
                opcija.textContent = o.naziv;
                opcija.value = o.id;
                izbor.appendChild(opcija);
            });
        }
        if (dajDane.readyState == 4 && dajDane.status == 404)
            console.log("Greška");
    }
    dajDane.open("GET", "http://localhost:3000/v2/dan", true);
    dajDane.setRequestHeader("Content-Type", "application/json");
    dajDane.send();

    var dajTipove = new XMLHttpRequest();
    dajTipove.onreadystatechange = function() {// Anonimna funkcija
        if (dajTipove.readyState == 4 && dajTipove.status == 200){
            
            tip = JSON.parse(dajTipove.responseText);
            tip.forEach(o => {
                var izbor = document.getElementById("tip");
                var opcija = document.createElement("option");
                opcija.textContent = o.naziv;
                opcija.value = o.id;
                izbor.appendChild(opcija);
            });
        }

        if (dajTipove.readyState == 4 && dajTipove.status == 404)
            console.log("Greška");
    }
    dajTipove.open("GET", "http://localhost:3000/v2/tip", true);
    dajTipove.setRequestHeader("Content-Type", "application/json");
    dajTipove.send(); 
}

function slanje(){
        let nazivInput = document.getElementById("nazivPredmeta");
        let imePredmeta = nazivInput.value;
        let grupaInput = document.getElementById("grupaField");
        let imeGrupe = grupaInput.value;
        let tipInput = document.getElementById("tip");
        let imeTipa = tipInput.options[tipInput.selectedIndex].text;
        let idTipa = tipInput.value;
        let pocetakInput = document.getElementById("pocetak");
        let krajInput = document.getElementById("kraj");
        let danInput = document.getElementById("dani");
        let idDana = danInput.value;

        var ajax1 = new XMLHttpRequest();
        ajax1.onreadystatechange = function() {// Anonimna funkcija
            if (ajax1.readyState == 4 && ajax1.status == 200){
                console.log(ajax1.responseText);
                var predmetIzBaze = JSON.parse(ajax1.responseText);
                
                var ajax2 = new XMLHttpRequest();
                ajax2.onreadystatechange = function() {// Anonimna funkcija
                    if (ajax2.readyState == 4 && ajax2.status == 200){
                        var grupaIzBaze = JSON.parse(ajax2.responseText);

                        var ajax3 = new XMLHttpRequest();
                        ajax3.onreadystatechange = function() {// Anonimna funkcija
                            if (ajax3.readyState == 4 && ajax3.status == 200){
                                var poruka = JSON.parse(ajax3.responseText);
                                if(poruka.message != 'Aktivnost uspješno izmijenjena'){
                                    if(predmetIzBaze[1]){

                                        var ajax4 = new XMLHttpRequest();
                                        ajax4.open("DELETE", "http://localhost:3000/v2/predmet/"+predmetIzBaze[0].id, true);
                                        ajax4.setRequestHeader("Content-Type", "application/json");
                                        ajax4.send();

                                        var ajax5 = new XMLHttpRequest();
                                        ajax5.open("DELETE", "http://localhost:3000/v2/grupa/"+grupaIzBaze[0].id, true);
                                        ajax5.setRequestHeader("Content-Type", "application/json");
                                        ajax5.send();
                                    }
                                    if(grupaIzBaze[1]){
                                        var ajax5 = new XMLHttpRequest();
                                        ajax5.open("DELETE", "http://localhost:3000/v2/grupa/"+grupaIzBaze[0].id, true);
                                        ajax5.setRequestHeader("Content-Type", "application/json");
                                        ajax5.send();
                                    }
                                }
                            }
                            if (ajax3.readyState == 4 && ajax3.status == 404)
                                console.log("Greška");
                        }
                        ajax3.open("POST", "http://localhost:3000/v2/aktivnost", true);
                        ajax3.setRequestHeader("Content-Type", "application/json");
                        let imeZaPoslati = imePredmeta+' '+imeTipa;
                        ajax3.send(JSON.stringify({naziv:imeZaPoslati,pocetak:pocetakInput.value,kraj:krajInput.value,
                            PredmetId:predmetIzBaze[0].id,GrupaId:grupaIzBaze[0].id,DanId:idDana,TipId:idTipa}));

                    }
                    if (ajax2.readyState == 4 && ajax2.status == 404)
                        console.log("Greška");
                }
                ajax2.open("POST", "http://localhost:3000/v2/grupa", true);
                ajax2.setRequestHeader("Content-Type", "application/json");
                ajax2.send(JSON.stringify({naziv:imeGrupe,PredmetId:predmetIzBaze[0].id}));
            }
            if (ajax1.readyState == 4 && ajax1.status == 404)
                console.log("Greška");
        }
        ajax1.open("POST", "http://localhost:3000/v2/predmet", true);
        ajax1.setRequestHeader("Content-Type", "application/json");
        ajax1.send(JSON.stringify({naziv:imePredmeta}));

    }
