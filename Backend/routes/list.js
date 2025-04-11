const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
//Create
router.post("/addTask", async (req, res) => {
    try {
        const{title, body,label,status, email}= req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
        const list = new List({title, body,status,label, user:existingUser});
        await list.save().then(()=>res.status(200).json({list}));
        existingUser.list.push(list);
        existingUser.save();
        console.log(list)
    }
    } catch (error) {
      console.log(error);  
    }
});

//update
router.put("/updateTask/:id", async (req, res) => {
    try {
        const{title, label, body,status}= req.body;
        const list = await List.findByIdAndUpdate(req.params.id, {title, body,status,label}, );
        list.save().then(()=>res.status(200).json({message:"Task Updated"}));
    } catch (error) {
      console.log(error);  
    }
});
//delete
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const list = await List.findByIdAndDelete(req.params.id).then(()=>res.status(200).json({message:"Deleted Task"}));
    } catch (error) {
      console.log(error);  
    }
});

router.get("/getTask/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const list = await List.findById(id); // Fetch the task using the ID
    if (!list) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ list }); // Return the task data
  } catch (error) {
    console.error("Error fetching task:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});


//gettask
router.get("/getTasks/:id", async (req, res) => {
    const list = await List.find({ user: req.params.id })
      .populate("user");
    
      if (list.length == 0) {
        return res.status(404).json({ message: "No Task Found" });
      }
      return res.status(200).json({ list });
  });


module.exports = router;