var express = require('express');
var router = express.Router();

//localhost:3000/
router.get('/', function (req, res, next) {
  //Render a view on the response object
    res.render('index');
  //If we put next here, it would send us to the 404 code on app.js
});


router.get('/message/:msg', function (req, res, next) {
  //Variable is an object which value is hello
  //This line is to show how the Template is connected through the
  //Hello Variable
  //res.render('node', {message: 'Hello!'});

  //We use req.params to grab the param POST is sending
  //Notice is the same name of the specified URL
  res.render('node', {message: req.params.msg});

});

//Get the message from a form
router.post('/message', function (req, res, next) {
  //Extract the message:
  //Body-parser in app.js, req.body.<property> required to get the POST data
  //The property can be set from the frontend
  var message = req.body.message;
  //In this case we redirect the request only with appended message,
  //so we show it in the template
  res.redirect('/message/' + message);
});

module.exports = router;
