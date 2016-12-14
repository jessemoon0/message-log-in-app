var mongoose = require('mongoose');
//Schema is a helper object for creating a blueprint of our models
var Schema = mongoose.Schema;

//Here we create the constructor's properties for the messages
//A message should have a content and hold a reference
//to the user that created it
var schema = new Schema({
  content: {type: String, required: true},
  //Types access all the types mongoose knows.
  //ObjectId is to store the IDs.
  //Each object we store, gets an ID automatically
  //ref is the way we join the 2 models
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

//Argument 1: The model's name (to instantiate as: new Message),
//this name is name is used as a collection: messages and will
//be created as soon as we start inserting data in the DB
//Argument 2: The schema we use for the model, created above.
module.exports = mongoose.model('Message', schema);
