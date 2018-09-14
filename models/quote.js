var mongoose = require('mongoose');

var quoteSchema = mongoose.Schema({
  author : String,
  created_at : {type: Date , default:Date.now()},
  body : String,
  title : String
});

var quoteModel = mongoose.model('quotemodel' , quoteSchema);

module.exports = quoteModel;
