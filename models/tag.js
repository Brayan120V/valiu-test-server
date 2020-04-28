import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
  name: { type: String },
  color: { type: String },
});

TagSchema.pre('save', (next) => {
  next();
});

TagSchema.methods = {
};

TagSchema.statics.create = async function createTag(data) {
  data.color = ['#317f43', '#001a57', '#9b5e4f', '#497e76', '#d95030', '#fcf75e'][
    parseInt(Math.random() * 6)
  ];
  return new this(data).save();
};

TagSchema.statics.update = async function updateTag(query, data) {
  return this.findOneAndUpdate(query, data, { runValidators: true, context: 'query', new: true });
};

TagSchema.statics.delete = async function deleteTag(query, data) {
  return this.findOneAndDelete(query, data);
};

TagSchema.statics.list = async function listTags(query) {
  return this.find(query).sort({ _id: -1 });
};

TagSchema.plugin(require('mongoose-private-paths'));
TagSchema.plugin(require('mongoose-unique-validator'), { message: '{PATH}_EXISTS' });

module.exports = mongoose.model('Tag', TagSchema);
