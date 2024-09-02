import { createCustomError } from "../../middlewares/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";
import { createOrder } from "../../db/queries.js";

export const postOrder = tryCatchWrapper(async function (req, res, next) {
    // name, description, price, dietary tags (vegetarian, gluten-freee)
    const { customerId, itemId, deliveryAddress} = req.body;

    if(!customerId || !itemId || !deliveryAddress) {
        return next(createCustomError("All fields are required", 400));
    }

    const data = {
        customerId: customerId,
        itemId: itemId,
        deliveryAddress: deliveryAddress
    };
    
    await createOrder(data);

    return res.status(201).json({message: "Order has been placed"});
})