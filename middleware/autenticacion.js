

const jwt = require('jsonwebtoken');
const { SEED } = require('../config/config');


// ======================================================================================================
// ==========    VERIFICAR TOKEN Variante 2
// ======================================================================================================


//--- Variante 1 de Validar token -- se aplica a todas las delaraciones que se encuentren  declaradas despues de esta funcion
//--- el token se pasa en la url ejemplo PUT localhost:3000/Usuario?token = asdfjlskdjfuwejrb,sbfpso8dfsdnfjksdhfkh


exports.verificarToken = function(req,res,next){

 var token = req.query.token;
 jwt.verify(token,SEED,(err,decode)=>{
     if(err){
         return res.status(401).json({
            ok: false,
            mensaje: 'Token Incorrecto',
             errors: err
         });
    }
    req.usuario = decode.usuario ;
     next();
    
 });


}