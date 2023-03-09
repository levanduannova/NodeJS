"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        // email: "fbsinon300101@gmail.com",
        // password: "123456",
        // firstName: "le",
        // lastName: "duan",
        // address: "Nghe An",
        // phoneNumber:"0941599945",
        // gender: 1,
        // image: "https://sequelize.org/img/logo.svg",
        // roleId:'ROLE',
        // keyRole:'R1',
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
