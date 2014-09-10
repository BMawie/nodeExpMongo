var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
    name          : { type: String, required: true, trim: true, index: { unique: true } }
  , description   : { type: String, required: true }
  , date_created  : { type: Date, required: true, default: Date.now }
});

var tag = mongoose.model('tag', tagSchema);

module.exports = {
  Tag: tag
};