const express = require("express");
const {googleread, googlewrite}= require("./googleapi.js")
const cors = require("cors");
const dotenv = require("dotenv")
const app = express();
dotenv.config();
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.post("/", async (req, res) => {
    var requrl = req.body.url;
    try {
        const getRows = await googleread(requrl);
        res.send(getRows);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/submit", async (req,res)=>{
    var requrl = req.body.url;
    var topic = req.body.topic;
    console.log(requrl, topic);
    try {
        const getResult = await googlewrite(requrl, topic);
        res.send(getResult);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})
app.listen(process.env.PORT||3000, ()=>{
    console.log("listening to requests");
})