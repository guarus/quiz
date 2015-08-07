var path = require('path');

//Postgres DATABASE_URL
//SQLite   DATABASE_URL
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
var storage  = process.env.DATABASE_STORAGE;

//cargar modelo ORM
var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_name, user, pwd, 
{
	dialect:  protocol,
	protocol: protocol,
	port:     port,
	host:     host,
	storage:  storage, //solo SQLite (.env)
	omitNull: true     //solo Postgres
});

//usar BBDD SQLite 
/*var sequelize = new Sequelize(null, null, null,
                              {dialect: "sqlite", storage: "quiz.sqlite"}
							  );
							  
//importar la definici�n de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));	*/	

//importar la definici�n de la tabla Quiz
var quiz_path = path.join(__dirname,'Quiz');
var Quiz = sequelize.import(quiz_path);
					  
exports.Quiz = Quiz; //exporta la definici�n de la tabla Quiz

//sequelize.sync() crea e inicializa la tabla de preguntas DB
sequelize.sync().then(function() {
	//success (...) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count) {
		if(count===0){ //la tabla se inicializa s�lo si est� vac�a
			Quiz.create({
						pregunta:  'Capital de Italia',
						respuesta: 'Roma'
					});
			Quiz.create({
						pregunta:  'Capital de Portugal',
						respuesta: 'Lisboa'
					});		
					
		}
	 });  
}).then(function() {
	console.log('Base de datos inicializada')
});