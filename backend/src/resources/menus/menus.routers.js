import express from "express"
import { getRestaurantMenu, postRestaurantMenu, putRestaurantMenu, removeRestaurantMenu } from "./menus.controllers.js";

const menuRouter = express.Router();

menuRouter.route("/").post(postRestaurantMenu)
menuRouter.route("/:id").put(putRestaurantMenu)
menuRouter.route("/:id").delete(removeRestaurantMenu)
menuRouter.route("/:id").get(getRestaurantMenu)

export default menuRouter