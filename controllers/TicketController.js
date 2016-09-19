var exports         = module.exports = {},
    fs              = require('fs'),
    Ticket          = require('../models/TicketModel.js'),
    keys            = require('../keys.js'),
    TicketIds       = require('./tickets.js').tickets,
    Zendesk         = require('zendesk-node-api');


var zendesk = new Zendesk({
  url: keys.zendesk.url,
  email: keys.zendesk.email,
  token: keys.zendesk.token
});

exports.getTickets = function () {
  // return console.log(keys.zendesk.url);
  zendesk.tickets.list('subject:Exiting*')
  .then(function(response) {

    return console.log('Please remove the "return" to enable this function.');

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

exports.saveTickets = function () {
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

    ticketChunk.forEach(function (ticketId) {
      zendesk.tickets.show(ticketId)
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
  })
};
