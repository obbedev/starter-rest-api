import router from "./router.js";
import {
  getTableItem,
  getTableItems
} from "../controllers/generic.controller.js";

router.get("/:table", getTableItems);
router.get("/:table/:id", getTableItem);

export default router;
