import router from "./router.js";
import {
  getTableItem,
  getTableItems,
  insert,
  update
} from "../controllers/generic.controller.js";
import { isLogged  } from "../utils/auth.js";

router.get("/:table/test",isLogged,getTableItems);
router.get("/:table", getTableItems);
router.get("/:table/:id", getTableItem);
router.post("/:table", insert);
router.put("/:table/:id", update);

export default router;
