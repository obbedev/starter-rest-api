import { default as bcrypt } from 'bcryptjs';
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
//TODO get from env
const manualSalt = '$2b$10$ABCDEFGHIJKLMNOPQRSTUV';
export const hash = async (...value) => {
    try {
        console.log(...value);
        const hashedValue = await bcrypt.hash(...value, manualSalt);
        console.log(...value, hashedValue);
        return hashedValue;
    }
    catch (error) {
        throw error;
    }
};
export const getTmpPath = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    console.log(path.join(__dirname, '/../uploads'));
    if (fs.existsSync("/tmp")) {
        return "/tmp";
    }
    const uploadFolder = path.join(__dirname, '/../uploads');
    if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder);
    }
    return uploadFolder;
};
export const toDotCase = (inputString) => {
    const dotCaseString = inputString.replace(/[-_]/g, '.');
    return dotCaseString;
};
