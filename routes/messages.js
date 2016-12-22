//All message related routes.
var express = require('express');
var router = express.Router();
//Import the message model to use Mongoose.
var Message = require('../models/message');
var jwt = require('jsonwebtoken');

//Import User Model for auth
var User = require('../models/user');

//See all messages stored in DB. This root route comes after localhost/message
//For Tutorial check the '/' POST route.
router.get('/', function(req, res, next){
  //We could pass arguments (in a JS object) to control which messages to find.
  Message.find()
  //We use this method to expand the posibilities of extracting data
  //In this case we extract the user field in the Message model (user ref)
  // and get the user's firstName connected to each message
  .populate('user', 'firstName')
  .exec(function(err, docs){
    if(err){
      return res.status(500).json({
        title: 'An Error Occurred',
        error: err
      });
    }
    res.status(200).json({
      message: 'List Successfully Showed',
      //If you rename this property, use the same field on the frontend
      obj: docs
    });
  });
});

//USER AUTH. On every request, this route is reached. Only the GET route is
//executed because goes before this route.
router.use('/', function(req, res, next){
  //Check user.js to see the 'secret' we specified there.
  //In the callback you get an error or a decoded token
  jwt.verify(req.query.token, 'secret', function(err, decoded){
    if(err){
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      })
    }
    //If token valid, go to the next route
    next();
  });
});

//Store messages on the DB. This root route comes after localhost/message
router.post('/', function (req, res, next) {
  //We decode the verified token to then get the User ID.
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function(err, user){
    if(err){
      return res.status(500).json({
        title: 'An Error Occurred',
        error: err
      });
    }
    var message = new Message({
      //Angular 2 must send this content field
      content: req.body.content,
      //AUTH: Add now the User extracted from the DB
      user: user
    });
    //SAVE TO MONGO DB
    message.save(function(err, result){
      if(err){
        //500 = Server Error
        //If we dont put the return here, we would still execute the code below.
        return res.status(500).json({
          title: 'An Error Occurred',
          //This error object has a .message property for error handling
          error: err
        });
      }
      //CREATE CONNECTION OF USERS AND MESSAGES
      user.messages.push(result);
      //Save the update.
      user.save();
      //201 Everything ok and resource created
      res.status(201).json({
        message: 'Message Successfully Saved!',
        obj: result
      });
    });
  });
});

//Update without replacing. This root route comes after localhost/message
//We pass the ID of the message we want to work with.
router.patch('/:id',function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(err, message){
    if(err){
      return res.status(500).json({
        title: 'An Error Occurred',
        error: err
      });
    }
    if(!message){
      return res.status(500).json({
        title: 'Message is not found!',
        error: {message: 'Message Not Found'}
      });
    }
    //Token Validation
    if (message.user != decoded.user._id) {
        return res.status(401).json({
            title: 'Not Authenticated',
            error: {message: 'Users do not match'}
        });
    }
    //The UPDATING PART
    message.content = req.body.content;
    message.save(function(err, result){
      if(err){
        //500 = Server Error
        //If we dont put the return here, we would still execute the code below.
        return res.status(500).json({
          title: 'An Error Occurred',
          //This error object has a .message property for error handling
          error: err
        });
      }
      res.status(200).json({
        message: 'Message Updated!',
        obj: result
      });
    });
  });
});

router.delete('/:id', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  //We copy the code from patch route.
  Message.findById(req.params.id, function(err, message){
    if(err){
      return res.status(500).json({
        title: 'An Error Occurred',
        error: err
      });
    }
    if(!message){
      return res.status(500).json({
        title: 'Message is not found!',
        error: {message: 'Message Not Found'}
      });
    }
    //Token Validation
    if (message.user != decoded.user._id) {
        return res.status(401).json({
            title: 'Not Authenticated',
            error: {message: 'Users do not match'}
        });
    }
    //The DELETE PART
    message.remove(function(err, result){
      if(err){
        //500 = Server Error
        //If we dont put the return here, we would still execute the code below.
        return res.status(500).json({
          title: 'An Error Occurred',
          //This error object has a .message property for error handling
          error: err
        });
      }
      res.status(200).json({
        message: 'Message Deleted =(!!!',
        obj: result
      });
    });
  });
});

module.exports = router;
