import db from "../models/index";
import bcrypt from "bcryptjs";
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        // coparepass
        let user = await db.User.findOne({
          attributes: ["email", "password", "roleID"],
          where: {
            email: email,
          },
          raw: true,
        });

        if (user) {
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errmessage = "OK";
            delete user.password;
            userData.user = user; // Hien trhong tin user
          } else {
            userData.errCode = 3;
            userData.errmessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errmessage = "Tai khoan khong ton tai ";
        }
      } else {
        // return error
        userData.errCode = 1;
        userData.errmessage = "Mail khong ton tai ";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
};
