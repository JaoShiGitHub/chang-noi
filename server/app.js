import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./apps/auth.js";
import menu from "./apps/menu_routers.js";
import customer from "./apps/customer_routers.js";
import admin from "./apps/admin_routers.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRouter); // Login
app.use("/menu", menu);
app.use("/customer", customer);
app.use("/admin", admin);

app.listen(4000, () => {
  console.log("Server is listening at port 4000");
});
