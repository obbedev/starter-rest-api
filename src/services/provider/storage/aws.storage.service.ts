import pkg from 'aws-sdk';
const { S3 } = pkg;
import AWS from 'aws-sdk';

import { AbstractStorageService } from "./abstract.storage.service.js";

export class AwsStorageService extends AbstractStorageService {
    private bucketName = '';
    private s3 = null;
    constructor() {
        super();
        this.bucketName = process.env.CYCLIC_BUCKET_NAME;
        AWS.config.update({
            region:process.env.AWS_REGION,
            accessKeyId:process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
            sessionToken:process.env.AWS_SESSION_TOKEN,
        });
        this.s3 = new S3();
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