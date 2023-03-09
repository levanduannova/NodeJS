import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/about', homeController.getAboutPage);
  router.get('/crud', homeController.getCRUD);
  router.post('/post-crud', homeController.postCRUD);
//   router.get("/", (res, req) => {
//     return req.send("Xin chào các bạn ");
//   });
  router.get("/duan", (res, req) => {
    return req.send("Duan ");
  });

  return app.use("/", router);
};

module.exports = initWebRoutes;
