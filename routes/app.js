var express = require('express');
var router = express.Router();
//Import User Model
var User = require('../models/user');

//EXPRESS ROUTES BASIC USAGE:

// localhost:3000/
// router.get('/', function (req, res, next) {
//   //Render a view on the response object
//     res.render('index');
//   //If we put next here, it would send us to the 404 code on app.js
// });
//
// router.get('/message/:msg', function (req, res, next) {
//   //Variable is an object which value is hello
//   //This line is to show how the Template is connected through the
//   //Hello Variable
//   //res.render('node', {message: 'Hello!'});
//
//   //We use req.params to grab the param POST is sending
//   //Notice is the same name of the specified URL
//   res.render('node', {message: req.params.msg});
//
// });
//
// //Get the message from a form
// router.post('/message', function (req, res, next) {
//   //Extract the message:
//   //Body-parser in app.js, req.body.<property> required to get the POST data
//   //The property can be set from the frontend
//   var message = req.body.message;
//   //In this case we redirect the request only with appended message,
//   //so we show it in the template
//   res.redirect('/message/' + message);
// });


//MONGOOSE DB PART:


// router.get('/', function (req, res, next) {
//     //First match in DB, empty object gets me the
//     //first thing it finds.
//     //This is an ASYNC Task, so it cant be stored in a Variable
//     //If you execute code outside of the callback,
//     //YOU WONT HAVE access since the data fetched is inside
//     User.findOne({}, function(err, doc){
//       if(err){
//         return res.send('Error!');
//       }
//       //Fetch only email property of the callback object
//       res.render('node', {email: doc.email});
//     });
// });

// router.post('/', function (req, res, next) {
//   var email = req.body.email;
//   //Instantiate user model.
//   var user = new User({
//     firstName: 'Jessie',
//     lastName: 'Valladares',
//     password: 'super-secret',
//     email: email
//   });
//   //save to DB. Creates Users collection
//   //TEST: use node-angular. db.users.find() in terminal.
//   user.save();
//   res.redirect('/');
// });


//ANGULAR 2 PART


router.get('/', function (req, res, next) {
  res.render('index');
});

module.exports = router;
