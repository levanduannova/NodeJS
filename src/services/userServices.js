import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

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
let getAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "aaa";
      if (!userId) {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          attributes: {
            exclude: ["password"],
          },
          where: {
            id: userId,
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          message: "Trung email",
        });
      }
      else {
        let hashPassword = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender === "1" ? true : false,
          // image: DataTypes.STRING,
          roleId: data.roleId,
          // positionId: DataTypes.STRING,
        });
        resolve({
          errCode: 0,
          message: "OK",
          data,
        });
      }

    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hash = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUserData = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: idUser } });
      if (!user) {
        resolve({
          errCode: 1,
          message: "Khong ton tai",
          idUser,
        });
      }
      await db.User.destroy({
        where: { id: idUser },
      });
      resolve({
        errCode: 0,
        message: "Delete OK",
        idUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          message: "Khong cos id",
          data,
        });
      } else {
        let user = await db.User.findOne({
          where: {
            id: data.id,
          },
        });
        if (user) {
          user.firstName = data.firstName;
          user.lastName = data.lastName;
          user.address = data.address;

          await user.save();
          resolve({
            errCode: 0,
            message: "da sua",
            data,
          });
        } else {
          resolve({
            errCode: 2,
            message: "Khong sua dc ",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUser: getAllUser,
  createNewUser: createNewUser,
  deleteUserData: deleteUserData,
  updateUserData: updateUserData,
};
