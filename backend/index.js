import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";

dotenv.config();
const app = express();
const port = 4000;
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

app.get("/", (req, res) => res.send("Hello world"));

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to mongodb`);
    app.listen(port, () => console.log(`App running on port: ${port}`));
  })
  .catch((e) => console.log(`An error in connecting to mongodb: ${e}`));
