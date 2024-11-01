const express = require("express");
const db = require("../db");

const router = express.Router();

// ROUTE 1: /api/admin/fetchall
router.post("/fetchall", async (req, res) => {
    const { order } = req.body;
    
    console.log("FROM ADMIN")
    try {

        // FETCHING ALL APPLICATION DETAILS
        const { data, error } = await db
        .from('application')
        .select('app_no, student_id, start_date, end_date, reason, leave_addr, no_of_working_days, app_status')
        .order('app_no', {ascending: order});

        if (error) {
            console.error("Error fetching applications:", error);
            return res.status(500).json({ error: "Failed to fetch requests" });
        } else {
            console.log(data);
            return res.status(200).json(data);
        }

    } catch(err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
})

module.exports = router;