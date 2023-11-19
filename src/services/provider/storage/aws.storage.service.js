import { AbstractStorageService } from "./abstract.storage.service";

export class AwsStorageService extends AbstractStorageService {
    constructor() {
        super();
        this.bucketName = process.env.CYCLIC_BUCKET_NAME;
        this.s3 = new AWS.S3();
    }

    async getFileUrl(path) {
        const params = {
            Bucket: this.bucketName,
            Key: path,
        };
        const signedUrl = await this.s3.getSignedUrlPromise('getObject', params);
        return signedUrl;
    }

    async uploadFile(file, path) {
        const params = {
            Bucket: this.bucketName,
            Key: path,
            Body: file,
        };

        const response = await this.s3.upload(params).promise();
        return response.Location;
    }
    
    async deleteFile(path){
        throw new Error("Must implement deleteFile");
    }
  
    async getFileMetadata(path) {
      throw new Error("Must implement getFileMetadata");
    }
}