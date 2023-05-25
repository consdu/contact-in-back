import "./utils//loadEnvironments/loadEnvironments.js";
import chalk from "chalk";
import createDebug from "debug";
import app from "./server/index.js";
import connectToDatabase from "./utils/connectToDatabase/connectToDatabase.js";

const debug = createDebug("contacts-api:root");

const port = process.env.PORT ?? 4000;
const mongoDbConnection = process.env.MONGO_DB_CONNECTION!;

if (!mongoDbConnection) {
  debug(chalk.red("Missing MONGO_DB_CONNECTION environment variable"));
  process.exit(1);
}

app.listen(port, () => {
  debug(chalk.green(`Listening on http://localhost:${port}`));
});

try {
  await connectToDatabase(mongoDbConnection);
  debug(chalk.green("Connection to database succesful"));
} catch {
  debug(chalk.red("Error while connecting to database"));
}
