const mongoose = require('mongoose');

const { Schema } = mongoose;

const requestSchema = new Schema(
  {
    issuer: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    recipient: { type: Schema.Types.ObjectId, required: true },
    created: { type: Date, required: true },
    status: { type: String, required: true },
  },
);

// Export model
module.exports = mongoose.model('Request', requestSchema);
