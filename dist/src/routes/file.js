import multer from "multer";
import { getTmpPath } from "../utils/helper.js";
import { getFile, uploadFile } from "../controllers/file.controller.js";
import { isLogged } from "../utils/auth.js";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, getTmpPath());
    }
});
const upload = multer({ storage: storage });
export class FileRoutes {
    constructor(router) {
        this.router = null;
        this.router = router;
    }
    registerRoutes() {
        this.router.post("/file/upload", isLogged, upload.single('file'), uploadFile);
        //maybe do not check if logged, add signature
        this.router.get("/file/:id", isLogged, getFile);
    }
}
