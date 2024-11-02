const express = require("express");
const db = require("../db");

const router = express.Router();

const setCurrDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}


// ROUTE 1: /api/gate/insidecampus
router.post("/insidecampus", async (req, res) => {
    const { order } = req.body;

    try {

        // FETCHING ALL APPLICATION WITH ACCEPTED STATUS
        const {data, error } = await db
        .from('application')
        .select('app_no, student_id, start_date, end_date, reason, leave_addr')
        .eq('app_status', 'Approved')
        .order('start_date', {ascending: order});

        if (error) {
            console.error("Error fetching applications:", error);
            return res.status(500).json({ error: "Failed to fetch requests" });
        } else {
            console.log(data);
            return res.status(200).json(data);  // SENDING THE SELECTED SQL OUTPUT AS RESPONSE
        }

    } catch(err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
})

// ROUTE 2: /api/gate/checkout
router.post("/checkout", async (req, res) => {
    const { appNo } = req.body;
    console.log("App No from gate.js: ", appNo); //testing
    try {

        // SET STATUS TO "On Leave"
        const {data: data1, error: err1 } = await db
        .from('application')
        .update({ app_status: 'On Leave' })
        .eq('app_no', appNo);

        // SET CHECK OUT TIME
        const { data: data2, error: err2 } = await db
        .from('gateentry')
        .insert({out_date: setCurrDate(), app_no: appNo})

        console.log(data2);

        if (err1 || err2) {
            console.error("Error fetching applications:", err1 || err2);
            return res.status(500).json({ error: "Failed to fetch requests" });
        } else {
            console.log(data2);
            return res.status(200).json(data2);  // SENDING THE SELECTED SQL OUTPUT AS RESPONSE
        }

    } catch(err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
})

// ROUTE 3: /api/gate/outsidecampus
router.post("/outsidecampus", async (req, res) => {
    const { order } = req.body;

    try {

        // FETCHING ALL APPLICATIONS WITH "On Leave" STATUS
        const { data, error } = await db
        .from('application')
        .select(`
            app_no,
            student_id,
            end_date,
            reason,
            leave_addr,
            gateentry(out_date)
        `)
        .eq('app_status', 'On Leave')
        .order('end_date', { ascending: order });
        
        if (error) {
            console.error("Error fetching applications:", error);
            return res.status(500).json({ error: "Failed to fetch requests" });
        } else {
            console.log(data);
            return res.status(200).json(data);  // SENDING THE SELECTED SQL OUTPUT AS RESPONSE
        }

    } catch(err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
})

// ROUTE 4: /api/gate/checkin
router.post("/checkin", async (req, res) => {
    const { appNo } = req.body;
    console.log("App No from gate.js: ", appNo); //testing
    try {

        // FETCH END DATE FROM APPLICATION
        const {data: date, error: err1} = await db
        .from('application')
        .select('end_date')
        .eq('app_no', appNo);

        const endDate = new Date(date[0].end_date);  // Convert fetched end_date to Date object
        const currDate = new Date(setCurrDate());    // Convert current date string to Date object

        console.log("Expected End Date From DB: ", endDate); //testing
        console.log("Current Date: ", currDate); //testing
        const dateDiff = (endDate - currDate)/(1000 * 60); //Time left in minute

        // COMPARE CURRENT(CHECK IN) TIME WITH EXPECTED END DATE 
        console.log("Time Left: ", dateDiff, " minutes");

        let status = "";
        if (dateDiff >= 0) {
            status = "Expired";
        } else {
            status = "Late"
        }
        
        // SET STATUS TO status
        const {data: data1, error: err2 } = await db
        .from('application')
        .update({ app_status: status })
        .eq('app_no', appNo);

        // SET CHECK IN TIME
        const { data: data2, error: err3 } = await db
        .from('gateentry')
        .update({in_date: setCurrDate()})
        .eq('app_no', appNo);


        if (err1 || err2 || err3) {
            console.error("Error fetching applications:", err1 || err2 || err3);
            return res.status(500).json({ error: "Failed to fetch requests" });
        } else {
            return res.status(200).json(data2);  // SENDING THE SELECTED SQL OUTPUT AS RESPONSE
        }

    } catch(err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
})

// ROUTE 5: /api/gate/expired
router.post("/expired", async (req, res) => {
    const { order } = req.body;

    try {
        // FETCHING ALL APPLICATION WITH "Late" or "Expired" STATUS
        const { data, error } = await db
        .from('application')
        .select(`
            app_no, 
            student_id, 
            reason, 
            leave_addr, 
            app_status,
            gateentry(out_date, in_date)
        `)
        .in('app_status', ['Late', 'Expired'])
        .order('app_no', { ascending: order });

        if (error) {
            console.error("Error fetching applications:", error);
            return res.status(500).json({ error: "Failed to fetch requests" });
        } else {
            console.log(data); //testing
            console.log(data[0].gateentry)
            return res.status(200).json(data);  // SENDING THE SELECTED SQL OUTPUT AS RESPONSE
        }

    } catch(err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
})


module.exports = router;