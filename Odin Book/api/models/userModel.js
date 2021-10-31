const mongoose = require('mongoose');
const { DateTime } = require('luxon');

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
    created: { type: Date, required: true },
    active: { type: Boolean, required: true },
    relationship_status: { type: String, required: true },
  }, {
    toJSON: { virtuals: true },
  },
);

UserSchema
  .virtual('created_format')
  .get(function cb() {
    return DateTime.fromJSDate(this.created).toLocaleString(DateTime.DATE_MED);
  });

// Export model
module.exports = mongoose.model('user', UserSchema);
