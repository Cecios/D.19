const express = require('express');
const gitHub = express.Router();
const strategy = require("passport-github2").Strategy;
const passport = require('passport');
require("dotenv").config();
const session = require("express-session");
const jwt = require('jsonwebtoken');

gitHub.use(
    session({
        secret:process.env.GITHUB_CLIENT_SECRET,
        resave: false,
        saveUninitialized: false
    })
)

passport.use(passport.initialize())
passport.use(passport.session())

passport.serializeUser((user,done) => {
    done(null, user)
})
passport.deserializeUser((user,done) => {
    done(null, user)
})

passport.use(
    new strategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile)
    })
)

gitHub.get("/auth/github", passport.authenticate('github',{scope: ['user:email']}),(request, response) => {
    const user = request.user
    const redirectURL = `http://localhost:3000/success?user=${encodeURIComponent(JSON.stringify(user))}`
    response.redirect(redirectURL)
})
gitHub.get("/auth/github", passport.authenticate('github',{failureRedirect: '/'}),(request, response) => {
    const user = request.user
    const token = jwt.sign(user, process.env.SECRET_KEY)

    const redirectURL = `http://localhost:3000/success?token=${encodeURIComponent(token)}`
    response.redirect(redirectURL)
})  
gitHub.get("/success", (request,response) => {
    response.redirect("/home")
})
module.exports = gitHub;
