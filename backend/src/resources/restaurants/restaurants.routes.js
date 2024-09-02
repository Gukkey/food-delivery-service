import express from "express"
import { getAllRestaurants, getRestaurantById, postRestaurant } from "./restaurants.controllers.js";


/**
 * This is a router
 */
const restaurantRouter = express.Router();

restaurantRouter.route("/").post(postRestaurant)
restaurantRouter.route("/").get(getAllRestaurants)
restaurantRouter.route("/:id").get(getRestaurantById)

export default restaurantRouter