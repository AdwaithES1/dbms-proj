const express = require("express");
const db = require("../db");
const bcrypt = require("bcryptjs");

const router = express.Router();

//ROUTE 1: /api/auth/login
router.post("/login", async (req, res) => {
    const { userId, password } = req.body;
    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    console.log("Hash of input user: ", hashedPass); //testing

    try {
        const { data, error } = await db
            .from("users")
            .select("password, user_type, username")
            .eq("user_id", userId);

        console.log(data);

        console.log("Hashed pass from db: ", data[0].password); //testing
        console.log(data[0].user_type); //testing

        const c = await bcrypt.compare(password, data[0].password);

        if (c) {
            console.log("PASSWORD MATCHES!");
            res.json({
                match: true,
                type: data[0].user_type,
                username: data[0].username
            });
        } else {
            console.log("PASSWORD DOESNT MATCH!");
            res.json(false);
        }
    } catch (err) {
        console.error("Error: ", err);
    }
});

//PROBABLY WONT BE REQUIRED
// //ROUTE 2: /api/auth/getuser
// router.get("/getuser", async (req, res) => {
//     try {
//         q = "SELECT * FROM users WHERE password = '$2a$10$zHIeiFKAi1Ij8IVD1.T0mOplA4ohaK6GpHdeoc7CuxIXaP/m02z6.';";
//         const [rows] = await db.query(q);
//         res.json(rows);

//         console.log(rows) //testing
//     } catch (err) {
//         console.error("Error: ", err);
//     }
// });

module.exports = router;
