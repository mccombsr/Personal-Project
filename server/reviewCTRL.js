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
    newReview: async(req, res)=>{
        console.log(`new Review endpoint hit!!!`)
    }
}


