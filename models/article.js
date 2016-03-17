var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the article schema
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: ''
  }
});

// make it public
module.exports = mongoose.model('Article', ArticleSchema);
