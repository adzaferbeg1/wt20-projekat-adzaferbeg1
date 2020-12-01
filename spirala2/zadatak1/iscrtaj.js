/* prva funkcija */

var pocetakRasporeda;
var krajRasporeda;

function iscrtajRaspored(div, dani, satPocetak, satKraj){
    pocetakRasporeda = satPocetak;
    krajRasporeda = satKraj;

    if(!Number.isInteger(satPocetak) || !Number.isInteger(satKraj)){
    div.innerHTML = "Greška"; 
}   else if(satPocetak >= satKraj){
    div.innerHTML = "Greška";
}   else{
    var tbl = document.createElement('table');
    
    var tbdy = document.createElement('tbody'); 
    for(var i=0; i<=dani.length; i++){
      if(i==0){
          var sati = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
          var satiSkriveni = [1,3,5,7,9,11,13,14,16,18,20,22];
          var pocetniSat = satPocetak;
          var tr = document.createElement('tr');

          for(var k=0; k<sati.indexOf(satKraj)-sati.indexOf(satPocetak); k++){
              
                var th = document.createElement('th');
                th.colSpan="2";
                if(satiSkriveni.includes(pocetniSat)){
                    th.innerHTML="";
                }else th.innerHTML= pocetniSat + ":00";
              
                tr.appendChild(th);
                pocetniSat++;    
        }
          tbdy.appendChild(tr);
      }else{
            var tr = document.createElement('tr');
        for(var j=0; j<(satKraj-satPocetak+0.5)*2; j++){
            var td = document.createElement('td');
            if(j%2!=0) td.className = "paran";
            if(j==0){
                td.className = "dan";
                td.innerHTML = dani[i-1]; 
            } 
            tr.appendChild(td);
            tr.id=dani[i-1];
        }
        tbdy.appendChild(tr);
    }
    }
    tbl.appendChild(tbdy);
    div.appendChild(tbl)
}
}

/* druga funkcija */
    var termini = new Array();

function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan){
    
    if(raspored==null){
        alert("Greška - raspored nije kreiran.");
        return false;
    }else{ 
    if(vrijemeKraj<vrijemePocetak){
      alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
      //return false;
    }else{
        
        if(!Number.isInteger(vrijemePocetak)){
            if(vrijemePocetak != Number.parseInt(vrijemePocetak)+0.5) alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            //return false;
        }
        if(!Number.isInteger(vrijemeKraj)){
            if(vrijemeKraj != Number.parseInt(vrijemeKraj)+0.5) alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            //return false;
        }
        if(termini.includes(vrijemePocetak) || termini.includes(vrijemeKraj)){
            alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
           // return false;
        }else{ 
            var mapa = new Map();
            mapa.set("Ponedjeljak", 1);
            mapa.set("Utorak", 2);
            mapa.set("Srijeda", 3);
            mapa.set("Četvrtak", 4);
            mapa.set("Petak", 5);

            var red = raspored.getElementsByTagName("tr") [mapa.get(dan)];
           
           //trazenje celije za ubaciti 
            var trazeni = 0;
            var trazenaCelija = 0;
            var ukupanBrojCelijePrije = red.cells.length;
            for(var k=0; k<ukupanBrojCelijePrije; k++){
                if(red.getElementsByTagName("td")[k].colSpan == undefined) {trazeni += 1; trazenaCelija++;}
                else {trazeni += red.getElementsByTagName("td")[k].colSpan; trazenaCelija++; }
                if(trazeni == (vrijemePocetak-pocetakRasporeda)*2 + 2 ) break;
            }
            console.log(trazeni);
            

            var celija = red.getElementsByTagName("td")[trazenaCelija];
            celija.className = "predmet";
            celija.innerHTML = naziv + "<br>" + tip;
            celija.colSpan = (vrijemeKraj-vrijemePocetak)*2;
            
            //brisanje viska celija
            for(let p = 1; p<(vrijemeKraj-vrijemePocetak)*2; p++){
                red.deleteCell(trazenaCelija+1);
            }
            
           
          
       
        }
        
    
}
}
}

