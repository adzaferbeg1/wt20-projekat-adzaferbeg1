
let assert = chai.assert;
var expect = chai.expect;


describe('Raspored', function() {
 describe('iscrtajRaspored()', function() {

    it('Test crtanja tabele sa 1 dan u sedmici', function() {
        var div = document.createElement("div");
        Raspored.iscrtajRaspored(div,["Ponedjeljak"],8,14);
        var iscrtanaTabela = div.getElementsByTagName("table")[0];
        assert.equal(iscrtanaTabela.rows.length, 2, "Očekujemo dva reda: jedan dan + red vremena");
      });

   it('Test crtanja tabele sa 2 dana u sedmici', function() {
     var div = document.createElement("div");
     Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak"],8,14);
     var iscrtanaTabela = div.getElementsByTagName("table")[0];
     assert.equal(iscrtanaTabela.rows.length, 3, "Očekujemo tri reda: dva dana + red vremena");
   });

   it('Test crtanja tabele sa 5 dana u sedmici', function() {
    var div = document.createElement("div");
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda", "Četvrtak","Petak"],8,14);
    var iscrtanaTabela = div.getElementsByTagName("table")[0];
    assert.equal(iscrtanaTabela.rows.length, 6, "Očekujemo šest redova: pet dana + red vremena");
  });

  it('Test crtanja tabele sa 3 dana u sedmici', function() {
    var div = document.createElement("div");
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],12,19);
    var iscrtanaTabela = div.getElementsByTagName("table")[0];
    assert.equal(iscrtanaTabela.rows.length, 4, "Očekujemo četiri reda: tri dana + red vremena");
  });

  it('Test crtanja rasporeda od 8 h do 14 h', function() {
    var div = document.createElement("div");
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],8,14);
    var iscrtanaTabela = div.getElementsByTagName("table")[0];
    assert.equal(iscrtanaTabela.rows[0].cells.length, 6, "Očekujemo 13 ćelija");
  });

  it('Test crtanja rasporeda od 12 h do 20 h', function() {
    var div = document.createElement("div");
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],12,20);
    var iscrtanaTabela = div.getElementsByTagName("table")[0];
    assert.equal(iscrtanaTabela.rows[0].cells.length, 8, "Očekujemo 17 ćelija");
  });

  it('Test crtanja rasporeda od 15 h do 19 h', function() {
    var div = document.createElement("div");
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],15,19);
    var iscrtanaTabela = div.getElementsByTagName("table")[0];
    assert.equal(iscrtanaTabela.rows[0].cells.length, 4, "Očekujemo 9 ćelija");
  });

  it('Test pogrešan početak rasporeda (12.5 h)', function() {
    var div = document.createElement("div");
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],12.5,15);
    var err = div.innerHTML;
    assert.equal(err, "Greška", "Očekujemo grešku");
  });

  it('Test pogrešan kraj rasporeda (16.5 h)', function() {
    var div = document.createElement("div");
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],12,16.5);
    var err = div.innerHTML;
    assert.equal(err, "Greška", "Očekujemo grešku");
  });

  it('Test pogrešan početak i kraj', function() {
    var div = document.createElement("div");
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],12.7,16.5);
    var err = div.innerHTML;
    assert.equal(err, "Greška", "Očekujemo grešku");
  });

  it('Test kraj < početak (1)', function() {
    var div = document.createElement("div");
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],12,8);
    var err = div.innerHTML;
    assert.equal(err, "Greška", "Očekujemo grešku");
  });

  it('Test kraj < početak (2)', function() {
    var div = document.createElement("div");
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],15,7);
    var err = div.innerHTML;
    assert.equal(err, "Greška", "Očekujemo grešku");
  });

  it('Test kraj < početak (3)', function() {
    var div = document.createElement("div");
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],16,4);
    var err = div.innerHTML;
    assert.equal(err, "Greška", "Očekujemo grešku");
  });
 
 
 }); 


 describe('dodajAktivnost()', function() {

     
    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

     
      

    it('Dodavanje WT predavanja u prvu tabelu', function() {
      var div2 = document.createElement("div");
      Raspored.iscrtajRaspored(div2, ["Ponedjeljak","Utorak","Srijeda","Četvrtak", "Petak"],8,21);
      Raspored.dodajAktivnost(div2, "WT", "predavanje", 9,12,"Ponedjeljak");
      var iscrtanaTabela = div2.getElementsByTagName("table")[0];
      var celija = iscrtanaTabela.rows[1].cells[3].textContent;
      assert.equal(celija, "WTpredavanje", "Očekujemo popunjenu ćeliju");
    });

    it('Dodavanje WT vježbe u prvu tabelu', function() {
        var div2 = document.createElement("div");
        Raspored.iscrtajRaspored(div2, ["Ponedjeljak","Utorak","Srijeda","Četvrtak", "Petak"],8,21);
        Raspored.dodajAktivnost(div2, "WT", "predavanje", 9,12,"Ponedjeljak");
        sleep(2);
        Raspored.dodajAktivnost(div2, "WT", "vježbe", 12,13.5,"Ponedjeljak");
        var iscrtanaTabela = div2.getElementsByTagName("table")[0];
        var celija = iscrtanaTabela.rows[1].cells[4].textContent;
        assert.equal(celija, "WTvježbe", "Očekujemo popunjenu ćeliju");
      });

      it('Dodavanje RMA predavanje u prvu tabelu', function() {
        var div2 = document.createElement("div");
        Raspored.iscrtajRaspored(div2, ["Ponedjeljak","Utorak","Srijeda","Četvrtak", "Petak"],8,21);
        Raspored.dodajAktivnost(div2, "WT", "predavanje", 9,12,"Ponedjeljak");
        sleep(2);
        Raspored.dodajAktivnost(div2, "WT", "vježbe", 12,13.5,"Ponedjeljak");
        sleep(2);
        Raspored.dodajAktivnost(div2, "RMA", "predavanje", 14,17,"Ponedjeljak");
        var iscrtanaTabela = div2.getElementsByTagName("table")[0];
        var celija = iscrtanaTabela.rows[1].cells[6].textContent;
        assert.equal(celija, "RMApredavanje", "Očekujemo popunjenu ćeliju");
      });

      it('Dodavanje RMA vježbe/utorak u prvu tabelu', function() {
        var div2 = document.createElement("div");
        Raspored.iscrtajRaspored(div2, ["Ponedjeljak","Utorak","Srijeda","Četvrtak", "Petak"],8,21);
        sleep(2);
        Raspored.dodajAktivnost(div2, "RMA", "vježbe", 12.5,14,"Utorak");
        var iscrtanaTabela = div2.getElementsByTagName("table")[0];
        var celija = iscrtanaTabela.rows[2].cells[10].textContent;
        assert.equal(celija, "RMAvježbe", "Očekujemo popunjenu ćeliju");
      });

      it('Dodavanje DM tutorijal/utorak u prvu tabelu', function() {
        var div2 = document.createElement("div");
        Raspored.iscrtajRaspored(div2, ["Ponedjeljak","Utorak","Srijeda","Četvrtak", "Petak"],8,21);
        Raspored.dodajAktivnost(div2, "RMA", "vježbe", 12.5,14,"Utorak");
        sleep(2);
        Raspored.dodajAktivnost(div2, "DM", "tutorijal", 14,16,"Utorak");
        var iscrtanaTabela = div2.getElementsByTagName("table")[0];
        var celija = iscrtanaTabela.rows[2].cells[11].textContent;
        assert.equal(celija, "DMtutorijal", "Očekujemo popunjenu ćeliju");
      });
    
      it('Dodavanje DM predavanje/utorak u prvu tabelu', function() {
        var div2 = document.createElement("div");
        Raspored.iscrtajRaspored(div2, ["Ponedjeljak","Utorak","Srijeda","Četvrtak", "Petak"],8,21);
        Raspored.dodajAktivnost(div2, "RMA", "vježbe", 12.5,14,"Utorak");
        sleep(2);
        Raspored.dodajAktivnost(div2, "DM", "tutorijal", 14,16,"Utorak");
        sleep(2);
        Raspored.dodajAktivnost(div2, "DM", "predavanje", 16,19,"Utorak");
        var iscrtanaTabela = div2.getElementsByTagName("table")[0];
        var celija = iscrtanaTabela.rows[2].cells[12].textContent;
        assert.equal(celija, "DMpredavanje", "Očekujemo popunjenu ćeliju");
      });

      it('Dodavanje OI predavanje/srijeda u prvu tabelu', function() {
        var div2 = document.createElement("div");
        Raspored.iscrtajRaspored(div2, ["Ponedjeljak","Utorak","Srijeda","Četvrtak", "Petak"],8,21);
        Raspored.dodajAktivnost(div2, "OI", "predavanje", 12,19,"Srijeda");
        var iscrtanaTabela = div2.getElementsByTagName("table")[0];
        var celija = iscrtanaTabela.rows[3].cells[9].textContent;
        assert.equal(celija, "OIpredavanje", "Očekujemo popunjenu ćeliju");
      });
 
      it('Alert aktivnosti u raspored koji nije kreiran (1)', function() {
        var div2 = document.getElementById("okvir");
        var window = Raspored.testirajAkivnost(div2,"A","B",12,13);
        assert.equal(window, -1, "Očekujemo da raspored nije kreiran");
       
      });

      it('Alert aktivnosti u raspored koji nije kreiran (2)', function() {
        var div2 = document.getElementById("okvir1");
        var window = Raspored.testirajAkivnost(div2,"A","B",12,13);
        assert.equal(window, -1, "Očekujemo da raspored nije kreiran");
       
      });

      it('Alert aktivnosti u raspored koji nije kreiran (3)', function() {
        var div2 = document.getElementById("okvir2");
        var window = Raspored.testirajAkivnost(div2,"A","B",12,13);
        assert.equal(window, -1, "Očekujemo da raspored nije kreiran");
       
      });

      it('Alert aktivnosti kraj < početak (1)', function() {
        var div2 = document.createElement("div");
        var window = Raspored.testirajAkivnost(div2,"A","B",12,8);
        assert.equal(window, -2, "Očekujemo grešku");
       
      });

      it('Alert aktivnosti kraj < početak (2)', function() {
        var div2 = document.createElement("div");
        var window = Raspored.testirajAkivnost(div2,"A","B",6,4);
        assert.equal(window, -2, "Očekujemo grešku");
       
      });

      it('Alert aktivnosti kraj < početak (3)', function() {
        var div2 = document.createElement("div");
        var window = Raspored.testirajAkivnost(div2,"A","B",0,-1);
        assert.equal(window, -2, "Očekujemo grešku");
       
      });

      it('Alert aktivnosti početak nije cijeli broj niti x.5 (1)', function() {
        var div2 = document.createElement("div");
        var window = Raspored.testirajAkivnost(div2,"A","B",12.6,15);
        assert.equal(window, -3, "Očekujemo grešku");
       
      });

      it('Alert aktivnosti početak nije cijeli broj niti x.5 (2)', function() {
        var div2 = document.createElement("div");
        var window = Raspored.testirajAkivnost(div2,"A","B",3.3,11);
        assert.equal(window, -3, "Očekujemo grešku");
       
      });

      it('Alert aktivnosti kraj nije cijeli broj niti x.5 (1)', function() {
        var div2 = document.createElement("div");
        var window = Raspored.testirajAkivnost(div2,"A","B",12,15.8);
        assert.equal(window, -4, "Očekujemo grešku");
       
      });

      it('Alert aktivnosti kraj nije cijeli broj niti x.5 (2)', function() {
        var div2 = document.createElement("div");
        var window = Raspored.testirajAkivnost(div2,"A","B",6,11.8);
        assert.equal(window, -4, "Očekujemo grešku");
       
      });
  
  
  }); 
});
