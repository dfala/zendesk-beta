var exports         = module.exports = {},
    fs              = require('fs'),
    Ticket          = require('../models/TicketModel.js'),
    keys            = require('../keys.js'),
    TicketIds       = require('./Sep_tickets.json'),
    Zendesk         = require('zendesk-node-api');


var zendesk = new Zendesk({
  url: keys.zendesk.url,
  email: keys.zendesk.email,
  token: keys.zendesk.token
});


// GET TICKETS MIGHT NOT WORK IF THERE IS A LARGE AMOUNT OF TICKETS
// SEE exports.saveTickets()
exports.getBulk = function () {
  zendesk.tickets.list('created>2016-09-01&subject:Exiting*')
  .then(function(response) {

    console.log(response.length);

    var promises = response.map(function (ticket) {
      var newTicket = new Ticket(ticket);
      return newTicket.save();
    });

    Promise.all(promises)
    .then(function (response) {
      console.log('Successfully saved tickets');
    })
    .catch(function (err) {
      console.error('There was an error saving: ', err);
    })
  })
  .catch(function (err) {
    console.error("ERROR ", err);
  });
};


// THIS IS THE PREFERRED FUNCTION TO RETRIEVE TICKETS
exports.getTicketsFromIds = function () {
  var lowEnd      = -100,
      highEnd     = 0,
      incrementBy = 100,
      max         = 3047;

  setInterval( function () {
    if (highEnd >= max) return console.log('Completed!!');

    lowEnd = lowEnd + incrementBy;
    highEnd = highEnd + incrementBy;

    if (lowEnd >= 3000) highEnd = max;
    console.log('Request for: ' + lowEnd + ' - ' + highEnd);

    var ticketChunk = TicketIds.slice(lowEnd, highEnd);

    ticketChunk.forEach(function (ticket) {
      zendesk.tickets.show(ticket.ID)
        .then(function(result) {
          var newTicket = new Ticket(result);
          newTicket.save();
        })
        .catch(function(err) {
          console.log('Error: ', err)
        });
    });
  }, 60000);
};

exports.displayTickets = function () {
  Ticket.find({}, function (err, result) {
    if (err) return console.log('err: ', err);
    console.log('result: ', result.length);

    var oldestDate = new Date('09/01/2016');
    result.filter(function (ticket) {
      if (new Date(ticket.created_at) <= oldestDate) return false;
      return true;
    });

    result = result.map(function (ticket) {
      return {
        created_at  : new Date(ticket.created_at).toLocaleDateString(),
        _id         : ticket._id,
        zendeskId   : ticket.id,
        description : ticket.description
      };
    });

    var dataToSave = JSON.stringify(result);

    // CREATE FILE
    fs.writeFile('sep_data.json', dataToSave, function(err) {
      if (err) return console.log("ERROR TWO", err);
      console.log('file saved');
    });
  })
};
