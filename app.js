const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const paginate = require("express-paginate");
const port =7000;
//INITIALIZES APP
const app = express();

//CONNECTING WITH DB
mongoose.connect("mongodb://localhost/stock");
let db = mongoose.connection;

db.once("open",function(){
    console.log("Successfully connected to database");
}).on("error",function(error){
    console.log(error);
})
//PAGINATION
app.use(paginate.middleware(10, 50));

app.set("view-engine","ejs");

//BODY PARSER
app.use(express.urlencoded({ extended: false }));

//SETTING ROUTES
app.use("/",require("./routes/index"));

//STATIC FILES
app.use('/public', express.static('public'));

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});