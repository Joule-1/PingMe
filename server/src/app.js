import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.static("public"));
app.use(cookieParser());
app.use(
    express.json({
        limit: "16kb",
        strict: true,
    })
);
app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);

import userRouter from "./routes/user.routes.js";
import userTaskRouter from "./routes/userTask.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/userTask", userTaskRouter);
app.use("/api/v1/userDashboard", dashboardRoutes);


app.use(errorHandler);

export { app };
