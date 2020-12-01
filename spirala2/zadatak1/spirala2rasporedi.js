
var okvir=document.getElementById("okvir");
var okvir2=document.getElementById("okvir2");
var okvir3=document.getElementById("okvir3");
var okvir4=document.getElementById("okvir4");

function pozoviIscrtajRaspored(){
iscrtajRaspored(okvir,['Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak'],8,21);
iscrtajRaspored(okvir2,['Ponedjeljak','Utorak','Srijeda'],4,15);
iscrtajRaspored(okvir3,['Ponedjeljak','Utorak','Srijeda'],15,4);
iscrtajRaspored(okvir4,['Ponedjeljak','Utorak','Srijeda'],8.5,21);
dodajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
dodajAktivnost(okvir,"WT","vježbe",12,13.5,"Ponedjeljak");
dodajAktivnost(okvir,"RMA","predavanje",14,17,"Ponedjeljak");
dodajAktivnost(okvir,"RMA","vježbe",12.5,14,"Utorak");
dodajAktivnost(okvir,"DM","tutorijal",14,16,"Utorak");
dodajAktivnost(okvir,"DM","predavanje",16,19,"Utorak");
dodajAktivnost(okvir,"OI","predavanje",12,15,"Srijeda");



/* --okvir koji nije kreiran

dodajAktivnost(document.getElementById("okvir5"),"WT","vježbe",12.8,13,"Utorak");
*/
/* --unos aktivnosti da pogresnim vremenom pocetka i pogresnim vremenom kraja

dodajAktivnost(document.getElementById("okvir4"),"WT","vježbe",12.8,13,"Utorak");
dodajAktivnost(document.getElementById("okvir4"),"WT","vježbe",12.5,13.7,"Utorak");
*/

}

