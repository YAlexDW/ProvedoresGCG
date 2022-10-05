let bcrypt = require("bcrypt-nodejs");
let jwt = require("../libs/jwt");
let User = require("../models/user");


const register = (req,res)=>{
    let params= req.body;
    let user = new User();
    if(
        params.name &&
        params.nit &&
        params.billing_email &&
        params.phoneNumber &&
        params.adress &&
        params.identification &&
        params.contac_email &&
        params.password 
    ){
        bcrypt.hash(params.password,null,null, function(err, hash){
            if(hash){
        user.name= params.name; 
        user.nit= params.nit;
        user.billing_email = params.billing_email;
        user.phoneNumber= params.phoneNumber;
        user.adress= params.adress;
        user.identification= params.identification;
        user.contac_email= params.contac_email;
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
    let params = req.body

    User.findOne({contac_email: params.contac_email},(err, userData)=>{
        if(err){
            res.status(500).send({ message : "server error"});
        }else{
            if(userData){
                bcrypt.compare(params.password,userData.password, (err,confirm)=>{
                    if(confirm){ 
                        if(params.getToken){console.log(params.getToken)
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

const userlist =(req,res)=>{
    user.find((err,userData)=>{
        if(userData) {
            res.status(200).send({user: userData});
        }
    });
};

const getuserid = (req,res)=> {
    let id = req.params["id"];
    user.findById(id,(err,userData)=> {
        if (userData) {
            res.status(200).send({user : userData})
        }else{
            res.status(403).send({ message: "No se encontro ningun registro" })
        }
    })
}


const edituser =(req,res)=> {
    let id = req.params["id"];
let params = req.body;
if (params.password) {
    bcrypt.hash(params.password, null, null, (err, hash) => {
    if (hash) {
        User.findByIdAndUpdate(id,
            {
        name: params.name, 
        nit: params.nit,
        billing_email : params.billing_email,
        phoneNumber: params.phoneNumber,
        adress: params.adress,
        identification: params.identification,
        contac_email: params.contac_email,
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
    {User.findByIdAndUpdate(id,
        {
            name: params.name, 
            nit: params.nit,
            billing_email: params.billing_email,
            phoneNumber: params.phoneNumber,
            adress: params.adress,
            identification: params.identification,
            contac_email: params.contac_email,
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

const deleteuser= (req,res) => {
    let id = req.params["id"];
        User.findByIdAndDelete({ _id: id }, (err, userData) => {
    if (err) {
    res.status(500).send({ message: "Error al conectar al servidor" });
    } else {
    if (userData) {
    res.status(200).send({ User: userData });
    } else {
        res.status(401).send({ message: "Error al eliminar" });
    }
    }
});
};

module.exports={
    register,
    login,
    userlist,
    getuserid,
    edituser,
    deleteuser,
};