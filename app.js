var express=require("express");
var request=require("request");
var fetch =require('node-fetch');
var bodyParser=require("body-parser");
var app=express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
var images=["https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/3718433/pexels-photo-3718433.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/3800517/pexels-photo-3800517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/3602833/pexels-photo-3602833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"];
app.get("/",function(req,res){

    
    (async () => {
        const allMatches = await fetch('https://cricapi.com/api/matches/vRXDuVep99VLZGLlfsBBBW3aBOk1').then(response => response.json());
        try{
            
            res.render("index",{navData:allMatches.matches,images:images});
        }
        catch{

        }
     })();
    
})

app.get("/match/:id", function(req,res){
    var unique_id=req.params.id;
    (async () => {
        const match = await fetch('https://cricapi.com/api/cricketScore?apikey=vRXDuVep99VLZGLlfsBBBW3aBOk1&unique_id='+unique_id).then(response => response.json());
        try{
            
            res.render("match",{data:match});
        }
        catch{

        }
     })();
})

app.post("/search", function(req,res){
    var query=req.body.search;
    

    (async () => {
        const players = await fetch('https://cricapi.com/api/playerFinder?apikey=vRXDuVep99VLZGLlfsBBBW3aBOk1&name='+query).then(response => response.json());
        try{
            // console.log(players);
            res.render("search",{data:players.data});
        }
        catch{

        }
     })();


})

app.get("/player/:id", function(req,res){
    var pid=req.params.id;
    (async () => {
        const player = await fetch('https://cricapi.com/api/playerStats?apikey=vRXDuVep99VLZGLlfsBBBW3aBOk1&pid='+pid).then(response => response.json());
        try{
            console.log(player);
            res.render("player",{data:player});
        }
        catch{

        }
     })();
})

app.listen("1800");