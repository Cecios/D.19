const express = require('express');
const github = express.Router();
const GitHubStrategy = require('passport-github2').Strategy
const jwt = require('jsonwebtoken')
const passport = require('passport')
const session = require('express-session')

require('dotenv').config()

github.use(
    session({
        secret: process.env.GITHUB_CLIENT_SECRET,
        resave: false,
        saveUninitialized: false,
    })
)
passport.use(passport.initialize())
passport.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user,done)=> {
    done(null, user)
})
passport.use(
    new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CLIENT_URL,
    },(accessToken, refreshToken, profile,done) => {
        console.log(profile);
        return done(null, profile)
    })
)
github.get('/auth/github', passport.authenticate('github', {scope: ['user: email']}), (request,response)=> {
    const redirectUrl = `http://localhost:3000/success?user=${encodeURIComponent(JSON.stringify(request.user))}`
    response.redirect(redirectUrl)

//serve per essere reinderizzati da google su un altro endpoint del nostro server quando il provider ci invierà i dati dell'utente
github.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/'}),(request,response)=>{
    const user = request.user;
    console.log('USER LOG: ', user);
    const token = jwt.sign(user, process.env.SECRET_KEY)
    const redirectUrl = `http://localhost:3000/success?token=${encodeURIComponent(token)}`
    response.redirect(redirectUrl)
})
}) 
github.get('/success', (request,response) => {
    response.redirect(`http://localhost:3000/home`)
})
module.exports = github;