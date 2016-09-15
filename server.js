var express     = require('express'),
    bodyParser  = require('body-parser'),
    cors        = require('cors'),
    keys        = require('./keys.js'),
    mongoose    = require('mongoose');

// App definition
var app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Connections
var portNum = keys.connections.port;
var ticketController = require('./controllers/TicketController.js');

var mongooseUri = keys.connections.mongoose;
mongoose.connect(mongooseUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Mongoose uri:', mongooseUri);
  ticketController.getTickets();
  // ticketController.saveTickets();
  // ticketController.saveJSON();
});


app.listen(portNum, function () {
    console.log('Listening on port: ' + portNum);
});
