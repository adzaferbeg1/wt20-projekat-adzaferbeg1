
let assert = chai.assert;
var div = document.getElementById("ispis");


describe('Raspored', function() {
 describe('iscrtajRaspored()', function() {
   it('Test crtanja tabele sa 2 dana u sedmici', function() {
     Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak"],8,14);
     var iscrtanaTabela = div.getElementsByTagName("table")[0];
     assert.equal(iscrtanaTabela.rows.length, 3, "Očekujemo tri reda: dva dana + red vremena");
   });

   it('Test crtanja tabele sa 5 dana u sedmici', function() {
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda", "Četvrtak","Petak"],8,14);
    var iscrtanaTabela = div.getElementsByTagName("table")[1];
    assert.equal(iscrtanaTabela.rows.length, 6, "Očekujemo šest redova: pet dana + red vremena");
  });

  it('Test crtanja tabele sa 3 dana u sedmici', function() {
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],12,19);
    var iscrtanaTabela = div.getElementsByTagName("table")[2];
    assert.equal(iscrtanaTabela.rows.length, 4, "Očekujemo četiri reda: tri dana + red vremena");
  });

  it('Test crtanja rasporeda od 8 h do 14 h', function() {
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],8,14);
    var iscrtanaTabela = div.getElementsByTagName("table")[3];
    assert.equal(iscrtanaTabela.rows[0].cells.length, 6, "Očekujemo 13 ćelija");
  });

  it('Test crtanja rasporeda od 12 h do 20 h', function() {
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],12,20);
    var iscrtanaTabela = div.getElementsByTagName("table")[4];
    assert.equal(iscrtanaTabela.rows[0].cells.length, 8, "Očekujemo 17 ćelija");
  });

  it('Test crtanja rasporeda od 15 h do 19 h', function() {
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],15,19);
    var iscrtanaTabela = div.getElementsByTagName("table")[5];
    assert.equal(iscrtanaTabela.rows[0].cells.length, 4, "Očekujemo 9 ćelija");
  });

  it('Test pogrešan početak rasporeda (12.5 h)', function() {
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],12.5,15);
    var err = div.innerHTML;
    assert.equal(err, "Greška", "Očekujemo grešku");
  });

  it('Test pogrešan kraj rasporeda (16.5 h)', function() {
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],12,16.5);
    var err = div.innerHTML;
    assert.equal(err, "Greška", "Očekujemo grešku");
  });

  it('Test pogrešan početak i kraj', function() {
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],12.7,16.5);
    var err = div.innerHTML;
    assert.equal(err, "Greška", "Očekujemo grešku");
  });

  it('Test kraj < početak 1', function() {
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],12,8);
    var err = div.innerHTML;
    assert.equal(err, "Greška", "Očekujemo grešku");
  });

  it('Test kraj < početak 2', function() {
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],15,7);
    var err = div.innerHTML;
    assert.equal(err, "Greška", "Očekujemo grešku");
  });

  it('Test kraj < početak 3', function() {
    Raspored.iscrtajRaspored(div,["Ponedjeljak", "Utorak","Srijeda"],16,4);
    var err = div.innerHTML;
    assert.equal(err, "Greška", "Očekujemo grešku");
  });
 
 
 });
});
