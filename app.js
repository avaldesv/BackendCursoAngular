//--------Requerimientos-----------------------
const { request } = require('express');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser =require('body-parser');
const jwt = require('jsonwebtoken');

//--Importar Rutas-----
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');

var loginRoutes = require('./routes/login');
//------- Inicializar Variables----------------

var app = express();

//--   Body Parser ----------------
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//----conexion a la base de datos
mongoose.connection.openUri('mongodb://192.168.11.3:27018/hospitalDB',(err,res)=>{
    if(err) throw err ;
    console.log('Base de Datos  \x1b[32m%s\x1b[0m','online ');
});



//- Rutas-----
app.use('/',appRoutes);
app.use('/Usuario',usuarioRoutes);
app.use('/login',loginRoutes);


//---------------Escuchar Peticiones----------

app.listen(3000,()=>{

    console.log('Express Server corriendo en puerto 3000: \x1b[32m%s\x1b[0m','online ');
});