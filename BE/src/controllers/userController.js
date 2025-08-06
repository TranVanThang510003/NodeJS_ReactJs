const {createUserService, loginService, getUserService, updateAccountTypeService} = require("../services/userService");

const createUser = async(req,res)=>{
    console.log(req.body);
    const { name, email, password,accountType } = req.body;

    const result = await createUserService(name, email, password,accountType);
    return res.status(result.statusCode).json(result);
}
const handleLogin = async(req,res)=>{
    console.log(req.body);
    const { email, password } = req.body;
    const data = await loginService(email, password)
    return res.status(201).json(data)
}
const getUser = async(req,res)=>{
    const data = await getUserService(req,res)
    return res.status(201).json(data)
}


const updateAccountType = async (req, res) => {
    try {
        const email = req.user.email; // Lấy từ middleware verifyToken
        const { accountType } = req.body;

        if (!['free', 'premium'].includes(accountType)) {
            return res.status(400).json({ message: 'Loại tài khoản không hợp lệ' });
        }

        const result = await updateAccountTypeService(email, accountType);
        return res.status(result.statusCode).json(result);
    } catch (error) {
        console.error('Lỗi khi cập nhật loại tài khoản:', error);
        return res.status(500).json({ message: 'Lỗi server' });
    }
};


module.exports = {
    createUser,
    handleLogin,
    getUser, updateAccountType,
};