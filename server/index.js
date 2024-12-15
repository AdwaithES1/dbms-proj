const express = require('express');
const db = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// MIDDLEWARES
app.use(express.json()); //used to parse incoming request send by client
app.use(cors({
    origin: 'https://plsletmego.onrender.com',
}));

port = process.env.PORT || 5000;

// ROOT PAGE
app.get("/", (req, res) => {
    res.json("Welcome Back!");
});

//used to import sub-routes
app.use("/api/auth", require('./routes/auth'));
app.use("/api/student", require('./routes/student'));
app.use("/api/fa", require('./routes/fa'));
app.use("/api/warden", require('./routes/warden'));
app.use("/api/admin", require('./routes/admin'));
app.use("/api/gate", require('./routes/gate'));

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});