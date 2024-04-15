import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import router from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// global error handler middleware
app.use(globalErrorHandler);

// routes
app.use("/api/v1", router);

// handle not found routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API not found",
      },
    ],
  });
  next();
});

export default app;
