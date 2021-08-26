const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Stock = require("../models/stock");
var id="";

router.get("/",async(req,res) => {
    var result = await Stock.find();
    res.render("home.ejs",{result: result});
})

router.post("/add",(req,res) => {
    var name = req.body.name;
    var code = req.body.code;
    var price = req.body.price; 
    if(name == "" || code == "" || price == ""){
        res.send("add all details");
    }
    Stock.findOne({code: code})
    .then(result => {
        if(result){
            res.send("Stock already exists try updating");
        }
        else{
            const stock = new Stock({
                name : name,
                code :code,
                price : price 
            })
            stock.save()
            .then(async(result) => {
                if(result){
                    console.log("added");
                    var result = await Stock.find().exec();
                    console.log(result);
                    res.render("home.ejs",{result:result});
                    //Successfully added
                }
            })
        }
    }).catch(err =>{
        console.log(err);
    })
})

router.get("/update/:id",(req,res) => {
    id = req.params.id;
    res.render("update.ejs");
})
router.post("/update",(req,res) => {
    var name = req.body.name;
    var code = req.body.code;
    var price = req.body.price;
    if(name == "" || code == "" || price == ""){
        res.send("add all details");
    }
    Stock.findByIdAndUpdate({_id: id},{$set:{name:name,code:code,price:price}},{multi:true})
    .then(async(result)=>{
        if(result){
            //console.log("updated");
            var stock = await Stock.find();
            res.render("home.ejs",{result:stock});
        }
    }).catch(err =>{
        console.log(err);
    })
})

router.get("/delete/:id",(req,res) => {
    var id = req.params.id;
    Stock.findOneAndRemove({_id: id})
    .then(async(result) => {
        if(result){
            console.log("deleted");
            var stock = await Stock.find();
            console.log(stock);
            res.render("home.ejs",{result:stock});
            //deleted
        }
    }).catch(err => {
        console.log(err);
    })
})
router.post("/sort",async(req,res) => {
    var order= req.body.order;
    var field = req.body.field;
    if(order !=="ascending" || order !== "descending" || field !== "name" || field !== "code" || field !== "price"){
        res.send("Enter valid values");
    }
    if(order === "ascending"){
        if(field === "name" ){
            var stock = await Stock.find().sort({name:1})
            res.render("home.ejs",{result:stock});
        }
        else if(field === "code"){
            var stock = await Stock.find().sort({code:1})
            res.render("home.ejs",{result:stock});
        }else{
            var stock = await Stock.find().sort({price:1})
            res.render("home.ejs",{result:stock});
        }
    }
    else{
        if(field === "name" ){
            var stock = await Stock.find().sort({name:-1})
            res.render("home.ejs",{result:stock});
        }
        else if(field === "code"){
            var stock = await Stock.find().sort({code:-1})
            res.render("home.ejs",{result:stock});
        }else{
            var stock = await Stock.find().sort({price:-1})
            res.render("home.ejs",{result:stock});
        }
    }
})
module.exports = router;
