const User = require("../models/TempUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register Controlller
const registerUser = async(req,res)=>{
    try {
        const {username , email , password , role } = req.body
        const ExistingUser = await User.findOne({$or:[ {username}, {email}] })
        if(ExistingUser){
            return res.status(400).json({
                success: false,
                message:
                  "User is already exists either with same username or same email. Please try with a different username or email",
              });
        }
    
    const hashedPassword = await bcrypt.hash(password , 10)

    const user = await User.create({
        username,
        email,
        password : hashedPassword,
        role : role || "user"
    })
    await user.save()
    if(user){
        return res.status(201).json({ 
            success: true,
            message: "User registered successfully!"
         })
    }else {
         res.status(400).json({
            success : false,
            message : "Unable to register! Try again !"
         })
    }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error! Please try again." });
    }
}

const loginUser = async(req,res)=>{
    try {
        const {username , password} = req.body
        const user = await User.findOne({username})

       // Check if user Exists
        if(!user){
            return res.status(400).json({
                success: false,
                message: `User doesn't exists`,
              });
        }
       // Check is Password correct or not
        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
        return res.status(400).json({
            success: false,
            message: `User doesn't exists`,
          })
        }
        // Create User token
        const accessToken = jwt.sign(
            {
                userId : user._id,
                username : user.username,
                role : user.role
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30m",
            }
        )
        res.status(200).json({
            success: true,
            message: "Logged in successful",
            accessToken,
          });
    } catch (error) {
     console.error(error);
    res.status(500).json({ success: false, message: "Server error! Please try again." });
    }
}

const changePassword = async(req,res) =>{
    try {
        const {email , oldPassword , newPassword} = req.body
        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        // compare the password
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch){
            return res.status(400).json({ success: false, message: "Old password is incorrect!" });
        }
       // Hashing the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()

        res.status(200).json({ success: true, message: "Password changed successfully!" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error! Please try again." })
    }
}


module.exports = {registerUser, loginUser,changePassword}