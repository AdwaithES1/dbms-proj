const express = require("express");
const db = require("../db");

const router = express.Router();

// ROUTE 1: /api/warden/fetchcurr
router.post("/fetchcurr", async (req, res) => {
    const { wardenID, order } = req.body;
    console.log("Warden ID FROM warden.js: ", wardenID); //testing
    try {

        // FETCHING HOSTEL NAME UNDER THE LOGGED IN WARDEN
        const {data: hostelName, error: err1 } = await db
        .from('warden')
        .select('hostel_name')
        .eq('warden_id', wardenID);

        // FETCHING STUDENT NAME UNDER THE SELECTED HOSTEL
        const {data: result1, error: err2 } = await db
        .from('student')
        .select('student_id')
        .eq('hostel_name', hostelName[0].hostel_name);

        const students = result1.map(e => e.student_id);
        console.log("Students: ", students); //testing

        // FETCHING STUDENT DETAILS OF THE ABOVE SELECTED STUDENTS 
        const { data: result2, error: err3 } = await db
        .from('application')
        .select('app_no, student_id, start_date, end_date, reason, leave_addr, app_status')
        .in('student_id', students)
        .neq('app_status', 'Pending')
        .order('start_date', {ascending: order});

        if (err1 || err2 || err3) {
            console.error("Error fetching applications:", err1 || err2 || err3);
            return res.status(500).json({ error: "Failed to fetch requests" });
        } else {
            console.log(result2);
            return res.status(200).json(result2);  // SENDING THE SELECTED SQL OUTPUT AS RESPONSE
        }

    } catch(err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
})

// ROUTE 2: /api/warden/fetchhostel
router.post("/fetchhostel", async (req, res) => {
    const { wardenID } = req.body;
    console.log("Warden ID FROM fa.js: ", wardenID); //testing
    try {

        // FETCHING HOSTEL NAME UNDER THE LOGGED IN WARDEN
        const {data: hostelName, error: err1 } = await db
        .from('warden')
        .select('hostel_name')
        .eq('warden_id', wardenID);

        console.log("Hostel Name: ", hostelName);

        // FETCHING DETAILS OF THE ABOVE SELECTED HOSTEL
        const { data: result2, error: err2 } = await db
        .from('hostel')
        .select('hostel_name, strength, on_leave')
        .eq('hostel_name', hostelName[0].hostel_name);

        console.log(result2);

        if (err1 || err2) {
            console.error("Error fetching applications:", err1 || err2);
            return res.status(500).json({ error: "Failed to fetch requests" });
        } else {
            console.log(result2);
            return res.status(200).json(result2);  // SENDING THE SELECTED SQL OUTPUT AS RESPONSE
        }

    } catch(err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
})

module.exports = router;