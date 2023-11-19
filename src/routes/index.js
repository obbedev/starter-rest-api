import router from "./router.js";
import {TableRoutes} from "./table.js";
import {AuthRoutes} from "./auth.js";
import {FileRoutes} from "./file.js";

let routes = [
    new FileRoutes(router),new AuthRoutes(router),new TableRoutes(router)
];
routes.forEach(routesObject=>routesObject.registerRoutes());

export default router;