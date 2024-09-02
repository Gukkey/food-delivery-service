import { createCustomError } from "../../middlewares/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";
import { createRestaurant, getAllRestaurantsQuery, fetchRestaurantById } from "../../db/queries.js";

export const postRestaurant = tryCatchWrapper(async function (req, res, next) {
    // id, name, cuisine type, delivery area
    const { name, cuisineType, deliveryArea } = req.body;

    if(!name || !cuisineType || !deliveryArea) {
        return next(createCustomError("All fields are required", 400));
    }

    const data = {
        name: name,
        cuisineType: cuisineType,
        deliveryArea: deliveryArea
    };

    await createRestaurant(data);

    return res.status(201).json({message: "Restaurant has been created"})
})

export const getAllRestaurants = tryCatchWrapper(async function (req, res, next) {
    const results = await getAllRestaurantsQuery()
    return res.status(200).json({message: "Data has been fetched", result: results})
})

export const getRestaurantById = tryCatchWrapper(async function (req, res, next) {
    const { id } = req.params
    const results = await fetchRestaurantById(id)
    return res.status(200).json({message: "Data has been fetched", result: results})
})