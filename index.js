const express = require('express')
const cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const path = require("path");


const authRoute = require('./routes/auth.routes')
const productRoute = require('./routes/tasks.routes')


const app = express()
const PORT = process.env.PORT || 3000


app.use(cors())
app.use(express.json())

app.use(authRoute)
app.use(productRoute)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});




app.listen(PORT, () => {
    console.log('SERVER RUNNING AT: http://localhost:' + PORT);
    
})
