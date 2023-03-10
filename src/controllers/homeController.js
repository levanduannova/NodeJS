import db from "../models/index";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs",{
        data: JSON.stringify(data)
    });
  } catch(e) {
    console.log(e)
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};
let getCRUD = (req,res)=>{
  return res.render("./crud.ejs");
}
// // object: {
// //     key: '',
// //     value: ''
// // }
let postCRUD = async(req,res)=>{
  let mes = await CRUDService.createNewUser(req.body)
  console.log(mes)
  return res.send("Post crud form sv")
}
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
};
