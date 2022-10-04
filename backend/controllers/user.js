let bcrypt = require("bcrypt-nodejs");
let jwt = require("../libs/jwt");
const user = require("../models/user");


const registrar = (req,res)=>{
    let params= req.body
    let user = new User();
    if(
        params._id &&
        params.Nombre &&
        params.NIT &&
        params.correo_facturacion &&
        params.celular &&
        params.Direccion &&
        params.Cedula &&
        params.Correo_contacto &&
        params.Password
    ){
        bcrypt.hash(params.pass,null,null, function(err, hash){
            if(hash){
        user._id= params._id;
        user.Nombre= params.Nombre; 
        user.NIT= params.NIT;
        user.correo_facturacion = params.correo_facturacion;
        user.celular= params.celular;
        user.Direccion= params.Direccion;
        user.Cedula= params.Cedula;
        user.Correo_contacto= params.Correo_contacto;
        user.password = hash;
        user.save((err, savedUser)=>{
            if(err){
                console.log(err)
                res.status(500).send({err: "Error Al Registrar Usuario"});
            }else{
                res.status(200).send({user: savedUser})
            }
            });
        }else {res
              .status(400)
              .send({ err: "no se registro la contraseña ni usuario" });
          }
        });
      } else {
        res.status(405).send({ err: "faltan campos obligatorios" });
      }
    };

const login = (req,res)=>{
    let= req.body

    user.findOne({Correo_contacto: params.Correo_contacto},(err, userData)=>{
        if(err){
            res.status(500).send({ message : "server error"});
        }else{
            if(userData){
                bcrypt.compare(params.pass,userData.pass, (err,confirm)=>{
                    if(confirm){
                        if(params.getToken){
                            res.status(200).send({
                                jwt: jwt.createToken(userData),
                                user: userData
                            });
                        }else{
                            res.status(200).send({User: userData, menssage: "No Token"})
                        }
                    }else{
                        res
                        .status(401)
                        .send({ message : "correo o contraseña incorrecta"})
                    }
                })
            }
        }
    })
}

const listaUsuario =(req,res)=>{
    user.find((err,userData)=>{
        if(userData) {
            res.status(200).send({user: userData});
        }
    });
};

const Usuariobyid = (req,res)=> {
    let id = req.params["id"];
    user.findById(id,(err,userData)=> {
        if (userData) {
            res.status(200).send({user : userData})
        }else{
            res.status(403).send({ message: "No se encontro ningun registro" })
        }
    })
}


const editarUsuario =(req,res)=> {
    let id = req.params["id"];
  let params = req.body;
  if (params.pass) {
    bcrypt.hash(params.pass, null, null, (err, hash) => {
      if (hash) {
        user.findByIdAndUpdate(id,
            {
        Nombre: params.Nombre, 
        NIT: params.NIT,
        correo_facturacion : params.correo_facturacion,
        celular: params.celular,
        Direccion: params.Direccion,
        Cedula: params.Cedula,
        Correo_contacto: params.Correo_contacto,
        password : hash,
            },
       (err,userData)=>{
        if(userData) {
            res.status(200).send({ User: userData });
            } else {
            res.status(501).send({ message: "El usuario no se pudo editar" });
        }
     }    
 )}
});
  }else{
    {user.findByIdAndUpdate(id,
        {
            Nombre: params.Nombre, 
            NIT: params.NIT,
            correo_facturacion: params.correo_facturacion,
            celular: params.celular,
            Direccion: params.Direccion,
            Cedula: params.Cedula,
            Correo_contacto: params.Correo_contacto,
        },
    (err,userData)=>{
        if(userData) {
            res.status(200).send({ User: userData });
        } else {
            res.status(501).send({ message: "El usuario no se pudo editar" });
        }
    }
)}
}
}

const eliminarUsuario= (req,res) => {
    let id = req.params["id"];
        User.findByIdAndDelete({ _id: id }, (err, userData) => {
    if (err) {
    res.status(500).send({ message: "Error al conectar al servidor" });
    } else {
    if (userData) {
    res.status(200).send({ Usuario: userData });
    } else {
        res.status(401).send({ message: "Error al eliminar" });
    }
    }
});
};

module.exports={
    registrar,
    login,
    listaUsuario,
    Usuariobyid,
    editarUsuario,
    eliminarUsuario,
};