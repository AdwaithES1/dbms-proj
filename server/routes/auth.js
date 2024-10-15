const express = require('express')
const router = express.Router()

//ROUTE 1: api/auth/login
router.post("/login",(req, res) => {
    const {username, password} = req.body;

    console.log(username, password);
    
    //TODO
    //SELECT USERNAME FROM USERS WHERE PASSWORD = GIVEN PASSWORD

})

module.exports = router;