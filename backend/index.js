var express= require("express")
var bodyParser= require("body-parser")
var mongoose= require("mongoose")

let port = process.env.PORT || 3001;

let app= express();
let User= require("./routes/user")


mongoose.connect("mongodb+srv://userGCG:gallardo12@cluster0.orkrkzu.mongodb.net/Provedores_GCG?retryWrites=true&w=majority",
    (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log('BD On..');
            app.listen(port, function () {
                console.log("Servidor Backend On");
        });
    }
    });

    mongoose.connection.on('connected', () => {
        console.log("mongo atlas");
    });


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use((req,res,next)=>{
    res.header("Content-Type: application/json");
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization,  X-API-KEY,Origin,X-Requested-With,Content-Type,Access-Control-Request-Method" 
    );
    res.header("Access-Control-Request-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Allow","GET,PUT,POST,DELETE,OPTIONS");
    next();
});

app.use("/api",User);
module.exports= app;
