var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const { SEED } = require('../config/config');





// ======================================================================================================
// ==========    LOGIN USUARIO
// ======================================================================================================

function generateAccessToken(user) {
    return jwt.sign({usuario:user},SEED, { expiresIn: '14400s' });
  }

app.post('/',(req,res)=>{

    var body = req.body;

    Usuario.findOne({usuario:body.usuario},(err,usuarioDB)=>{


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error Buscar Usuarios',
                errors: err
            });
        }
        
        if(usuarioDB){
            if(bcrypt.compareSync(body.password,usuarioDB.password)){


                // ---- Crear Token -----------------
                usuarioDB.password = ':)';
                var token =  generateAccessToken(usuarioDB) ;// expira en 4 horas
        
                return res.status(200).json({
                    ok: true,
                    mensaje: 'USUARIO logueado Correctamente',
                    usuario:usuarioDB,
                    usuario_id: usuarioDB._id,
                    token: token 
                });
                
                }

           
        }

        return res.status(400).json({
            ok: false,
            mensaje: 'Credenciales Incorrectas',
            errors: err
        });
        
        

    });



});


module.exports = app;