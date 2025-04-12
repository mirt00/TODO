const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors");
const auth = require("./routes/auth")
const list = require("./routes/list")
app.use(cors({
    origin: "http://localhost:5173", // Allow your frontend origin
    credentials: true // Optional: if you're using cookies/auth
  }));
app.get("/", (req, res) => {
    res.send("hello");
});
app.use(express.json())
app.use("/api/v",list);
app.use("/api/v1", auth);

app.listen(3000, async () => {
    await mongoose.connect("mongodb+srv://bhudathokiamrit:Nopassword%40123@cluster0.flo6veb.mongodb.net/ToDodb")
    .then(()=>{
        console.log("Database Connected");
    });
    console.log("Server Started");
});
