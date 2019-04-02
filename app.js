var fs = require('fs');
var data = fs.readFileSync('words.json');

var words = JSON.parse(data);

console.log(words);
console.log('ahhhh! Server is running away');

//requiring express
const express = require('express');
//express is a function you can call 
const app = express(); 
//opens up our listening port with a callback that includes a console.log
const server = app.listen(3000, listening); 

function listening(){
    console.log('listening on port 3000');
}

app.get('/addDino/:name/:rank',rawr);
function rawr(request,response){
    var data = request.params;
    var word = data.name;
    var score = Number(data.rank);
    var reply;
    if(!score){
        reply = {
            msg: "Score is required"
        }
        response.send(reply)
    } else{
        words[word] = score;

        var data = JSON.stringify(words, null, 2);
        fs.writeFile('words.json',data,finished);
        
        function finished(err){
            console.log('all set!');
            reply = {
            dino: word,
            score: score,
            msg: "RAWR! I AM A DINOSAUR"
        }
        response.send(reply)
        }

    }
    
}

app.get('/all', sendAll);
function sendAll(request, response){
   response.send(words) 
}