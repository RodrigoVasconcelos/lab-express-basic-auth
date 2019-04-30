const express     = require('express');
const router      = express.Router();
const User        = require('./../models/user');

const bcrypt      = require('bcrypt');
const saltRounds  = 10;


//POST '/signup'
router.post('/', (req, res, next) => {
  const { username, password } = req.body;
  
  console.log(username, password);
  
  //check if the ursername and password field are field
  if (username === '' || password === '') {
    console.log('empty');
    res.render('signup', { errorMessage: 'Ups! You forget something... Please enter a username and a password!'});
    return;
  }
  
  User.findOne ({ username })
  .then( (user) => {
    if ( user !== null ) {
      res.render('signup' , { errorMessage: 'Oh! The username already exists!!'})
      return;
    }
    
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt)
    
    User.create({ username, password: hashedPassword })
    .then( () => {
      console.log('hey');
      res.redirect('/')})
    .catch( (err) => console.log(err))
  })
  .catch( (err) => next(err));
})

//GET '/signup'
router.get('/', (req, res, next) => {
  res.render('signup')
})

module.exports = router;