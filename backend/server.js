import express from "express";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import restaurantRouter from "./src/resources/restaurants/restaurants.routes.js";
import menuRouter from "./src/resources/menus/menus.routers.js";
import orderRouter from "./src/resources/orders/orders.routes.js";
import customerRouter from "./src/resources/customers/customers.routes.js";

const app = express();
app.use(cors());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 20, // Limit each IP to 5 requests per `window` (here, per minute).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// Middleware
app.use(express.json());
// app.use(limiter);

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSucessStatus: 200,
};

// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use("/api/restaurant", restaurantRouter);
app.use("/api/restaurant/menu", menuRouter);
app.use("/api/order", orderRouter);
app.use("/api/customer", customerRouter);
app.get("/test", (req, res, next) => {
  return res.status(200).json({ message: "Hello world!" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
