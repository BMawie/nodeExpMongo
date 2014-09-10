var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var types = {
  values: 'restaurant bar pub shop'.split(' '),
  message: 'Tag.type enum validator failed for path `{PATH}` with value `{VALUE}`'
};
var tagSchema = new Schema({
    name          : { type: String, required: true, trim: true, index: { unique: true } }
  , description   : { type: String, required: true }
  , minor		  : { type: Number, required: true, min: 1 }
  , major 		  : { type: Number, required: true, min: 1 }
  , uuid		  : { type: String, required: true, uppercase: true, trim: true }
  , type		  : { type: String, required: false, lowercase: true }
  , date_created  : { type: Date, required: true, default: Date.now }
  , date_updated  : { type: Date, required: false }
});

var tag = mongoose.model('tag', tagSchema);


var typeInvalid = new tag({ type: 'invalid' });
typeInvalid.save(function (err) {
  console.error(String(err))
})

module.exports = {
  Tag: tag
};