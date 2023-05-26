import express from "express";
import morgan from "morgan";
import createDebug from "debug";
import chalk from "chalk";
import cors from "cors";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import ping from "./controllers/ping/pingController.js";

import userRouter from "./routers/user/userRouter.js";
import { paths } from "../utils/paths.js";

const debug = createDebug("contacts-api:root:server");

const allowedOrigin = process.env.ALLOWED_ORIGIN;

if (!allowedOrigin) {
  debug(chalk.red("Missing allowed origin environment variable"));
  process.exit(1);
}

const options: cors.CorsOptions = {
  origin: allowedOrigin,
};

const app = express();

app.disable("x-powered-by");

app.use(cors(options));

app.use(express.json());

app.use(morgan("dev"));

app.get(paths.ping, ping);

app.use(paths.user, userRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
