const express  = require('express');
const router   = express.Router();
const User     = require('./../models/user');
const bcrypt   = require('bcrypt');

//GET '/login'
router.get('/', (req, res, next) => {
  res.render('login')
})

//POST '/login'
router.post('/', (req, res, next) => {
  const theUserName = req.body.username;
  const thePassword = req.body.password;

  if (theUserName === '' || thePassword === '') {
    console.log('empty');
    res.render('login', { errorMessage: 'Ups! You forget something... Please enter a username and a password!'});
    return;
  }

  User.findOne( { "username": theUserName })
    .then( user => {
      if (!user) {
        res.render('login', { errorMessage: 'Not an username!'});
        return;
      }

      const passwordCorrect = bcrypt.compareSync(thePassword, user.password);

      if (passwordCorrect) {
        req.session.currentUser = user;
        res.render('userpage', {title: user.username})
      }
      else {
        res.render('login', { errorMessage: 'Incorrect password'})
      }
    })
    .catch( (err) => console.log(err))

})


module.exports = router;