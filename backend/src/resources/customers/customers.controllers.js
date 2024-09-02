import { createCustomError } from "../../middlewares/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";
import {
  createCustomer,
  deleteCustomer,
  findCustomerByEmail,
  updateCustomer,
  createcustomerCredentials,
  getCustomerIdbyCustomerCredentialId,
} from "../../db/queries.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// -----------------MIDDLEWARES--------------------------------------------------------------------------

// Middleware to verify JWT
export const verifyToken = tryCatchWrapper(async function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(createCustomError("No token, authorization denied", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(createCustomError("Token is not valid", 401));
  }
});

// ---------------------------------------------------------------------------------------------------------

export const postCustomer = tryCatchWrapper(async function (req, res, next) {
  const { name, gender, address, email, password } = req.body;

  if (!name || !gender || !address || !email || !password) {
    return next(createCustomError("All fields are required, 400"));
  }

  // Check if user already exists
  const existingUser = await findCustomerByEmail(email);
  if (existingUser) {
    return next(createCustomError("Email already in use", 400));
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const data = {
    name: name,
    gender: gender,
    address: address,
  };

  const createCustomerResult = await createCustomer(data);

  const credentials_data = {
    customer_id: createCustomerResult.insertId,
    email: email,
    customer_password: hashedPassword,
  };

  await createcustomerCredentials(credentials_data);

  return res
    .status(201)
    .json({
      message: "Customer has been created",
      result: createCustomerResult,
    });
});

export const loginCustomer = tryCatchWrapper(async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createCustomError("Email and password are required", 400));
  }

  const customer = await findCustomerByEmail(email);
  if (!customer) {
    return next(createCustomError("Invalid credentials", 401));
  }

  const isMatch = await bcrypt.compare(password, customer.customer_password);
  if (!isMatch) {
    return next(createCustomError("Invalid credentials", 401));
  }

  const token = jwt.sign({ id: customer.id }, JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ token });
});

// Protected route example

export const putCustomer = [
  verifyToken,
  tryCatchWrapper(async function (req, res, next) {
    const { id } = req.params;
    if (!id) {
      throw createCustomError(
        "Id is null, please include id along with the request",
        400
      );
    }

    // Convert both ids to strings for comparison
    const result = await getCustomerIdbyCustomerCredentialId(
      req.user.id
    );

    // const userId = user.customer_id
    if (result[0].customer_id.toString() !== id.toString()) {
      return next(
        createCustomError(
          `Not authorized to update this customer: ${result[0].customer_id} ${id.toString()}`,
          403
        )
      );
    }

    const data = req.body;
    await updateCustomer(data, id);
    return res.status(200).json({ message: "Customer has been updated" });
    // const user = await getCustomerIdbyCustomerCredentialId(req.user.id)
    // return res.status(200).json({result: user[0].customer_id, user_id: req.user.id})
  }),
];

export const removeCustomer = [
  verifyToken,
  tryCatchWrapper(async function (req, res, next) {
    const { id } = req.params;
    if (!id) {
      throw createCustomError(
        "Id is null, please include id along with the request",
        400
      );
    }

    // Convert both ids to strings for comparison
    const result = await getCustomerIdbyCustomerCredentialId(
      req.user.id
    );

    // Convert both ids to strings for comparison
    if (result[0].customer_id.toString() !== id.toString()) {
      return next(
        createCustomError("Not authorized to delete this customer", 403)
      );
    }

    await deleteCustomer(id);
    return res
      .status(200)
      .json({ message: "Customer has been deleted successfully" });
  }),
];
