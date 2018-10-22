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
    updateBa: async (req, res) => {
        let {event} = req.query;
        // console.log('look here first!!!',event)
        let {users_id} = req.session.user;
        // console.log(event);
        const db = req.app.get(`db`);
        let updateBa = await db.update_business_account([users_id, event])
        req.session.user = updateBa;
        // console.log('Look here second!!', updateBa)
        console.log('look here!!!',req.session.user)
        let business_account = req.session.user[0].business_account;
        console.log(business_account);
        res.status(200).send(business_account);

        // if(business_account === true){
        //     res.redirect(`/#/businessAccount`)
        // } else {
        //     res.redirect(`/#/customerAccount`);
        // }
    }
}