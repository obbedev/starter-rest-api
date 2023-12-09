import { app } from "./app.js";
import { createConnection } from "./core/database/database.js";
createConnection();
app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
