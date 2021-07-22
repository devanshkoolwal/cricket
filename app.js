require('dotenv').config()
var express=require("express");
var request=require("request");
var fetch =require('node-fetch');
var bodyParser=require("body-parser");
var app=express();
var mapData;
var allMatches;
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
var images=["https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/3718433/pexels-photo-3718433.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/3800517/pexels-photo-3800517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/3602833/pexels-photo-3602833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"];
app.get("/",function(req,res){

    
    (async () => {
        allMatches = await fetch('https://cricapi.com/api/matches/'+process.env.APIKEY).then(response => response.json());
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
        const match = await fetch('https://cricapi.com/api/cricketScore?apikey='+process.env.APIKEY+'&unique_id='+unique_id).then(response => response.json());
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
        const players = await fetch('https://cricapi.com/api/playerFinder?apikey='+process.env.APIKEY+'&name='+query).then(response => response.json());
        try{
            // console.log(players);
            res.render("search",{data:players.data});
        }
        catch{

        }
     })();


})
app.get("/player/search", function(req,res){
    res.render("playerSearch");
})
app.get("/player/:id", function(req,res){
    var pid=req.params.id;
    (async () => {
        const player = await fetch('https://cricapi.com/api/playerStats?apikey='+process.env.APIKEY+'&pid='+pid).then(response => response.json());
        try{
            
            res.render("player",{data:player});
        }
        catch{

        }
     })();
})

app.get("/teams",function(req,res){
    
            mapData=getMatches(allMatches.matches);
            var keys=[...mapData.keys()]
            res.render("teams",{data:mapData, keys:keys});
       
})

app.post("/team",function(req,res){
    var teamName=req.body.teamName;
    let unique_ids=mapData.get(teamName)
    let arr=[]
    for(let i=0;i<unique_ids.length;i++){
        for(let j=0;j<allMatches.matches.length;j++){
            if(unique_ids[i]==allMatches.matches[j].unique_id){
                arr.push(allMatches.matches[j]);
            }
        }
    }
    

    res.render("teamMatches",{data:arr});
})


// function getMatches(matches){

//     for(var i=0;i<matches.length;i++)



//     var set=new Set()

//     for(var i=0;i<matches.length;i++){
//         set.add(matches[i]['team-1'])
//         set.add(matches[i]['team-2'])
//     }

//     var array=Array.from(set)

//     let res=[]
//     for(var i=0;i<array.length;i++){
//         var obj=new Set()
//         for(var j=0;j<arr.length;j++){
//             if(matches[j]['team-1']==array[i] || matches[j]['team-2']==array[i]) obj.push(matches[j].unique_id)
//     }
//     res.push([array[i],obj])
// }
// console.log(res);
// return res
// }

function getMatches(matches){
    var set=new Map()

    for(var i=0;i<matches.length;i++){
        if(!set.has((matches[i]['team-1']))) set.set((matches[i]['team-1']),[])
        var v=set.get((matches[i]['team-1']))
        v.push((matches[i].unique_id))
        set.set((matches[i]['team-1']),v)


        if(!set.has((matches[i]['team-2']))) set.set((matches[i]['team-2']),[])
        var j=set.get((matches[i]['team-2']))
        j.push((matches[i].unique_id))
        set.set((matches[i]['team-2']),j)
    }


return set
}


app.listen(process.env.PORT);