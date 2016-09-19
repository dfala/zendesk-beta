var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TicketSchema = mongoose.Schema({
	type: String,
	subject: String,
	description: String,
  assignee_id: Number,
  brand_id: Number,
  collaborator_ids: [Number],
  created_at: String,
  custom_fields: [Schema.Types.Mixed],
  fields: [Schema.Types.Mixed],
  has_incidents: Boolean,
  id: Number,
  raw_subject: String,
  requester_id: Number,
  submitter_id: Number,
  tags: [String],
  updated_at: String,
  url: String,
  via: Schema.Types.Mixed
});

module.exports = mongoose.model('Ticket', TicketSchema);
