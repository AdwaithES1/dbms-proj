const express = require("express");
const db = require("../db");

const router = express.Router();

// ROUTE 1: /api/fa/curreq
router.post("/curreq", async (req, res) => {
    const { faID, order } = req.body;
    console.log("FA ID FROM fa.js: ", faID); //testing
    try {

        // FETCHING STUDENTS UNDER THE LOGGED IN FA
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

        console.log(result2);
        
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

// ROUTE 2: /api/fa/setstatus
router.post("/setstatus", async (req, res) => {
    const { status, appNo } = req.body;

    try {

        // UPDATE application SET app_status = status WHERE app_id = appID
        const {data, error} = await db
        .from('application')
        .update({ app_status: status})
        .eq('app_no', appNo);

        console.log(req.body)
        console.log(data);
    } catch(err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }

    return res.status(200).send("Successfully Updated Application Status!")
})


// ROUTE 3: /api/fa/fetchhistory
router.post("/fetchhistory", async (req, res) => {
    const { faID, order } = req.body;
    console.log("FA ID FROM fa.js: ", faID); //testing
    try {

        // FETCHING STUDENTS UNDER THE LOGGED IN FA
        const {data: result1, error: err1 } = await db
        .from('student')
        .select('student_id')
        .eq('fa_id', faID);

        const studIDs = result1.map(e => e.student_id);
        console.log("Student ids: ", studIDs);

        // FETCHING STUDENT DETAILS OF THE ABOVE SELECTED STUDENTS 
        const { data: result2, error: err2 } = await db
        .from('application')
        .select('app_no, student_id, start_date, end_date, reason, leave_addr, app_status')
        .in('student_id', studIDs)
        .neq('app_status', 'Pending')
        .order('start_date', {ascending: order});

        console.log(result2);
        
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