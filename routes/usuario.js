var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var Usuario = require('../models/usuario');

//const jwt = require('jsonwebtoken');
//const { SEED } = require('../config/config');
const  mdAutenticacion  = require('../middleware/autenticacion');


// ======================================================================================================
// ==========    LISTAR USUARIOS
// ======================================================================================================


app.get('/', (req, res, next) => {

    Usuario.find({ }, 'nombre email role', (err, usuarios) => {

        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error Cargando Usuarios',
                errors: err
            });
        }
        else {
            res.status(200).json({
                ok: true,
                usuarios: usuarios,
                mensaje: 'Peticion de Usuarios realizada correctamente'
            });

        }
    });
});


// ======================================================================================================
// ==========    CREAR USUARIO
// ======================================================================================================


app.post('/', mdAutenticacion.verificarToken ,(req, res, next) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role,
        usuario: body.usuario
    });
    usuario.save((err, userReturn) => {

        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error al Guardar Usuario',
                errors: err
            });
        }
        else {
            res.status(201).json({
                ok: true,
                usuarios: userReturn,
                mensaje: 'Usuario Creado correctamente'
            });

        }

    });



});

// ======================================================================================================
// ==========    VERIFICAR TOKEN Variante 1 
// ======================================================================================================


//--- Variante 1 de Validar token -- se aplica a todas las delaraciones que se encuentren  declaradas despues de esta funcion
//--- el token se pasa en la url ejemplo PUT localhost:3000/Usuario?token = asdfjlskdjfuwejrb,sbfpso8dfsdnfjksdhfkh

// app.use('/',(req,res,next)=>{
// var token = req.query.token;
// jwt.verify(token,SEED,(err,decode)=>{
//     if(err){
//         return res.status(401).json({
//             ok: false,
//             mensaje: 'Token Incorrecto',
//             errors: err
//         });
//     }
//     next();
// });

// });

// ======================================================================================================
// ==========    ACTUALIZAR USUARIO
// ======================================================================================================


app.put('/:id', mdAutenticacion.verificarToken , (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'ERROR al buscar usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id  ' + id,
                errors: { mensaje: 'No existe un usuario con ese id  ' + id },
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        // usuario.password= bcrypt.hashSync(body.password,10);
        // usuario.img=body.img;
        usuario.role = body.role;
     //   usuario.usuario = body.usuario;

        usuario.save((err, userReturn) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al Actualizado Usuario',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                usuarios: userReturn,
                mensaje: 'Usuario Actualizado correctamente'
            });



        });



    });


});


// ======================================================================================================
// ==========    ELIMINAR USUARIOS
// ======================================================================================================

app.delete('/:id', mdAutenticacion.verificarToken ,(req,res)=>{
var id = req.params.id;
Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{

    if (err) {
        return res.status(500).json({
            ok: false,
            mensaje: 'ERROR al borrar usuario',
            errors: err
        });
    }
    if (!usuarioBorrado) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No existe un usuario con ese id  ' + id,
            errors: { mensaje: 'No existe un usuario con ese id  ' + id },
        });
    }

     res.status(200).json({
        ok: true,
        mensaje: 'Usuario borrado correctamente',
        usuario: usuarioBorrado
    });

});
});



module.exports = app;