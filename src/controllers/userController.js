
import userService from "../services/userServices"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.status(500).json({
            errorCode : 1,
            message: "Missing input parameter !"
        })

    }

    let userData = await userService.handleUserLogin(email,password)

    //Check email
    //compare pass
    //return info
    //access_token jwt
    // console.log(password,email)
    let user1 = userData.user ? userData.user : {}

    return res.status(200).json({
        errCode : userData.errCode,
        message : userData.errmessage,
        user: user1
    })
};
module.exports = {
  handleLogin: handleLogin,
};
