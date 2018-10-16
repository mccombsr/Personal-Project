require('dotenv').config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./controller');


const app = express();
app.use(bodyParser.json());

// destructure from process.env
const {
    SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    SECRET
} = process.env;

massive(CONNECTION_STRING)
.then((dbInstance)=>{
    app.set('db', dbInstance);
    console.log('DB says helo?')
})
.catch((err)=>{
    console.log(err);
})

//middleware
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

let authBypass = async (req, res, next)=>{
    console.log(process.env.NODE_ENV);
    if(process.env.NODE_ENV){
        const db = req.app.get(`db`);
        let user = await db.session_user();
        req.session.user = user[0];
        next();
    } else {
        next();
    }
}

//endpoints
app.get(`/auth/callback`, async (req, res) => {
    // get code from req.query.code
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    }
    // post request with code for token
    let tokenRes = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);
    // use token to get user data
    let userRes = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${tokenRes.data.access_token}`)

    console.log(userRes.data);
    let { email, picture, sub, name } = userRes.data;
    // check if that user already exists in our database
    const db = app.get(`db`);
    let foundUser = await db.find_user([sub]);
    if (foundUser[0]) {
        // found user existing in the db, put returned user on session
        req.session.user = foundUser[0];
    } else {
        // no user was found by the google id, create user in db
        let createdUser = await db.create_user([name, sub, picture, email]);
        req.session.user = createdUser[0];
    }
    res.redirect('/#/home')
})

app.get('/api/user-data', authBypass, (req, res)=>{
    if(req.session.user){
        res.status(200).send(req.session.user)
    } else {
        res.status(401).send('Go log in!');
    }
})

app.get(`/auth/logout`, (req, res)=>{
    req.session.destroy();
    res.redirect(`http://localhost:3000/#/`)
})



app.listen(SERVER_PORT, ()=>{
    console.log(`Port ${SERVER_PORT} is listening to your gibberish...`)
});