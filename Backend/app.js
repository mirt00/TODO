const express = require("express");
const app = express();
const mongoose = require("mongoose")

const auth = require("./routes/auth")

app.get("/", (req, res) => {
    res.send("hello");
});
app.use(express.json())
app.use("/api/v1", auth);

app.listen(3000, async () => {
    await mongoose.connect("mongodb+srv://bhudathokiamrit:Nopassword%40123@cluster0.flo6veb.mongodb.net/ToDodb")
    .then(()=>{
        console.log("Database Connected");
    });
    console.log("Server Started");
});
