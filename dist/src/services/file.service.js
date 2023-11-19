import { getConnection } from "../database/database.js";
import { Insert } from "../database/operation/insert.js";
import fs from 'fs/promises';
import { Query } from "../database/operation/query.js";
import { Filter } from "../database/operation/filter.js";
import Path from "path";
export class FileService {
    /**
     *
     * @param {AbstractStorageService} storageService
     * @param {any} fileRepository
     */
    constructor(storageService, fileRepository) {
        this.storageService = null;
        this.fileRepository = null;
        this.storageService = storageService;
        this.fileRepository = fileRepository;
    }
    /**
     * Create file and register data
     */
    async createFile(fileName, filePath, mimeType) {
        try {
            let extension = this.fileExtension(fileName, mimeType);
            let insert = new Insert("file");
            //get provider type id from env or current storage
            let values = [
                { provider_type: 1, file_name: fileName, mime_type: mimeType }
            ];
            insert.setValues(values);
            const db = getConnection();
            let result = await db.query(insert.toString());
            let id = result.rows[result.rows.length - 1]["id"];
            let remoteFilePath = id + extension;
            let fileData = await fs.readFile(filePath);
            let resultservice = await this.storageService.uploadFile(fileData, remoteFilePath);
            return id;
        }
        catch (error) {
            //todo delete inserted file
            console.log(error);
            throw error;
        }
    }
    /**
     * Create file and register data
     */
    async getFile(id) {
        try {
            let query = new Query("file", "id,file_name");
            let filter = new Filter();
            filter.addEqualFilter("id", id);
            query.addFilter(filter);
            const db = getConnection();
            let result = await db.query(query.toString());
            if (result.rows.length > 0) {
                let file = result.rows[0];
                let fileUrl = await this.storageService.getFileUrl(file["id"] + this.fileExtension(file["file_name"]));
                return fileUrl;
            }
            else {
                throw new Error("File does not exist");
            }
        }
        catch (error) {
            //todo delete inserted file
            console.log(error);
            throw error;
        }
    }
    fileExtension(filePath, mimeType = '') {
        return Path.extname(filePath);
    }
}
