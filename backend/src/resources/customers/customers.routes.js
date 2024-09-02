import express from "express"
import { loginCustomer, postCustomer, putCustomer, removeCustomer } from "./customers.controllers.js";

const customerRouter = express.Router();

customerRouter.route("/").post(postCustomer)
customerRouter.route("/:id").put(putCustomer)
customerRouter.route("/:id").delete(removeCustomer)
customerRouter.route("/login").post(loginCustomer)

export default customerRouter