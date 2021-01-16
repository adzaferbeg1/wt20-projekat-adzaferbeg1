

function grupe(){
    var ajax1 = new XMLHttpRequest();
    let div = document.getElementById("grupe");
    ajax1.onreadystatechange = function() {// Anonimna funkcija
        if (ajax1.readyState == 4 && ajax1.status == 200)
            div.innerHTML = kreiraj(JSON.parse(ajax1.responseText));
        if (ajax1.readyState == 4 && ajax1.status == 404)
            console.log("Greška");
    }
    ajax1.open("GET", "http://localhost:3000/v2/grupa", true);
    ajax1.setRequestHeader("Content-Type", "application/json");
    ajax1.send();
}

function kreiraj(grupice){
        let selekt = '<select id=\"selektId\">';
        for(let i=0; i<grupice.length; i++){
            selekt += '<option value='+grupice[i]+'>'+grupice[i].naziv+'</option>'
        }
        selekt+='</select>';
        return selekt;
    
}



function posalji(){

    
    let div1 = document.getElementById("prostor");
    let div2 = document.getElementById("selektId");

    var ajax1 = new XMLHttpRequest();
    ajax1.onreadystatechange = function() {// Anonimna funkcija
        if (ajax1.readyState == 4 && ajax1.status == 200)
            div1.value = JSON.parse(ajax1.responseText).join('\n');
        if (ajax1.readyState == 4 && ajax1.status == 404)
            console.log("Greška");
    }
    ajax1.open("POST", "http://localhost:3000/v2/studentGrupa", true);
    ajax1.setRequestHeader("Content-Type", "application/json");
    ajax1.send(JSON.stringify(objekat(div1.value, div2.value)));
}


function objekat(studenti, grupa ){
let objekat = {} 
let array = []

for(o of studenti.split('\n')){
if(o.trim()!=""){
    let elementi = o.split(',');
    array.push({ime:elementi[0],index:elementi[1]});
}
}
objekat.studenti = array;
objekat.grupe = grupa;
return objekat;
}
