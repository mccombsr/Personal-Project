require('dotenv').config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const bodyParser = require('body-parser');
const massive = require('massive');
const userCTRL = require('./userCTRL');
const businessCTRL = require('./businessCTRL');
const reviewCTRL = require('./reviewCTRL');


const app = express();
app.use(bodyParser.json());
app.use( express.static( `${__dirname}/../build` ) );



// destructure from process.env
const {
    SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    SECRET,
    AUTH_PROTOCAL
} = process.env;

massive(CONNECTION_STRING)
    .then((dbInstance) => {
        app.set('db', dbInstance);
        console.log('DB says "House keeping!"')
    })
    .catch((err) => {
        console.log(err);
    })

//middleware
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

// let authBypass = async (req, res, next)=>{
//     console.log(process.env.NODE_ENV);
//     if(process.env.NODE_ENV){
//         const db = req.app.get(`db`);
//         let user = await db.session_user();
//         req.session.user = user[0];
//         next();
//     } else {
//         next();
//     }
// }

//endpoints
app.get(`/auth/callback`, async (req, res) => {
    // get code from req.query.code
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `${AUTH_PROTOCAL}://${req.headers.host}/auth/callback`
    }
    // post request with code for token
    try {
        var tokenRes = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);
    }
    catch (err) {
        console.log(err)
    }
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
        console.log(`this is the new session after createdUser runs`, req.session.user)
    }

    //Show what info is coming back from the db
    console.log(req.session.user)

    // if else statement to determine where to send the user.
     if( req.session.user.business_account === true){
         console.log(`redirect to business account`)
         res.redirect('/#/businessAccount')
        //  .send(req.session.user)
     } else if (req.session.user.business_account === false){
         console.log(`redirect to home page`)
         res.redirect('/#/home')
        //  .send(req.session.user)
     } else {
         console.log(`choose user type`)
         res.redirect('/#/accountSetup')
        //  .send(req.session.user)
     }
    
})

    //Insert for authByPass authBypass,
app.get('/api/user-data',  (req, res) => {
    if (req.session.user) {
        res.status(200).send(req.session.user)
    } else {
        res.status(401).send('Go log in!');
    }
})

app.get(`/auth/logout`, (req, res) => {
    req.session.destroy();
    console.log(`session destroyed`)
    res.redirect(process.env.FRONTEND_PORT)
})


//user account endpoints
app.put('/api/updateba', userCTRL.updateBa);
app.delete(`/api/users/:id`, userCTRL.deleteUser);
app.put(`/api/users/:id`, userCTRL.updateUserInfo);

//business account endpoints
app.put(`/api/create-business`, businessCTRL.createBusiness);
app.get(`/api/business-data/:id`, businessCTRL.getBusinessData);
app.put(`/api/update-business-info/:businessID`, businessCTRL.updateBusinessInfo)
app.delete(`/api/delete-business/:businessID/:usersID`, businessCTRL.deleteBusiness);

//searchbar endpoint
app.get(`/api/zip-search/:operatingZip`, businessCTRL.searchByZip);

//review endpoints
app.post(`/api/submit-review/:userID/:businessID`, reviewCTRL.newReview);
app.get(`/api/business-reviews/:businessID`, reviewCTRL.reviewsByBusiness);
app.get(`/api/customer-reviews/:usersID`, reviewCTRL.reviewsByCustomer);
app.delete(`/api/delete-review/:reviewID/:usersID`, reviewCTRL.deleteReview);



app.listen(SERVER_PORT, () => {
    console.log(`Port ${SERVER_PORT} is here for all your cleaning needs...`)
});