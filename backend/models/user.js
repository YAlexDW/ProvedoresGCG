var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var user = new Schema({
    Nombre: String,
    NIT: Number,
    correo_facturacion: String,
    celular:Number,
    Direccion: String,
    Cedula:String,
    Correo_contacto: {type: String, required: true, unique: true}, 
    Password: {type: String, required: true}
});

module.exports= mongoose.model("User", user);