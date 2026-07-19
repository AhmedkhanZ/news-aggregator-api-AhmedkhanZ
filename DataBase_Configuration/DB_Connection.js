const mongoose = require('mongoose');
require("dotenv").config();

const mongoDB_URI = process.env.DB_URL

async function Mongodb_connection()
{
    try{

        await mongoose.connect(mongoDB_URI);
        console.log("Cluster Connection Established Successfully.............");
        // res.send("heloow eolf")
    }
    catch(err)
    {
        console.error("DB/Cluster Connection Failed............");
    }
}

module.exports = Mongodb_connection;