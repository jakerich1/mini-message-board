const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    method: { type: String, required: true },
    facebook: {
      id: { type: String, required: true },
      email: { type: String, required: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
    },
    profile_picture: { type: String },
    created: { type: String, required: true },
    active: { type: Boolean, required: true },
    relationship_status: { type: String, required: true },
  },
);

// Export model
module.exports = mongoose.model('User', UserSchema);
