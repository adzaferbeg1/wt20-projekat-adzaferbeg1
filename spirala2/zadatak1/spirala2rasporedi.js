
var okvir=document.getElementById("okvir");
var okvir2=document.getElementById("okvir2");
var okvir3=document.getElementById("okvir3");
var okvir4=document.getElementById("okvir4");

function testirajAkivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan){
    
	if (raspored === null) {
		
		return -1;
	} else {
		if (vrijemeKraj < vrijemePocetak) {
            return -2;
        }else {

			if (!Number.isInteger(vrijemePocetak)) {
				if (vrijemePocetak != Number.parseInt(vrijemePocetak) + 0.5) {
                    return -3;
            }
			}
			if (!Number.isInteger(vrijemeKraj)) {
				if (vrijemeKraj != Number.parseInt(vrijemeKraj) + 0.5){
                    
                    return -4;
                } 

            }
            
        }
        return 0;

    }
}

function kreirajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan ){
if(testirajAkivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) === -1){
    alert("Greška - raspored nije kreiran");
}else if(testirajAkivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) === -2 || testirajAkivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) === -3
|| testirajAkivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) === -4){
    alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
}else{
    dodajAktivnost(raspored, naziv, tip, vrijemePocetak,vrijemeKraj, dan); 
}
}

function pozoviIscrtajRaspored(){
iscrtajRaspored(okvir,['Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak'],8,21);
iscrtajRaspored(okvir2,['Ponedjeljak','Utorak','Srijeda'],16,22);
iscrtajRaspored(okvir3,['Ponedjeljak','Utorak','Srijeda'],15,4);
iscrtajRaspored(okvir4,['Ponedjeljak','Utorak','Srijeda'],8.5,21);



kreirajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
kreirajAktivnost(okvir,"WT","vježbe",12,13.5,"Ponedjeljak");
kreirajAktivnost(okvir,"RMA","predavanje",14,17,"Ponedjeljak");
kreirajAktivnost(okvir,"RMA","vježbe",12.5,14,"Utorak");
kreirajAktivnost(okvir,"DM","tutorijal",14,16,"Utorak");
kreirajAktivnost(okvir,"DM","predavanje",16,19,"Utorak");
kreirajAktivnost(okvir,"OI","predavanje",12,15,"Srijeda");
kreirajAktivnost(okvir2,"RMA","predavanje",17,18,"Utorak");
kreirajAktivnost(okvir2,"RMA","vježbe",17.5,18,"Srijeda");
kreirajAktivnost(okvir2,"DM","vježbe",19,20,"Ponedjeljak");
kreirajAktivnost(okvir2,"ASP","predavanje",16,17.5,"Ponedjeljak");

/* Alert: Rapored nije kreiran
kreirajAktivnost(document.getElementById("okvir5"),"ASP","predavanje",16,17.5,"Ponedjeljak");
*/

/* Alert: U rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin
kreirajAktivnost(okvir2,"ASP","predavanje",16.8,17.5,"Ponedjeljak");
*/

/* Alert: U rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin
kreirajAktivnost(okvir2,"ASP","predavanje",16.8,17.5,"Subota");
*/


}

