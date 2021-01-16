const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {
	writer
} = require('repl');
const app = express();
const db = require('./baza.js');

app.use(bodyParser.json());
app.use(express.static('public'));

db.sequelize.sync({force:true}).then(() =>{
	console.log('baza baza');
}).catch((err)=>{
	console.log(err);
});


//ZADATAK 1

//DAN
app.post('/v2/dan',function(req,res){
	db.dan.findOrCreate({
		where:{naziv:req.body["naziv"]}
	}).then((dan)=>{
		res.json(dan);
	}).catch(function(err){
		res.json({message:err});
	});
});

app.get('/v2/dan',function(req,res){
db.dan.findAll().then(days =>{
	res.json(days);
}).catch((err)=>{
	res.json({message:err});
});
});

app.get('/v2/dan/:id',function(req,res){
	db.dan.findOne({where:{id:req.params.id}}).then(day =>{
		if(day){
			res.json(day);
		}else{
			res.json({message:"Nije pronađen dan"});
		}
	}).catch((err) =>{
		res.json({message:err});
	});
});

app.put('/v2/dan/:id',function(req,res){
	db.dan.update({naziv:req.body['naziv']},{
		where:{id:req.params.id}
	}).then((dan)=>{
		res.json({message:'Dan uspješno izmijenjen'});
	}).catch(function(err){
		res.json({message:err});
	});
});

app.delete('/v2/dan/:id',function(req,res){
	db.dan.destroy({where:{id:req.params.id}}).then((day)=>{
		if(day){
			res.json({message:'Dan je obrisan'});
		}else{
			res.json({message:'Nije moguće pronaći dan'});
		}
	}).catch();
});



//PREDMET
app.post('/v2/predmet',function(req,res){
	db.predmet.findOrCreate({
		where:{naziv:req.body["naziv"]}
	}).then((pr)=>{
		res.json(pr);
	}).catch(function(err){
		res.json({message:err});
	});
});

app.get('/v2/predmet',function(req,res){
db.predmet.findAll().then(prs =>{
	res.json(prs);
}).catch((err)=>{
	res.json({message:err});
});
});

app.get('/v2/predmet/:id',function(req,res){
	db.predmet.findOne({where:{id:req.params.id}}).then(prs =>{
		if(prs){
			res.json(prs);
		}else{
			res.json({message:"Nije pronađen predmet"});
		}
	}).catch((err) =>{
		res.json({message:err});
	});
});

app.put('/v2/predmet/:id',function(req,res){
	db.predmet.update({naziv:req.body['naziv']},{
		where:{id:req.params.id}
	}).then((pr)=>{
		res.json({message:'Predmet uspješno izmijenjen'});
	}).catch(function(err){
		res.json({message:err});
	});
});

app.delete('/v2/predmet/:id',function(req,res){
	db.predmet.destroy({where:{id:req.params.id}}).then((pr)=>{
		if(pr){
			res.json({message:'Predmet je obrisan'});
		}else{
			res.json({message:'Nije moguće pronaći predmet'});
		}
	}).catch();
});




//TIP
app.post('/v2/tip',function(req,res){
	db.tip.findOrCreate({
		where:{naziv:req.body["naziv"]}
	}).then((tip)=>{
		res.json(tip);
	}).catch(function(err){
		res.json({message:err});
	});
});

app.get('/v2/tip',function(req,res){
db.tip.findAll().then(tips =>{
	res.json(tips);
}).catch((err)=>{
	res.json({message:err});
});
});

app.get('/v2/tip/:id',function(req,res){
	db.tip.findOne({where:{id:req.params.id}}).then(tip =>{
		if(tip){
			res.json(tip);
		}else{
			res.json({message:"Nije pronađen tip"});
		}
	}).catch((err) =>{
		res.json({message:err});
	});
});

app.put('/v2/tip/:id',function(req,res){
	db.tip.update({naziv:req.body['naziv']},{
		where:{id:req.params.id}
	}).then((tip)=>{
		res.json({message:'Tip uspješno izmijenjen'});
	}).catch(function(err){
		res.json({message:err});
	});
});

