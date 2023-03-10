import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectdb";
// import cors from "cors"
require("dotenv").config();

let app = express();
// app.use(cors({origin:true}))
//config app
let cors = require('cors');    
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Add headers before the routes are defined
viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(port, () => {
  //callback
  console.log(
    "Backend Nodejs is runing on the port : http://localhost:" + port
  );
});
