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
        const {userID, businessID} = req.params;
        console.log(`userID: ${userID}, businessID: ${businessID}`)
        const {newReview} = req.body;
        console.log(`newReview: ${newReview}`);

        const db = req.app.get(`db`);
        let createdReview = await db.create_new_review([businessID, userID, newReview]);
        res.sendStatus(200);
        console.log(`review submitted successfully`)
    },
    reviewsByBusiness: async(req, res) =>{
        let {businessID} = req.params;
        console.log(`businessID: ${businessID}`);

        const db = req.app.get(`db`);
        let businessReviews = await db.reviews_by_business([businessID]);
        res.send(businessReviews);
    },
     reviewsByCustomer: async(req, res)=>{
         let {usersID} = req.params;
         console.log(`usersID: ${usersID}`);

         const db = req.app.get(`db`);
         let customerReviews = await db.reviews_by_customer([usersID]);
         res.send(customerReviews);
     },
     deleteReview: async(req, res)=>{
         let {reviewID, usersID} = req.params
         console.log(reviewID);
         console.log(usersID);

         const db = req.app.get(`db`);
         let deleteReview = await db.delete_review([reviewID, usersID]);
         console.log(`Review deleted`)
         res.send(deleteReview)
     }
}