app.delete('/v2/tip/:id',function(req,res){
	db.tip.destroy({where:{id:req.params.id}}).then((tip)=>{
		if(tip){
			res.json({message:'Tip je obrisan'});
		}else{
			res.json({message:'Nije moguće pronaći tip'});
		}
	}).catch();
});





//GRUPA
app.post('/v2/grupa',function(req,res){
	db.grupa.findOrCreate({
		where:{naziv:req.body["naziv"],
			   PredmetId:req.body['PredmetId']
	}
	}).then((grupa)=>{
		res.json(grupa);
	}).catch(function(err){
		res.json({message:err});
	});
});

app.get('/v2/grupa',function(req,res){
db.grupa.findAll().then(grupe =>{
	res.json(grupe);
}).catch((err)=>{
	res.json({message:err});
});
});

app.get('/v2/grupa/:id',function(req,res){
	db.grupa.findOne({where:{id:req.params.id}}).then(grupa =>{
		if(grupa){
			res.json(grupa);
		}else{
			res.json({message:"Nije pronađena grupa"});
		}
	}).catch((err) =>{
		res.json({message:err});
	});
});

app.put('/v2/grupa/:id',function(req,res){
	db.grupa.update({naziv:req.body['naziv'],PredmetId:req.body['PredmetId']},{
		where:{id:req.params.id}
	}).then((grupa)=>{
		res.json({message:'Grupa uspješno izmijenjena'});
	}).catch(function(err){
		res.json({message:err});
	});
});

app.delete('/v2/grupa/:id',function(req,res){
	db.grupa.destroy({where:{id:req.params.id}}).then((grupa)=>{
		if(grupa){
			res.json({message:'Grupa je obrisana'});
		}else{
			res.json({message:'Nije moguće pronaći grupu'});
		}
	}).catch();
});






//STUDENT
app.post('/v2/student',function(req,res){
	db.student.findOrCreate({
		where:{index:req.body['index']
	},defaults:{ime:req.body['ime']

	}
	}).then((s)=>{
		if(!s[1] && s[0].ime==req.body['ime'] || s[1]) res.json(s);
		else res.json({message:'Ovaj index je već zauzet'});
	}).catch(function(err){
		res.json({message:err});
	});
});

app.get('/v2/student',function(req,res){
db.student.findAll().then(s =>{
	res.json(s);
}).catch((err)=>{
	res.json({message:err});
});
});

app.get('/v2/student/:id',function(req,res){
	db.student.findOne({where:{id:req.params.id,index:req.params.index}}).then(s =>{
		if(s){
			res.json(s);
		}else{
			res.json({message:"Nije pronađen traženi student"});
		}
	}).catch((err) =>{
		res.json({message:err});
	});
});

app.put('/v2/student/:id',function(req,res){
	db.student.update({ime:req.body['ime'],index:req.body['index']},{
		where:{id:req.params.id}
	}).then((s)=>{
		res.json({message:'Student uspješno izmijenjen'});
	}).catch(function(err){
		res.json({message:err});
	});
});

app.delete('/v2/student/:id',function(req,res){
	db.student.destroy({where:{id:req.params.id}}).then((s)=>{
		if(s){
			res.json({message:'Student je obrisan'});
		}else{
			res.json({message:'Nije moguće pronaći studenta'});
		}
	}).catch();
});





//AKTIVNOST
app.post('/v2/aktivnost',function(req,res){
	let akt = {
		naziv:req.body["naziv"],
		pocetak:req.body["pocetak"],
		kraj:req.body["kraj"],
		PredmetId:req.body["PredmetId"],
		GrupaId:req.body["GrupaId"],
		DanId:req.body["DanId"],
		TipId:req.body["TipId"],
	}
	db.aktivnost.create(akt).then((s)=>{
		 res.json(s);
	}).catch(function(err){
		res.json({message:err});
	});
});

