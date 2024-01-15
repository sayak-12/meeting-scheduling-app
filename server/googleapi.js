const {google}= require("googleapis");

const googleread= async (requrl)=>{
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const spreadsheetId = "1rLRdmlS5d4sjyqcWTq6x5qLZN8ot91kb1Do8-nsZrb0";
    const client = await auth.getClient();
    const googleSheets = google.sheets({version:"v4", auth: client});
    
    const getRows = await googleSheets.spreadsheets.values.get({
        auth, 
        spreadsheetId,
        range : `${requrl}`
    })
    return getRows;
} 


const googlewrite = async (requrl, topic)=>{
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const spreadsheetId = "1rLRdmlS5d4sjyqcWTq6x5qLZN8ot91kb1Do8-nsZrb0";
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const range = `${requrl}`;
    const updateValues = await googleSheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[topic]]
        }
    });
    return `Updated value in ${range} to: ${topic}`;
}
module.exports = {googleread, googlewrite}

