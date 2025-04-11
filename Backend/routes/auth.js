const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Sign up

router.post("/signup", async (req, res) => {
    const { email, username, password } = req.body;
    console.log(req.body);

    try {
        // Optional: Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, username, password: hashedPassword });

        await user.save();
        
        // Exclude password from response
        const { password: pwd, ...other } = user._doc;

        return res.status(201).json({ success:true,user: other });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Exclude password before sending response
      const { password: pwd, ...userData } = user._doc;
  
      const token = jwt.sign(
        { email: user.email, id: user._id },  // payload
        "yourSecretKey",                      // secret key (keep safe!)
        { expiresIn: "1h" }                   // optional expiry
      );

      res.status(200).json({success:true, message: "Login successful", user: userData,token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  });


module.exports = router;

