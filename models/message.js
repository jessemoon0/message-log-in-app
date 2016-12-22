var mongoose = require('mongoose');
//Schema is a helper object for creating a blueprint of our models
var Schema = mongoose.Schema;

//Import User model to do operation based on messages-user connection
var User = require('./user');

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

//This means do this operation after a certain action has happened
//Example: Message was deleted. We pass the deleted message and pull
//it out from the user's array
schema.post('remove', function(message){
  User.findById(message.user, function(err, user){
    user.messages.pull(message);
    user.save();
  });
});



//Argument 1: The model's name (to instantiate as: new Message),
//this name is name is used as a collection: messages and will
//be created as soon as we start inserting data in the DB
//Argument 2: The schema we use for the model, created above.
module.exports = mongoose.model('Message', schema);
