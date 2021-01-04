const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {
	writer
} = require('repl');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/predmeti', function(req, res) {
	fs.readFile("public/predmeti.txt", "utf-8", function(err, data) {

		if (err) {
			throw err;
		}
		let vrati = "[[";
		data = data.split("\n");
		data.pop();
		for (let i = 0; i < data.length; i++) {
			let podaci = data[i];
			if (vrati != "[[") {
				vrati += ",";
			}

			vrati += JSON.stringify({
				naziv: podaci
			});


		}
		vrati += "]]";
		console.log(vrati);
		res.setHeader("Content-Type", "application/json");
		res.end(vrati);
	});


});

app.get('/aktivnosti', function(req, res) {
	fs.readFile("public/aktivnosti.txt", "utf-8", function(err, data) {

		if (err) {
			throw err;
		}
		let vrati = "[[";
		data = data.split("\n");
		data.pop();
		for (let i = 0; i < data.length; i++) {
			let podaci = data[i];
			let array = podaci.split(",");
			if (vrati != "[[") {
				vrati += ",";
			}

			vrati += JSON.stringify({
				naziv: array[0],
				tip: array[1],
				pocetak: array[2],
				kraj: array[3],
				dan: array[4]
			});


		}
		vrati += "]]";
		console.log(vrati);
		res.setHeader("Content-Type", "application/json");
		res.end(vrati);
	});


});

app.get('/predmet/:naziv/aktivnost',function(req,res){
	let trazeniPredmet = req.params.naziv;
	fs.readFile("public/aktivnosti.txt", "utf-8", function(err, data) {

		if (err) {
			throw err;
		}
		let vrati = "[[";
		data = data.split("\n");
		data.pop();
		for (let i = 0; i < data.length; i++) {
			let podaci = data[i];
			let array = podaci.split(",");
			if (vrati != "[[") {
				vrati += ",";
			}
			if(trazeniPredmet === array[0]){
				
			vrati += JSON.stringify({
				naziv: array[0],
				tip: array[1],
				pocetak: array[2],
				kraj: array[3],
				dan: array[4]
			});
			}
		}
		vrati += "]]";
		if(vrati.charAt(vrati.length-3) === ','){
			vrati = vrati.substring(0, vrati.length-3) + '' + vrati.substring(vrati.length-3 + 1);
		}
		console.log(vrati);
		res.setHeader("Content-Type", "application/json");
		res.end(vrati);
	});
});

app.post('/predmet', function(req, res) {
	let zahtjev = req.body;
	fs.readFile("public/predmeti.txt", "utf-8", function(err, data) {
		if (data.includes(zahtjev['naziv'])) {
			res.json({
				message: "Naziv predmeta postoji!"
			});
		} else {
			let noviRed = zahtjev["naziv"] + "\n";
			fs.appendFile("public/predmeti.txt", noviRed, function(err) {
				if (err) {
					throw err;
				} else
					res.json({
						message: "Uspješno dodan predmet!"
					});
			});
		}
	});
});


app.post('/aktivnost', function(req, res) {

	let zahtjev = req.body;

	fs.readFile("public/aktivnosti.txt", "utf-8", function(err, data) {
        if (err) throw err;
        
			if (zahtjev["pocetak"] < 8 || zahtjev["kraj"] > 20) {
				res.json({
					message: "Aktivnost nije validna!"
				});
			} else if (zahtjev["pocetak"] > zahtjev["kraj"]) {
				res.json({
					message: "Aktivnost nije validna!"
				});
			} else {
				if(!Number.isInteger(Number(zahtjev["pocetak"])) || !Number.isInteger(Number(zahtjev["kraj"]))){
					if(!Number.isInteger(2*Number(zahtjev["pocetak"])) || !Number.isInteger(2*Number(zahtjev['kraj']))) 
					res.json({message: "Aktivnost nije validna!"});
                       
                    }else{
						podaci = data.split("\n");
						let pogresnoVrijeme = false;
						for(let i =0; i<podaci.length; i++){
							let array = podaci[i].split(",");
							if(array[4] === zahtjev.dan){
								if(array[2] <= zahtjev.pocetak && array[3] > zahtjev.pocetak || array[2]<zahtjev.kraj&&array[3]>=zahtjev.kraj
									|| zahtjev.pocetak<=array[2]&&zahtjev.kraj>=array[3]){
									pogresnoVrijeme = true;
									break;
								}
							}
						}
                      if(pogresnoVrijeme){
						res.json({
                            message: "Aktivnost nije validna!"
                        });
					  }else{
						let noviRed = zahtjev["naziv"] + "," + zahtjev["tip"] + "," + zahtjev["pocetak"] + "," + zahtjev["kraj"] + "," + zahtjev["dan"] + "\n";
				        fs.appendFile("public/aktivnosti.txt", noviRed, function(err) {
					if (err) {
					    throw err;
					} else
						res.json({
							message: "Uspješno dodana aktivnost!"
						});
				});
					  }
                    }
                
			}
        
	});
});

app.delete("/aktivnost/:naziv", function(req, res) {
	let naziv = req.params.naziv;
	let validanParametar = false;
	fs.readFile("public/aktivnosti.txt", "utf-8", function(err, data) {
		if (err) throw err;

		data = data.split("\n");
		for (let i = 0; i < data.length; i++) {
			let array = data[i].split(",");
			if (array.includes(naziv)) validanParametar = true;
		}
		if (!validanParametar) {
			res.json({
				message: "Greška - aktivnost nije obrisana!"
			});
		} else {
			for (let i = 0; i < data.length; i++) {
				let array = data[i].split(",");
				if (array[0] === naziv) data.splice(i, 1);
			}
			data = data.join("\n");
			fs.writeFile("public/aktivnosti.txt", data, function(err) {
				if (err) throw err;
				res.json({
					message: "Uspješno obrisana aktivnost!"
				});
			});
		}
	});

});

app.delete("/predmet/:naziv", function(req, res) {
	let naziv = req.params.naziv;
	fs.readFile("public/predmeti.txt", "utf-8", function(err, data) {
		if (err) throw err;

		data = data.split("\n");
		let validanParametar = true;
		if (!data.includes(naziv)) validanParametar = false;
		if (!validanParametar) {
			res.json({
				message: "Greška - predmet nije obrisan!"
			});
		} else {
			data = data.filter(predmet => predmet != naziv).join("\n");
			fs.writeFile("public/predmeti.txt", data, function(err) {
				if (err) throw err;
				res.json({
					message: "Uspješno obrisan predmet!"
				});
			});
		}
	});

});

app.delete("/all", function(req, res) {
	fs.readFile("public/predmeti.txt", "utf-8", function(err, data) {
		if (data.length === undefined) {
            res.json({
                message: "Greška - sadržaj datoteka nije moguće obrisati!"
            });
        } else {
            fs.truncate('public/predmeti.txt', 0, function() {});
        }
	});
	fs.readFile("public/aktivnosti.txt", "utf-8", function(err, data2) {
		if (data2.length === undefined) {
            res.json({
                message: "Greška - sadržaj datoteka nije moguće obrisati!"
            });
        } else {
            fs.truncate('public/aktivnosti.txt', 0, function() { res.json({
                message: "Uspješno obrisan sadržaj datoteka!"
            });});
        }
	});
	
});

function sumbit(){

}

app.listen(3000);
module.exports=app;