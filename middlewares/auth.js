// authentication , isStudent , isAdmin
const jwt = require("jsonwebtoken")
require("dotenv").config()


// 3 parameters => req,res and next for traversing on middlewares
exports.auth = async (req, res, next) => {
    try {
        // extract jwt token
        // 1st way
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            })
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                success: false,
                message: "Token invalid"
            }) 
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Failed"
        })
    }
}
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route not allowed to students"
            })
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route not allowed to admins"
            })
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Something went wrong"
        })
    }
}