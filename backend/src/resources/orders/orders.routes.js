import express from "express"
import { postOrder } from "./orders.controllers.js";

const orderRouter = express.Router();

orderRouter.route("/").post(postOrder)

export default orderRouter