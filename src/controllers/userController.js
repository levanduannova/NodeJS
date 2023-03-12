import userService from "../services/userServices";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errorCode: 1,
      message: "Missing input parameter !",
    });
  }

  let userData = await userService.handleUserLogin(email, password);

  //Check email
  //compare pass
  //return info
  //access_token jwt
  // console.log(password,email)
  let user1 = userData.user ? userData.user : {};

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errmessage,
    user: user1,
  });
};
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; // All, id
  let users = await userService.getAllUser(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};
let handleCreateUser = async (req, res) => {
  let mes = await userService.createNewUser(req.body);
  console.log(mes);
  return res.status(200).json(mes);
};
let handleDeleteUser = async (req, res) => {
  let idUser = req.body.id;
  if (idUser) {
    let mes = await userService.deleteUserData(idUser);
    return res.status(200).json(mes);
  } else {
    return res.status(200).json({
      mes: "Fall",
    });
  }
};
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateUser: handleCreateUser,
  handleDeleteUser: handleDeleteUser,
  handleEditUser: handleEditUser,
};
