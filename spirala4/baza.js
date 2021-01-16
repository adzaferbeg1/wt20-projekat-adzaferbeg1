const Sequelize = require('sequelize');
const sequelize = new Sequelize("wt2018593", 'root', '', {
   host: 'localhost',
   dialect: 'mysql',
   pool: { max: 5,min: 0,acquire: 30000,idle: 10000},define:{timestamps:false}
});

const db={}
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.aktivnost = require(__dirname+"/models/aktivnost.js")(sequelize, Sequelize.DataTypes);
db.dan = require(__dirname+"/models/dan.js")(sequelize, Sequelize.DataTypes);
db.grupa = require(__dirname+"/models/grupa.js")(sequelize, Sequelize.DataTypes);
db.predmet = require(__dirname+"/models/predmet.js")(sequelize, Sequelize.DataTypes);
db.student = require(__dirname+"/models/student.js")(sequelize, Sequelize.DataTypes);
db.tip = require(__dirname+"/models/tip.js")(sequelize, Sequelize.DataTypes);

//Relacije
db.predmet.hasMany(db.grupa,{foreignKey:{allowNull:false}});
db.grupa.belongsTo(db.predmet);

db.predmet.hasMany(db.aktivnost,{foreignKey:{allowNull:false}});
db.aktivnost.belongsTo(db.predmet);

db.grupa.hasMany(db.aktivnost);
db.aktivnost.belongsTo(db.grupa);

db.dan.hasMany(db.aktivnost,{foreignKey:{allowNull:false}});
db.aktivnost.belongsTo(db.dan);

db.tip.hasMany(db.aktivnost,{foreignKey:{allowNull:false}});
db.aktivnost.belongsTo(db.tip);

db.student.belongsToMany(db.grupa, { as: {singular:'grupa',plural:'grupe'}, through: 'sgVezna', foreignKey: 'studentId' });
db.grupa.belongsToMany(db.student, { as: 'studenti', through: 'sgVezna', foreignKey: 'grupaId' });


module.exports=db;