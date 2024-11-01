const express = require("express");
const db = require("../db");

const router = express.Router();

// ROUTE 1: /api/warden/fetchhostel
router.post("/fetchhostel", async (req, res) => {
    const { wardenID, order } = req.body;
    console.log("Warden ID FROM fa.js: ", wardenID); //testing
    try {

        // FETCHING HOSTEL NAME UNDER THE LOGGED IN WARDEN
        const {data: result1, error: err1 } = await db
        .from('student')
        .select('student_id')
        .eq('fa_id', faID);

        const studIDs = result1.map(e => e.student_id);
        console.log("Student ids: ", studIDs);

        // FETCHING STUDENT DETAILS OF THE ABOVE SELECTED STUDENTS 
        const { data: result2, error: err2 } = await db
        .from('application')
        .select('app_no, student_id, start_date, end_date, reason, leave_addr')
        .in('student_id', studIDs)
        .eq('app_status', 'Pending')
        .order('start_date', {ascending: order});

        if (err1 || err2) {
            console.error("Error fetching applications:", err1 || err2);
            return res.status(500).json({ error: "Failed to fetch requests" });
        } else {
            console.log(result2);
            return res.status(200).json(result2);
        }

    } catch(err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
})

module.exports = router;