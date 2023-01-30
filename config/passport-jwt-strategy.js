const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JWTStrategy  = require('passport-jwt').Strategy;
const ExtraxtJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');
const User = require('../models/user');
let otps ={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:env.jwt_secret
}
passport.use(new JWTStrategy(otps, function(jwt_payload, done){

    User.findById(jwt_payload._id , function(err, user){
        if(err){console.log('Error in finding user in JWT');return;}
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })

}));
module.exports = passport;