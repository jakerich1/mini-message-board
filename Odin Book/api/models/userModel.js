const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    method: { type: String, required: true },
    facebook: {
      id: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
);

// Export model
module.exports = mongoose.model('User', UserSchema);
