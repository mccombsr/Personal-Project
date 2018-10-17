require('dotenv').config();
const axios = require('axios')

const {
    SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    SECRET
} = process.env;

module.exports = {
    userlogin: async (req, res) => {
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
    }
}