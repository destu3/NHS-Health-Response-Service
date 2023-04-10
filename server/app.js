import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

// import routers
import appointmentRouter from "./routers/appointmentRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import facilityRouter from "./routers/facilityRouter.js";
import healthProfileRouter from "./routers/healthProfileRouter.js";
import prescriptionRouter from "./routers/prescriptionRouter.js";
import serviceRouter from "./routers/serviceRouter.js";
import userRouter from "./routers/userRouter.js";
import AuthController from "./controllers/AuthController.js";

const app = express();

// cors
app.use(cors());

// request body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// log request info
if (process.env.APP_ENV !== "production") app.use(morgan("dev"));

app.get("/api/", (req, res, next) => {
  res.status(200).json("Root API route");
});

// mount routers
app.use("/api/users", userRouter);
// all routes should be protected
app.use(new AuthController().protect());
app.use("/api/appointments", appointmentRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/facilities", facilityRouter);
app.use("/api/healthProfiles", healthProfileRouter);
app.use("/api/prescriptions", prescriptionRouter);
app.use("/api/services", serviceRouter);

export default app;
