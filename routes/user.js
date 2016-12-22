//All User related routes.
var express = require('express');
var router = express.Router();

//Import User Mongoose Model
var User = require('../models/user');

//For Password encryption.
var bcrypt = require('bcryptjs');

//For token
var jwt = require('jsonwebtoken');

//Creating a User.
router.post('/', function (req, res, next) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    //ALWAYS ENCRYPT YOUR PASSWORD. HashSync is a 1 way encryption.
    //2nd arg: salt--> Strength of the encryption (10 in this case)
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email
  });
    user.save(function(err, result){
      if(err){
        return res.status(500).json({
          title: 'An Error Occurred',
          error: err
        });
      }
      res.status(201).json({
        message: 'User CREATED',
        obj: result
      });
    });
});

//Sign In (localhost:3000/user/signin)
router.post('/signin', function (req, res, next) {
  //Retrieve User by email (unique field)
  User.findOne({email: req.body.email}, function(err, user){
    if(err){
      return res.status(500).json({
        title: 'An Error Occurred',
        error: err
      });
    }
    if(!user){
      //Status code for unauthorized
      return res.status(401).json({
        //We could put: 'No User found' but it can be a security Weakness
        //Potential attackers would start testing emails.
        title: 'Login Failed',
        error: {message: 'Invalid Log In Credentials'}
      });
    }
    //COMPARE PASSWORDS. Returns true or false
    //We check first if its false
    if(!bcrypt.compareSync(req.body.password, user.password)){
      return res.status(401).json({
        title: 'Login Failed',
        error: {message: 'Invalid Log In Credentials 2'}
      });
    }
    //Now we CREATE THE TOKEN: Store the user with a key name secret and
    //expires in 2 hours.
    var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
    res.status(200).json({
      message: 'Successfully logged in!',
      //THIS IS WHAT YOU RESPOND to the frontend
      token: token,
      userId: user._id
    });
  });
});

module.exports = router;
