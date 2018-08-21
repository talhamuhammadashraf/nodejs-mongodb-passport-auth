const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new jwtStrategy(opts,(jwt_payload, done)=>{
        console.log(jwt_payload.doc);
        User.getUserById(jwt_payload.doc._id,(err,user)=>{
            if(err){
                return done(err,false)
            }
            if(user){
                return done(null ,user)
            }
            else{
                return done(null,false)
            }
        })
    }))
}