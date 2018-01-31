const router = require('express').Router();
const passport = require('passport');
//Login route

router.get('/login', (req, res)=>{

    res.render('login', {user: req.user});
})

//logout route

router.get('/logout',(req, res)=>{
    req.logout();
    res.redirect('/');
})

// google login

router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

//Redirect route

router.get('/google/redirect',passport.authenticate('google'), (req, res)=> {
    res.redirect('/profile');
})
module.exports = router;
