import { FileService } from "../services/file.service.js";
import { AwsStorageService } from "../services/provider/storage/aws.storage.service.js";
export const uploadFile = async (req, res) => {
    console.log(req.file);
    try {
        //TODO dynamic storage factory
        let storageService = new AwsStorageService();
        let service = new FileService(storageService, null);
        let id = await service.createFile(req.file.originalname, req.file.path, req.file.mimetype);
        //TODO delete tmp file
        //should return url, name
        res.status(200).json({ message: id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating file" });
    }
};
export const getFile = async (req, res) => {
    console.log(req.file);
    try {
        let { id } = req.params;
        //TODO dynamic storage factory from file id
        let storageService = new AwsStorageService();
        let service = new FileService(storageService, null);
        let fileUrl = await service.getFile(id);
        res.status(200).json({ message: fileUrl });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error getting file" });
    }
};
