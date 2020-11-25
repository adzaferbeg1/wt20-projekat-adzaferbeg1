/* prva funkcija */

function iscrtajRaspored(div, dani, satPocetak, satKraj){

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
        for(var j=0; j<27; j++){
            var td = document.createElement('td');
            if(j==0){
                td.className = "dan";
                td.innerHTML = dani[i-1];
            } 
            tr.appendChild(td);
        }
        tbdy.appendChild(tr);
    }
    
    }
    tbl.appendChild(tbdy);
    div.appendChild(tbl)
}

}

/* druga funkcija */


function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan){

}