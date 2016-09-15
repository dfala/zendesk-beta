var exports         = module.exports = {},
    fs              = require('fs'),
    Ticket          = require('../models/TicketModel.js'),
    keys            = require('../keys.js'),
    Zendesk         = require('zendesk-node-api');


var zendesk = new Zendesk({
  url: keys.zendesk.url,
  email: keys.zendesk.email,
  token: keys.zendesk.url
});

exports.getTickets = function () {
  zendesk.tickets.show(5503)
  .then(function(ticket){
    console.log("TICKET ", ticket);
  })
  .catch(function (err) {
    console.error("ERROR ", err);
  });

  // zendesk.tickets.list()
  // .then(function (tickets) {
  //   console.log("TICKETS ", tickets);
  // })
  // .catch(function (err) {
  //   console.error("ERROR ", err);
  // })
};
