var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TicketSchema = mongoose.Schema({
  assignee_id: Number,
  brand_id: Number,
  collaborator_ids: [Number],
  created_at: String,
  custom_fields: [Schema.Types.Mixed],
  description: String,
  fields: [Schema.Types.Mixed],
  has_incidents: Boolean,
  id: Number,
  raw_subject: String,
  requester_id: Number,
  subject: String,
  submitter_id: Number,
  tags: [String],
  type: String,
  updated_at: String,
  url: String,
  via: Schema.Types.Mixed
});

module.exports = mongoose.model('Ticket', TicketSchema);
