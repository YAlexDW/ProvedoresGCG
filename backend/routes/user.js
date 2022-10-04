let express= require("express");
let User= require("../controllers/user");

let api= express.Router();

api.post("user/registrar",User.registrar);
api.post("login/", User.login);
api.get("/user", User.listaUsuario);
api.put("/user/editarusuario/:id", User.editarUsuario);
api.get("/user/:id", User.Usuariobyid);
api.delete("/user/eliminarusuario/:id", User.eliminarUsuario);

module.exports= api;