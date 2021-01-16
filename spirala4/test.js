let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./zadatak1');
let should = chai.should();
let expect = chai.expect;
const fs = require('fs');
chai.use(chaiHttp);


let testovi = fs.readFileSync('testniPodaci.txt','utf8');
let test = testovi.split("\n");

test.forEach((podatak) => {
    let jsonObjekat = {};
    let vrijednosti = podatak.replace(/\\/gi,"").replace(/\\r/gi,"").split(",");
    jsonObjekat.operacija = vrijednosti[0];
    jsonObjekat.ruta = vrijednosti[1];
    let ulaz ="";
    let izlaz ="";

    if(vrijednosti[0] === 'POST'){
        for(let i=2; i<vrijednosti.length-1; i++){
            ulaz += vrijednosti[i];
            if(i!=vrijednosti.length-2) ulaz += ",";
        }
        izlaz = vrijednosti[vrijednosti.length-1];
    }else{
        ulaz=vrijednosti[2];
        for(let i=3; i<vrijednosti.length; i++){
            izlaz += vrijednosti[i];
            if(i!=vrijednosti.length-1) izlaz += ",";
        }
    }
    jsonObjekat.ulaz = JSON.parse(ulaz);
    jsonObjekat.izlaz = JSON.parse(izlaz);
    
//testovi

    if(jsonObjekat.operacija === "GET"){
        it(jsonObjekat.operacija+jsonObjekat.ruta, function(done){
            chai
            .request(server)
            .get(jsonObjekat.ruta)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("array");
              res.body.should.be.eql(jsonObjekat.izlaz);
              done();
            });
        });
    }else if(jsonObjekat.operacija === "POST"){
        let predmet;
        if(jsonObjekat.ruta.includes('predmet')){
             predmet = {
                naziv: jsonObjekat.ulaz.naziv
            }
        }else if(jsonObjekat.ruta.includes("aktivnost")){
             predmet = {
                naziv: jsonObjekat.ulaz.naziv,
                tip: jsonObjekat.ulaz.tip,
                pocetak: jsonObjekat.ulaz.pocetak,
                kraj: jsonObjekat.ulaz.kraj,
                dan: jsonObjekat.ulaz.dan
            }
        }
        it(jsonObjekat.operacija+jsonObjekat.ruta,function(done){  
          chai.request(server)
              .post(jsonObjekat.ruta)
              .send(predmet)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql(jsonObjekat.izlaz.message);
                    done();
              });
        });
        
    }else if(jsonObjekat.operacija === "DELETE"){
        it(jsonObjekat.operacija+jsonObjekat.ruta,function(done){
            
            chai.request(server)
                    .delete(jsonObjekat.ruta)
                    .end((err, res) => {
                          res.should.have.status(200);
                          res.body.should.be.a('object');
                          res.body.should.have.property('message').eql(jsonObjekat.izlaz.message);
                      done();
                    });
        });
    }
});