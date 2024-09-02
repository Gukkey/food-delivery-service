import { createCustomError } from "../../middlewares/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";
import {
  createRestaurantMenu,
  deleteRestaurantMenu,
  updateRestautantMenu,
  getRestaurantMenuQuery
} from "../../db/queries.js";

export const postRestaurantMenu = tryCatchWrapper(async function (
  req,
  res,
  next
) {
  // name, description, price, dietary tags (vegetarian, gluten-freee)
  const { name, description, price, dietary_tags, restaurant_id } = req.body;

  if (!name || !description || !price || !dietary_tags || !restaurant_id) {
    return next(createCustomError("All fields are required", 400));
  }

  const data = {
    name: name,
    description: description,
    price: price,
    dietary_tags: dietary_tags,
    restaurant_id: restaurant_id,
  };

  await createRestaurantMenu(data);

  return res.status(201).json({ message: "Restaurant menu has been created" });
});

export const getRestaurantMenu = tryCatchWrapper(async function (req, res, next) {
  const {id} = req.params
  if (!id) {
    throw createCustomError(
      "Id is null, please include id along with the request",
      400
    );
  }
  const results = await getRestaurantMenuQuery(id)
  return res.status(200).json({message: "Restaurant menu has been fetched", result: results})
})

export const putRestaurantMenu = tryCatchWrapper(async function (
  req,
  res,
  next
) {
  const { id } = req.params;
  if (!id) {
    throw createCustomError(
      "Id is null, please include id along with the request",
      400
    );
  }
  const data = req.body;
  await updateRestautantMenu(data, id);
  return res
    .status(201)
    .json({ message: "Restaurant menu has been modified successfully" });
});

export const removeRestaurantMenu = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params
  if (!id) {
    throw createCustomError(
      "Id is null, please include id along with the request",
      400
    );
  }
  await deleteRestaurantMenu(id)
  return res
    .status(200)
    .json({ message: "Menu item has been deleted successfully" });
})