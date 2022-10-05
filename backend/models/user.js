var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var user = new Schema({
    name: String,
    nit: Number,
    billing_email: String,
    phoneNumber:Number,
    adress: String,
    identification:String,
    contac_email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}
});

module.exports= mongoose.model("User", user);