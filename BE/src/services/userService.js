require("dotenv").config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const createUserService = async (name, email, password, accountType) => {
    try {
        const user= await User.findOne({email})
        if(user){
            console.log("Người dùng đã tồn tại!");
            return {
                success: false,
                statusCode: 400,
                message: "Người dùng đã tồn tại!",
            };
        }
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role: "HHH",
            accountType,
        });

        return {
            success: true,
            statusCode: 201,
            message: "Tạo người dùng thành công!",
            data: {
                name: newUser.name,
                email: newUser.email,
            },
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: "Đã xảy ra lỗi máy chủ.",
        };
    }
}
const loginService = async ( email,password) => {
    try {
         const user= await User.findOne({email:email});
         if(user){
             console.log(user)
             const isMatchPassword = await bcrypt.compare(password, user.password);
             if(!isMatchPassword){
                 return {
                     EC1:2,
                     EM:"Email/Password không tồn tại",
                 }
             }else{
                 const payload = {
                     userId: user._id,
                     email: user.email,
                     name: user.name,
                     accountType: user.accountType,
                 }
                 const accessToken = jwt.sign(
                     payload,
                     process.env.JWT_SECRET,
                     {
                         expiresIn: process.env.JWT_EXPIRE,
                     });
                 return {
                     EC:0,
                     accessToken,
                     user:{
                         email:user.email,
                         name:user.name,
                     }
                 }

             }
         }else{
             return {
                 EC1:1,
                 EM:"Email/Password không tồn tại",
             }
         }

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllUserService = async () => {
    try {

        let result = await User.find ({}).select("-password")
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const getUserService = async (email) => {
    try {
        const user = await User.findOne({ email }).select("-password"); // bỏ password đi
        if (!user) {
            return {
                success: false,
                statusCode: 404,
                message: "Người dùng không tồn tại!",
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: "Lấy thông tin người dùng thành công!",
            data: user,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            statusCode: 500,
            message: "Lỗi server khi lấy thông tin người dùng.",
        };
    }
};


const updateAccountTypeService = async (email, accountType) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return {
                success: false,
                statusCode: 404,
                message: "Người dùng không tồn tại!",
            };
        }

        user.accountType = accountType;
        await user.save();

        return {
            success: true,
            statusCode: 200,
            message: "Cập nhật loại tài khoản thành công!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                accountType: user.accountType,
            },
        };
    } catch (error) {
        console.log("Lỗi cập nhật loại tài khoản:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Lỗi server khi cập nhật loại tài khoản.",
        };
    }
};


module.exports = {
    createUserService,
    loginService,
    getUserService,
    getAllUserService,
    updateAccountTypeService,
}











