let jwt= require("jwt-simple");
let moment= require("moment");
let secret= "provedores123";

exports.createToken=(user)=>{
    let payload = {
        _id: user._id,
        name: user.name,
        nit: user.nit,
        billing_email: user.billing_email,
        phoneNumber: user.phoneNumber,
        adress: user.adress,
        identification: user.identification,
        contac_email: user.contac_email,
        password: user.password,
        iat:moment().unix(),
    };
    return jwt.encode(payload,secret);
};