app.get('/v2/aktivnost',function(req,res){
db.aktivnost.findAll().then(s =>{
	res.json(s);
}).catch((err)=>{
	res.json({message:err});
});
});

app.get('/v2/aktivnost/:id',function(req,res){
	
	db.aktivnost.findOne({where:{id:req.params.id,index:req.params.index}}).then(s =>{
		if(s){
			res.json(s);
		}else{
			res.json({message:"Nije pronađena tražena aktivnost"});
		}
	}).catch((err) =>{
		res.json({message:err});
	});
});

app.put('/v2/aktivnost/:id',function(req,res){
	let akt = {
		naziv:req.body["naziv"],
		pocetak:req.body["pocetak"],
		kraj:req.body["kraj"],
		PredmetId:req.body["PredmetId"],
		GrupaId:req.body["GrupaId"],
		DanId:req.body["Danid"],
		TipId:req.body["TipId"],
	}
	db.aktivnost.update(akt,{
		where:{id:req.params.id}
	}).then(()=>{
		res.json({message:'Aktivnost uspješno izmijenjena'});
	}).catch(function(err){
		res.json({message:err});
	});
});

app.delete('/v2/aktivnost/:id',function(req,res){
	db.aktivnost.destroy({where:{id:req.params.id}}).then((s)=>{
		if(s){
			res.json({message:'Aktivnost je obrisana'});
		}else{
			res.json({message:'Nije moguće pronaći aktivnost'});
		}
	}).catch();
});




//ZADATAK 2


app.post('/v2/studentGrupa',async function(req,res){
	let studenti = req.body['studenti'];
	let nazivGrupe = req.body['grupe'];
    let odgovor = [];
	let grupa = await db.grupa.findOne({where: {naziv:nazivGrupe}});
	let studentiBaza = await db.student.findAll({include:'grupe'});
	//console.log(studentiBaza);
	for(let i=0; i<studenti.length; i++){
		let student = studentiBaza.find(o => o.index == studenti[i].index);
		if(!student){
			const pom = await db.student.create({ime: studenti[i].ime, index:studenti[i].index});
		}else if(studenti[i].ime != student.ime && studenti[i].index == student.index){
			odgovor.push("Student "+studenti[i].ime + " nije kreiran jer postoji student "+
			student.ime+" sa indeksom "+studenti[i].index);

		}else{
			console.log(student);
			let trenutna = student.grupe.find(gr => gr.PredmetId == grupa.PredmetId);
			if(trenutna){
				await student.removeGrupa(trenutna); 
				await student.addGrupa(grupa);
			}else{
				await student.addGrupa(grupa);
			}
				}
	}
	res.send(odgovor);
});

















// SPIRALA 3 --> 

app.get('/v1/predmeti', function(req, res) {
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

app.get('/v1/aktivnosti', function(req, res) {
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

app.get('/v1/predmet/:naziv/aktivnost',function(req,res){
	let trazeniPredmet = req.params.naziv;
	fs.readFile("public/aktivnosti.txt", "utf-8", function(err, data) {

		if (err) {
			throw err;
		}
		let vrati = "[";
		data = data.split("\n");
		data.pop();
		for (let i = 0; i < data.length; i++) {
			let podaci = data[i];
			let array = podaci.split(",");
			if (vrati != "[") {
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
		vrati += "]";
		if(vrati.charAt(vrati.length-2) === ','){
			vrati = vrati.substring(0, vrati.length-2) + '' + vrati.substring(vrati.length-2 + 1);
		}
		console.log(vrati);
		res.setHeader("Content-Type", "application/json");
		res.end(vrati);
	});
});

app.post('/v1/predmet', function(req, res) {
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


app.post('/v1/aktivnost', function(req, res) {

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

app.delete("/v1/aktivnost/:naziv", function(req, res) {
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

app.delete("/v1/predmet/:naziv", function(req, res) {
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

app.delete("/v1/all", function(req, res) {
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



app.listen(3000);
module.exports=app;