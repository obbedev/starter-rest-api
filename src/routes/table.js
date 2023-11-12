import router from "./router.js";
import {
  getTableItem,
  getTableItems,
  insert
} from "../controllers/generic.controller.js";

router.get("/:table", getTableItems);
router.get("/:table/:id", getTableItem);
router.post("/:table", insert);

export default router;
