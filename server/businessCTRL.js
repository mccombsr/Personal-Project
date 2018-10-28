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
    createBusiness: async(req, res) =>{
        console.log('createbusiness session user', req.session.user[0].users_id);
        const db = req.app.get(`db`);
        let newbusiness = await db.create_new_business([req.session.user[0].users_id]);
        res.sendStatus(200);
    },
    getBusinessData: async (req, res) => {
        console.log('req.params.id',req.params.id);
        const db = req.app.get(`db`);
        let foundbusiness = await db.get_business_info([req.params.id]);
        console.log(foundbusiness);
        res.send(foundbusiness);
        
    },
    deleteBusiness: async (req, res) => {
        console.log('look here for the delete params', req.params);
        var { businessID, usersID } = req.params
        var businessID = +businessID;
        var usersID = +usersID;
        console.log(`usersID: ${usersID}, businessID: ${businessID}`)

        const db = req.app.get('db');
        let deleteBusiness = await db.delete_business([businessID, usersID])
        if (!deleteBusiness) {
            console.log(`Business not deleted`)
            res.sendStatus(403);
        } else {
            console.log(`Business deleted successfully`)
            res.status(200).send('<script>alert("Account deleted successfully.")</script>');
        }
    },
    updateBusinessInfo: async (req, res) => {
        var { businessID } = req.params
        var businessID = +businessID;
        console.log(`businessID: ${businessID}`)
        var {businessName, businessPhone, businessEmail, businessBlurb, operatingZips} = req.body;
        console.log(`businessName: ${businessName}, businessPhone: ${businessPhone}, businessEmail: ${businessEmail}, businessBlurb: ${businessBlurb}, operatingZips: ${operatingZips}`)

        const db = req.app.get('db');
        let updateBusiness = await db.update_business_info([businessID, businessName, businessPhone, businessEmail, businessBlurb, operatingZips])
        res.status(200).send(updateBusiness);
    },
    searchByZip: async(req, res)=>{
        console.log(req.params);
        var {operatingZip} = req.params;
        console.log(operatingZip);
         
        const db = req.app.get(`db`);
        let searchZip = await db.search_by_zip([operatingZip])
        console.log(`searchZip: ${searchZip}`)
        res.send(searchZip);
    }

}



//NOTE FOR THE Q!!!!!
//Whenever I create a new account, the users data is not being sent to the front end, until they have been loged out and log back in. Once this has been done, there is never an issue again with receiving that data on the front end.
