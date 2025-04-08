const mongoose = require("mongoose");

const conn = async (req,res)=>{
    try{
    await mongoose.connect("mongodb+srv://bhudathokiamrit:Nopassword%40123@cluster0.flo6veb.mongodb.net/")
    .then(()=>{
        console.log("Connected");
    
    });
}catch(error){
   res.status(400).json({
    message: "Not Connected",
   })
}
};
conn();