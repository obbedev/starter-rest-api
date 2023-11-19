export class AbstractStorageService {
    constructor() {
        if (new.target === AbstractStorageService) {
            throw new Error("Abstract class cannot be instantiated directly.");
        }
        if (typeof this.uploadFile !== "function" ||
            typeof this.getFileUrl !== "function" ||
            typeof this.deleteFile !== "function" ||
            typeof this.getFileMetadata !== "function") {
            throw new Error("Child class must implement all abstract methods.");
        }
    }
    async uploadFile(file, path) {
        throw new Error("Must implement deleteFile");
    }
    async getFileUrl(path) {
        throw new Error("Must implement deleteFile");
    }
    async deleteFile(path) {
        throw new Error("Must implement deleteFile");
    }
    async getFileMetadata(path) {
        throw new Error("Must implement getFileMetadata");
    }
}
