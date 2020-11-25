
var okvir=document.getElementById("okvir");
var okvir2=document.getElementById("okvir2");
var okvir3=document.getElementById("okvir3");
var okvir4=document.getElementById("okvir4");

function pozoviIscrtajRaspored(){
iscrtajRaspored(okvir,['Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak'],8,21);
iscrtajRaspored(okvir2,['Ponedjeljak','Utorak','Srijeda'],4,15);
iscrtajRaspored(okvir3,['Ponedjeljak','Utorak','Srijeda'],15,4);
iscrtajRaspored(okvir4,['Ponedjeljak','Utorak','Srijeda'],8.5,21);
dodajAktivnost(okvir4,"WT","vježbe",12.8,13,"Utorak");
}

