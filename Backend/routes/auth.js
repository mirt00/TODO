const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
// Sign in

router.post("/signin", async (req, res) => {
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

        return res.status(201).json({ user: other });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;