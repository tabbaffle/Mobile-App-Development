/**
 * 
 * Connor Tannahill 
 */

//####################################
//change to the port asigned to you
const PORT = 8141;
//####################################


const FILE_NAME = 'information.txt';


//include express server
var express = require('express');

var app = express();//instantiate

//CORS Middleware, causes Express to allow Cross-Origin Requests
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers',
    'Content-Type');

  next();
}
app.use(allowCrossDomain);


//include file system, needed to write a file
var fs = require('fs');

//needed for post operation to parse request.body
app.use(express.bodyParser());


//adding satic resource
app.use(express.static(__dirname));// __dirname current directory
app.use('/scripts', express.static(__dirname + '/scripts'));//subfolder
app.use('/css', express.static(__dirname + '/css'));


//now start the server, listening to the port
var server = app.listen(PORT, function () {
    console.log('Listening on port %d',
            server.address().port);
});


//#############################################
app.post('/saveInformation', function (request, response) {


    console.log("Process being executed in " + __dirname);
    console.log(request.body);

    //extract them first (not necessary but ...)
    var a_number = request.body.A_Number;
    var studentType = request.body.StudentType;
    var ageGroup = request.body.AgeGroup;
    
    
    //create an object
    var newObj = {
        "A_Number": a_number,
        "StudentType": studentType,
        "AgeGroup": ageGroup 
    };
    
    var content;
    
    // now read the file
    fs.readFile('./' + FILE_NAME, function read(err, data) {
        if (err) {
            console.log(err);
            return err;
        }

        //encode to a string
        content = data.toString('utf8');

        var information = null;
        if (content==null || content.trim().length < 1){
            //ignoring the case when the obj is malformed in the file
            information = [];
        }
        else {
            information = JSON.parse(content);
        }//end if-else

        information.push(newObj);

        //now write the array
        fs.writeFile("./" + FILE_NAME, JSON.stringify(information), function (err) {
            console.log(JSON.stringify(information));
            if (err) {
                return console.log(err);
            }//end if

            console.log("The file was saved!");

            //if succeeded, send it back to the calling thread
            //there's a delay??
            return response.send(200, "Record saved successfully");//200 means "OK"

        });
        
        
    });

});
//#############################################



//#############################################
app.post('/getInformation', function (request, response) {

    console.log("Reading " + FILE_NAME);
    var content;

    // First I want to read the file
    fs.readFile('./' + FILE_NAME, function read(err, data) {
        if (err) {
            return console.log(err);
        }

        //encode to a string
        content = data.toString('utf8');
        console.log(content);
        
        //it's a string representation
        var information = JSON.parse(content);
        
        return response.send(200, information);

    });


});
//#############################################