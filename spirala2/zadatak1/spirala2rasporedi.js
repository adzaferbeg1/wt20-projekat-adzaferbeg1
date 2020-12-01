
var okvir=document.getElementById("okvir");
var okvir2=document.getElementById("okvir2");
var okvir3=document.getElementById("okvir3");
var okvir4=document.getElementById("okvir4");

function pozoviIscrtajRaspored(){
iscrtajRaspored(okvir,['Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak'],8,21);
iscrtajRaspored(okvir2,['Ponedjeljak','Utorak','Srijeda'],16,22);
iscrtajRaspored(okvir3,['Ponedjeljak','Utorak','Srijeda'],15,4);
iscrtajRaspored(okvir4,['Ponedjeljak','Utorak','Srijeda'],8.5,21);
dodajAktivnost(okvir,"WT","predavanje",9,12,"Ponedjeljak");
dodajAktivnost(okvir,"WT","vježbe",12,13.5,"Ponedjeljak");
dodajAktivnost(okvir,"RMA","predavanje",14,17,"Ponedjeljak");
dodajAktivnost(okvir,"RMA","vježbe",12.5,14,"Utorak");
dodajAktivnost(okvir,"DM","tutorijal",14,16,"Utorak");
dodajAktivnost(okvir,"DM","predavanje",16,19,"Utorak");
dodajAktivnost(okvir,"OI","predavanje",12,15,"Srijeda");
dodajAktivnost(okvir2,"RMA","predavanje",17,18,"Utorak");
dodajAktivnost(okvir2,"RMA","vježbe",17.5,18,"Srijeda");
dodajAktivnost(okvir2,"DM","vježbe",19,20,"Ponedjeljak");
dodajAktivnost(okvir2,"ASP","predavanje",16,17.5,"Ponedjeljak");

}

