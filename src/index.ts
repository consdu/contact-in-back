import "./utils//loadEnvironments/loadEnvironments.js";
import chalk from "chalk";
import createDebug from "debug";
import app from "./server/index.js";

const debug = createDebug("contacts-api:root");

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(chalk.green(`Listening on http://localhost:${port}`));
});
