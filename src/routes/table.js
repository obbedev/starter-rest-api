import router from "./router.js";
import {
  getTableItem,
  getTableItems,
  insert,
  update
} from "../controllers/generic.controller.js";

router.get("/:table", getTableItems);
router.get("/:table/:id", getTableItem);
router.post("/:table", insert);
router.put("/:table", update);

export default router;
