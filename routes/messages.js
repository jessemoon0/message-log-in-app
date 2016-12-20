//All message related routes.
var express = require('express');
var router = express.Router();
//Import the message model to use Mongoose.
var Message = require('../models/message');

//See all messages stored in DB. This root route comes after localhost/message
//For Tutorial check the '/' POST route.
router.get('/', function(req, res, next){
  //We could pass arguments (in a JS object) to control which messages to find.
  Message.find()
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

//Store messages on the DB. This root route comes after localhost/message
router.post('/', function (req, res, next) {
  var message = new Message({
    //Angular 2 must send this content field
    content: req.body.content
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
    //201 Everything ok and resource created
    res.status(201).json({
      message: 'Message Successfully Saved!',
      obj: result
    });
  });
});

//Update without replacing. This root route comes after localhost/message
//We pass the ID of the message we want to work with.
router.patch('/:id',function (req, res, next) {
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
