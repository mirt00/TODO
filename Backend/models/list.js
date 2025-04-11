 const mongoose = require("mongoose");
const user = require("./user");
 const listSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: "Pending",
        required: true,
    },
    label:{
        type: String,
        default: "Home",
        required: true,
    },
    user:[
        {
        type: mongoose.Types.ObjectId,
        ref: "User",
        }
    ],

 });
 module.exports = mongoose.model("List", listSchema);