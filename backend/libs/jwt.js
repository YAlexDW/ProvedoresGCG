let jwt= require("jwt-simple");
let moment= require("moment");
let secret= "almaceonly21";

exports.createToken=(user)=>{
    let payload = {
        _id: user._id,
        Nombre: user.Nombre,
        NIT: user.NIT,
        correo_facturacion: user.correo_facturacion ,
        celular: user.celular,
        Direccion: user.Direccion,
        Cedula: user.Cedula,
        Correo_contacto: user.Correo_contacto ,
        Password: user.Password,
        let:moment().unix(),
    };
    return jwt.encode(payload,secret);
};
