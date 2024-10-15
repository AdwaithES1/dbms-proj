const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') })

connectDB().catch(console.dir);
const app = express();
const port = process.env.PORT || 5000; //3000 will be used by react
const router = express.Router()

app.use(express.json()) //if not used, HTTP GET output would be undefined
app.use(cors())
app.use(express.urlencoded({extended: false}))

app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
                                                    