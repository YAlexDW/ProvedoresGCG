let express= require("express");
const { model } = require("mongoose");
let User= require("../controllers/user");

let api= express.Router();

api.post("/user/register",User.register);
api.post("/login", User.login);
api.get("/userlist", User.userlist);
api.put("/user/edituser/:id", User.edituser);
api.get("/getuserid/:id", User.getuserid);
api.delete("/user/deleteuser/:id", User.deleteuser);

module.exports= api;