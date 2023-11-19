import multer from "multer";
import { getTmpPath } from "../utils/helper.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, getTmpPath());
    }
});
const upload = multer({ storage: storage });

export class FileRoutes{
    constructor(router){
        this.router = router;
    }

    registerRoutes(){
        this.router.post("/file/upload", upload.single('file'), (req, res, next) => {
            console.log(req.file)
        
            res.status(200).json({ title: __dirname, message: req.file })
        });
        
        this.router.post("/file/:id", (req, res, next) => {
            const params = req.params;
            console.log(params)
            res.status(200).json({ title: __dirname, message: params })
        });
    }
}
