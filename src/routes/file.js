import path from "path";
import fs from "fs";
import multer from "multer";

//get path, issue with es modules and __dirname
//create service to get project paths
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//service should say where uploads tmp is
const uploadFolder = path.join(__dirname, '/../uploads');
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
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
