var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Provedor = new Schema({
  Tipos_de_Provedor: String,  
  Nombre_o_razon_social: String,
  Departamento: String,
  Fecha_inscripcion: Date,
  NIT_CC: String,
  Ciudad: String,
  Celular: Number,
  Direccion: String,
  Correo_empresarial: String,
  Tipo_provedor: String,
  Tipo_actividad: String,
  Garantias: String,
  Regimen_IVA: String,
  Regimen_Renta: String,
  Informacion_Bancaria: String,
  Numero_de_cuenta_bancaria: Number,
  Entidad_financiera: String,
  Titular_cuenta: String,
  Persona_contacto: String,
  Celular: Number,
  Correo_electronico: String,
  Contrasena: String
});

module.exports = mongoose.model("Provedores",Provedor);