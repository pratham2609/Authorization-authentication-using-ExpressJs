const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = require("../models/users")

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await userSchema.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }
        //secure pass
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "error in creating password"
            })
        }
        const user = await userSchema.create({
            name, email, password: hashedPassword, role
        })
        return res.status(200).json({
            success: true,
            message: "User Created Successfully"
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err

        })
    }
}