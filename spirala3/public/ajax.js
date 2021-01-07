var predmeti = [];
var aktivnosti = [];


function ucitavanje(){
    var ajax1 = new XMLHttpRequest();
    ajax1.onreadystatechange = function() {// Anonimna funkcija
        if (ajax1.readyState == 4 && ajax1.status == 200)
            predmeti = JSON.parse(ajax1.responseText);
        if (ajax1.readyState == 4 && ajax1.status == 404)
            console.log("Greška");
    }
    ajax1.open("GET", "http://localhost:3000/predmeti", true);
    ajax1.setRequestHeader("Content-Type", "application/json");
    ajax1.send();

    var ajax2 = new XMLHttpRequest();
    ajax2.onreadystatechange = function() {// Anonimna funkcija
        if (ajax2.readyState == 4 && ajax2.status == 200)
            aktivnosti = JSON.parse(ajax2.responseText);
        if (ajax2.readyState == 4 && ajax2.status == 404)
            console.log("Greška");
    }
    ajax2.open("GET", "http://localhost:3000/aktivnosti", true);
    ajax2.setRequestHeader("Content-Type", "application/json");
    ajax2.send();
    
}

function slanje(){
        let nazivInput = document.getElementById("nazivPredmeta");
        let tipInput = document.getElementById("tip");
        let pocetakInput = document.getElementById("pocetak");
        let krajInput = document.getElementById("kraj");
        let danInput = document.getElementById("dani");



        if(pocetakInput.value !="" && krajInput.value !="" && nazivInput.value != "" ){
        let duplikat = false;
        predmeti.forEach(predmet => {
            if (predmet.naziv == nazivInput.value) {
                duplikat = true;
                return;
            }
        });
        
        let jsonPredmet = {};
        let jsonAktivnost = {}

        jsonPredmet.naziv = jsonAktivnost.naziv = nazivInput.value;
        jsonAktivnost.tip = tipInput.value;
        jsonAktivnost.pocetak = pocetakInput.value;
        jsonAktivnost.kraj = krajInput.value;
        jsonAktivnost.dan = danInput.value;
    
        
        document.getElementsByTagName("form")[0].reset();
        if (duplikat) {
            let ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    ucitaj();
                    console.log(JSON.parse(ajax.responseText));
                }
            }
            izvrsiPoziv(ajax,'POST','aktivnost',jsonAktivnost);
        } else {
            let ajax = new XMLHttpRequest();
            
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    let ajax1 = new XMLHttpRequest();
                    
                    ajax1.onreadystatechange = function () {
                        if (ajax1.readyState == 4 && ajax1.status == 200) {
                            if (JSON.parse(ajax1.responseText).message == "Aktivnost nije validna!") {
                               
                                let ajax2 = new XMLHttpRequest();
                                ajax2.onreadystatechange = function () {
                                    if (ajax2.readyState == 4 && ajax2.status == 200) {
                                    console.log("Vaša aktivnost nije validna, predmet se briše!");
                                    }
                                }
                                izvrsiPoziv(ajax2,'DELETE','predmet/'+jsonAktivnost.naziv,"");
    
                            } else {
                                console.log("Uspješno dodana aktivnost!");
                            }
                        } else if (ajax1.readyState == 4) {
                            let ajax2 = new XMLHttpRequest();
                            ajax2.onreadystatechange = function () {
                                if (ajax2.readyState == 4 && ajax2.status == 200) {
                                console.log("Predmet je uspješno obrisan!");
                                }
                            }
                            izvrsiPoziv(ajax2,'DELETE','predmet/'+jsonAktivnost.naziv, '');
                            
                        }
                    }
                    izvrsiPoziv(ajax1,'POST','aktivnost',jsonAktivnost);
                }
            }
            izvrsiPoziv(ajax,'POST','predmet',jsonPredmet);
        }
      }else{
          alert("Polja ne smiju biti prazna!");
      }
    }

function izvrsiPoziv(ajax, operacija, url, jsonObjekat){
    ajax.open(''+operacija.toUpperCase()+'', "http://localhost:3000/"+url, true);
    ajax.setRequestHeader("Content-Type", "application/json");
    if(operacija == 'DELETE') ajax.send();
    else ajax.send(JSON.stringify(jsonObjekat));
}