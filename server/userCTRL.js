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
        console.log('look here first!!!',event)
        let {users_id} = req.session.user;
        console.log(event);
        const db = req.app.get(`db`);
        let updateBa = await db.update_business_account([users_id, event])
        req.session.user = updateBa;

        let business_account = req.session.user[0].business_account;
        console.log(business_account);
        res.status(200).send(business_account);
    },
    deleteUser: async (req, res) =>{
        console.log('look here for the delete params',req.params);
        var {id} = req.params
        var id = +id;
        console.log('this is id!!!', id)
        const db = req.app.get('db');
        let deleteUser = await db.delete_user([id])
        if(!deleteUser){
            console.log(`User not delted`)
            res.sendStatus(403);
        } else {
            console.log(`User deleted successfully`)
            res.status(200).send('<script>alert("Hello")</script>');
        }
    },
    updateUserInfo: async (req, res)=>{
        console.log('this is params', req.params);
        console.log(`this is the body`, req.body);
        var {id} = req.params
        var id = +id;
        console.log('this should be a number', id)
        var {name, phone, email} = req.body;
        const db = req.app.get('db');
        let updateUser = await db.update_users_info([id, name, phone, email])
        res.status(200).send(updateUser);
    }

    }



//NOTE FOR THE Q!!!!!
//Whenever I create a new account, the users data is not being sent to the front end, until they have been loged out and log back in. Once this has been done, there is never an issue again with receiving that data on the front end.
