var bcrypt = require('bcrypt');
var express = require('express');
var mongodb = require('mongodb');


const SERVER_PORT = '8241';
var user = 'cd_tannahill';
var password = 'A00397783';
var database = 'cd_tannahill';

var host = '127.0.0.1';
var port = '27017';

var connectionString = 'mongodb://' + user + ':' + password + '@' +
    host + ':' + port + '/' + database;
console.log(connectionString);

var bankAccountCollection;
const NAME_OF_COLLECTION = 'TransactionRecords';

//CORS Middleware, causes Express to allow Cross-Origin Requests
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
};

var app = express();
app.use(express.bodyParser());
app.use(allowCrossDomain);
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/css', express.static(__dirname + '/css'));
app.use(express.static(__dirname));

//Connect to DB.
mongodb.connect(connectionString,function(error,db) {
    if(error) {
        throw error;
    }

    bankAccountCollection = db.collection(NAME_OF_COLLECTION);

    //Close the database connection and server when the application ends.
    process.on('SIGTERM',function() {
        console.log('Shutting server down.');
        db.close();
        app.close();
    });

    //Now start the application server.
    var server = app.listen(SERVER_PORT, function () {
        console.log('Listening on port %d',server.address().port);
    });
});

//Record Deposit and Withdraw information to the server.
app.post('/recordTransaction', function (request, response) {

    //Insert into the collection
    bankAccountCollection.insert(request.body,
        function (err, result) {
            if (err) {
                console.log(err);
                return response.send(400, 'Error occured syncing information');
            }
            return response.send(200, 'Record Saved.');
        }
    );
});

app.post('/getTransactions', function(request, response) {
    bankAccountCollection.find({}, function(err, result) {
        if(err) {
            return response.send(400, 'An error occured.');
        }

        result.toArray(function(err, resultArray) {
            if(err) {
                return response.send(400, 'An error occured.')
            }

            return response.send(200, resultArray);
        });
    });
});


