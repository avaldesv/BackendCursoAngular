var mongoose = require(
    'mongoose'
);

var uniqueValidator = require('mongoose-unique-validator')

var Schema = mongoose.Schema ;

var rolesValidos= {values:['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

var usuarioSchema = new Schema({
    nombre: {type:String, required:[true,'El Nombre es Requerido']},
    email: {type:String,unique: true ,required:[true,'El Email es Requerido']},
    usuario: {type:String,unique: true,required:[true,'El Usuario es Requerido']},
    password: {type:String, required:[true,'Debe Introducir una contraseña']},
    img: {type:String, required:false},
    role: {type:String, required:true, default:'USER_ROLE',enum:rolesValidos},

});
usuarioSchema.plugin(uniqueValidator,{message:"El {PATH} debe ser unico"})
module.exports = mongoose.model("Usuario",usuarioSchema)