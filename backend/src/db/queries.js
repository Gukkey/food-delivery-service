import mysql from "mysql";
import { createCustomError } from "../middlewares/customErrors.js";
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

function runQuery(sql, values) {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function createRestaurant(data) {
  try {
    const query = `INSERT INTO restaurant (name, cuisine_type, delivery_area) values (?, ?, ?)`;
    const values = [data.name, data.cuisineType, data.deliveryArea];
    await runQuery(query, values);
  } catch (err) {
    console.log(`Error while creating restaurant: ${err}`);
    throw err;
  }
}

async function getAllRestaurantsQuery() {
  try {
    const query = `SELECT * FROM restaurant`
    return runQuery(query)
  } catch (err) {
    console.log("Error while trying to fetch all restaurants")
  }
}

async function createRestaurantMenu(data) {
  try {
    const query = `INSERT INTO menu (name, description, price, dietary_tags, restaurant_id) values (?, ?, ?, ?, ?)`;
    const values = [
      data.name,
      data.description,
      data.price,
      data.dietary_tags,
      data.restaurant_id,
    ];
    await runQuery(query, values);
  } catch (err) {
    console.log(`Error while creating restaurant menu ${err}`);
    throw err;
  }
}

async function getRestaurantMenuQuery(restaurantId) {
  try{ 
    const query = `SELECT * FROM menu WHERE restaurant_id = ?`
    return runQuery(query, restaurantId)
  } catch (err) {
    console.log("Error while fetching restaurant menu")
    throw err;
  }
}

async function fetchRestaurantById(id) {
  try{ 
    const query = `SELECT * FROM restaurant WHERE id = ?`
    return runQuery(query, id)
  } catch (err) {
    console.log("Error while fetching restaurant")
    throw err;
  }
}

async function updateRestautantMenu(data, id) {
  try {
    // Build the query dynamically based on the provided data
    const updateFields = [];
    const values = [];
    const allowedFields = [
      "name",
      "description",
      "price",
      "dietary_tags",
      "restaurant_id",
    ];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        values.push(data[field]);
      }
    }

    // If no fields to update, return early
    if (updateFields.length === 0) {
      throw createCustomError("No fields to update", 400);
    }

    // Add the id to the values array
    values.push(id);

    const query = `UPDATE menu SET ${updateFields.join(", ")} WHERE id = ?`;
    await runQuery(query, values);
  } catch (err) {
    console.log(`Error while trying to edit restaurant menu ${err}`);
    throw err;
  }
}

export async function deleteRestaurantMenu(id) {
  try {
    const query = `DELETE FROM menu where id = ?`;
    const value = id;
    const result = await runQuery(query, value);

    if (result.affectedRows === 0) {
      // Throw a custom error if no item was found
      throw createCustomError("No menu item found with the given ID", 404);
    }

    return { success: true, message: "Menu item deleted successfully" };
  } catch (err) {
    console.log(`Error while trying to delete a menu item`);
    throw err;
  }
}

async function createCustomer(data) {
  try {
    const query = `INSERT INTO customer (name, gender, address) values (?, ?, ?)`;
    const values = [data.name, data.gender, data.address];
    return await runQuery(query, values);
  } catch (err) {
    console.log(`Error while trying to create a customer: ${err}`);
    throw err;
  }
}

async function getCustomerIdbyCustomerCredentialId(data) {
  try {
    const query = `SELECT customer_id from customer_credentials where id = ?`;
    return runQuery(query, data);
  } catch (err) {
    console.log(`Error while trying to create a customer: ${err}`);
    throw err;
  }
}

async function findCustomerByEmail(email) {
  try {
    const query = `SELECT * FROM customer_credentials WHERE email = ?`;
    const result = await runQuery(query, email);
    
    if (result.length === 0) {
      return null; // No customer found with the given email
    }
    
    return result[0]; // Return the first (and should be only) matching customer
  } catch (err) {
    console.log(`Error fetching the user with that email address: ${err}`);
    throw err;
  }
}

async function updateCustomer(data, id) {
  try {
    // Build the query dynamically based on the provided data
    const updateFields = [];
    const values = [];
    const allowedFields = ["name", "gender", "address"];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        values.push(data[field]);
      }
    }

    // If no fields to update, return early
    if (updateFields.length === 0) {
      throw createCustomError("No fields to update", 400);
    }

    // Add the id to the values array
    values.push(id);

    const query = `UPDATE customer SET ${updateFields.join(", ")} WHERE id = ?`;
    await runQuery(query, values);
  } catch (err) {
    console.log(`Error occured while updating customer details: ${err}`);
    throw err;
  }
}

export async function deleteCustomer(id) {
  try {
    const query = `DELETE FROM customer where id = ?`;
    const value = id;
    const result = await runQuery(query, value);

    if (result.affectedRows === 0) {
      // Throw a custom error if no item was found
      throw createCustomError("No customer found with the given ID", 404);
    }

    return { success: true, message: "Customer deleted successfully" };
  } catch (err) {
    console.log(`Error while trying to delete a customer`);
    throw err;
  }
}

async function createcustomerCredentials(data) {
  try {
    const query = `INSERT INTO customer_credentials (customer_id, email, customer_password) values (?, ?, ?)`
    const values = [data.customer_id, data.email, data.customer_password]
    return await runQuery(query, values)
  } catch (err) {
    console.log(`Error while trying to create customer credentials: ${err}`)
    throw err;
  }
}

async function createOrder(data) {
  try {
    const query = `INSERT INTO order (customerId, itemId, deliveryAddress) values (?, ?, ?)`;
    const values = [data.customerId, data.itemId, data.deliveryAddress];
    await runQuery(query, values);
  } catch (err) {
    console.log(`Error while trying to create an order: ${err}`);
    throw err;
  }
}

export {
  createRestaurant,
  createRestaurantMenu,
  createOrder,
  updateRestautantMenu,
  createCustomer,
  updateCustomer,
  getAllRestaurantsQuery,
  getRestaurantMenuQuery,
  findCustomerByEmail,
  createcustomerCredentials,
  fetchRestaurantById,
  getCustomerIdbyCustomerCredentialId
};
