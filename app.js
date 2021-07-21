var express=require("express");
var request=require("request");
var fetch =require('node-fetch');
var app=express();

app.set("view engine","ejs");
var images=["https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/3718433/pexels-photo-3718433.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/3800517/pexels-photo-3800517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/3602833/pexels-photo-3602833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"];
app.get("/",function(req,res){

    
    (async () => {
        const directors = await fetch('https://cricapi.com/api/matches/vRXDuVep99VLZGLlfsBBBW3aBOk1').then(response => response.json());
        try{
            
            res.render("index",{navData:directors.matches,images:images});
        }
        catch{

        }
     })();
    
})

app.get("/match/:id", function(req,res){
    var unique_id=req.params.id;
    (async () => {
        const directors = await fetch('https://cricapi.com/api/cricketScore?apikey=vRXDuVep99VLZGLlfsBBBW3aBOk1&unique_id='+unique_id).then(response => response.json());
        try{
            
            res.render("match",{data:directors});
        }
        catch{

        }
     })();
})
app.listen("1800");