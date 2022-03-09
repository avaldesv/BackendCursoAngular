//--------Requerimientos-----------------------
const { request } = require('express');
var express = require('express');
var mongoose = require('mongoose');



//------- Inicializar Variables----------------

var app = express();



//----conexion a la base de datos
mongoose.connection.openUri('mongodb://192.168.11.3:27018/hospitalDB',(err,res)=>{
    if(err) throw err ;
    console.log('Base de Datos  \x1b[32m%s\x1b[0m','online ');
});

//--Rutas-----

app.get('/',(req,res,next)=>{
res.status(200).json({
    ok:true,
    mensaje:'Peticion realizada correctamente'
});

})


//---------------Escuchar Peticiones----------

app.listen(3000,()=>{

    console.log('Express Server corriendo en puerto 3000: \x1b[32m%s\x1b[0m','online ');
});