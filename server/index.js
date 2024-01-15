const express = require("express");
const {google}= require("googleapis");
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.post("/", async (req, res)=>{
    var requrl = req.body.url;
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const spreadsheetId = "1rLRdmlS5d4sjyqcWTq6x5qLZN8ot91kb1Do8-nsZrb0";
    const client = await auth.getClient();
    const googleSheets = google.sheets({version:"v4", auth: client});
    const metadata = await googleSheets.spreadsheets.get({
        auth, 
        spreadsheetId
    })

    const getRows = await googleSheets.spreadsheets.values.get({
        auth, 
        spreadsheetId,
        range : `${requrl}`
    })
    res.send(getRows);
})

app.post("/submit", (req,res)=>{
    var requrl = req.body.url;
    var topic = req.body.topic;
    console.log(requrl, topic);
    res.send(topic);
})
app.listen(3000, ()=>{
    console.log("listening to port 3000");
})