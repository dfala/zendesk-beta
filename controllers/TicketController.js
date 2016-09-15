var exports         = module.exports = {},
    fs              = require('fs'),
    Ticket          = require('../models/TicketModel.js'),
    ticketsToQuery  = require('../tickets.js').tickets,
    keys            = require('../keys.js'),
    Zendesk         = require('zendesk-node-api');


var zendesk = new Zendesk({
  url: keys.zendesk.url,
  email: keys.zendesk.email,
  token: keys.zendesk.url
});


exports.getTickets = function () {
  // var ticketChunk = ticketsToQuery.slice(700, 767);
  // ticketChunk.forEach(function (ticketId) {
  //   zendesk.tickets.show(ticketId)
  //     .then(function(result) {
  //       var newTicket = new Ticket(result);
  //       newTicket.save();
  //     })
  //     .catch(function(err) {
  //       console.log(err)
  //     });
  // });
};

exports.saveTickets = function () {

  Ticket.find({})
  .then(function (result) {
    // var simplified = result.map(function(ticket) {
    //   return {
    //     description: ticket.description,
    //     subject: ticket.subject,
    //     url: ticket.url,
    //     created_at: ticket.created_at
    //   }
    // })

    var dataToSave = JSON.stringify(result);
    // console.log(dataToSave);

    fs.writeFile('zendesk_tickets_parsed.json', dataToSave, function(err) {
      if (err) return console.log("ERROR TWO", err);
      console.log('file saved');
    });
  })
  .catch(function (err) {
    console.log("CATCH ERROR", err);
  })

};

exports.saveJSON = function () {
  var data = JSON.stringify(TicketsData);
  return console.log(data);
  // fs.writeFile('zendesk_JSON_string.json', data, function(err) {
  //   if (err) return console.log("ERROR TWO", err);
  //   console.log('file saved');
  // });
};
