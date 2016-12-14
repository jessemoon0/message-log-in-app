//See message.js for tutorial about the code here
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  //To activate unique validation:
  //npm install --save mongoose-unique-validator
  email: {type: String, required: true, unique: true},
  //Is an array of IDs (multiple messages)
  messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

//Activate the unique:true validation
schema.plugin(mongooseUniqueValidator);

//Collection Users
module.exports = mongoose.model('User', schema);
