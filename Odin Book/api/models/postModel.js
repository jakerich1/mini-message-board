const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    created: { type: Date, required: true },
    image: { type: String, required: false },
  },
);

// Export model
module.exports = mongoose.model('Post', PostSchema);
