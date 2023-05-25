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

app.get("/ping", ping);

app.use(notFoundError);

app.use(generalError);

export default app;
