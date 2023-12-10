import express from "express";
import morgan from "morgan";
import indexRoutes from "./routes/index.js";
import cors from "cors";
import { isProEnv } from "./utils/helper.js";
import { HttpStatusException } from "./core/exception/http.status.exception.js";
const app = express();
// settings
app.set("port", process.env.PORT || 3000);
// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: '*'
}));
// Routes
app.use(indexRoutes);
//avoid to show inner error messages to user 
app.use((err, req, res, next) => {
    console.error('Uncaught error:', err);
    const proEnv = isProEnv();
    let defaultErrorMessage = err?.publicMessage ? err?.publicMessage : err?.message;
    let code = 500;
    let errorResponse = {};
    if (err?.code && err instanceof HttpStatusException) {
        code = err?.code;
    }
    if (proEnv) {
        defaultErrorMessage = "Server error";
    }
    else {
        errorResponse["trace"] = err.trace;
    }
    errorResponse["code"] = code;
    errorResponse["error"] = defaultErrorMessage;
    res.status(code).json(errorResponse);
});
export { app };
