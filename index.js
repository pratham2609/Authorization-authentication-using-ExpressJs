const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;
app.use(express.json());
const connectDatabase = require("./config/database")
connectDatabase();

//  import routes and mount
const user = require("./routes/user")
app.use("/api/v1", user);
app.listen(port, () => {
    console.log("app is running at port 4000")
})