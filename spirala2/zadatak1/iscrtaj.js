function iscrtajRaspored(div, dani, satPocetak, satKraj){

    if(!Number.isInteger(satPocetak) || !Number.isInteger(satKraj)){
    div.innerHTML = "Greška"; 
}   else if(satPocetak >= satKraj){
    div.innerHTML = "Greška";
}   else{
    var tbl = document.createElement('table');
    
    var tbdy = document.createElement('tbody');
    for(var i=0; i<dani.length; i++){
        var tr = document.createElement('tr');
        for(var j=0; j<27; j++){
            var td = document.createElement('td');
            if(j==0){
                td.className = "dan";
                td.innerHTML = dani[i];
            } 
            tr.appendChild(td);
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    div.appendChild(tbl)
}

}

function dodajAktivnost(){

}