import { default as bcrypt } from 'bcryptjs'
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//TODO get from env
const manualSalt = '$2b$10$ABCDEFGHIJKLMNOPQRSTUV';
export const hash = async (...value) => {
  try {
    const hashedValue = await bcrypt.hash(...value, manualSalt);
    return hashedValue;
  } catch (error) {
    throw error;
  }
}

export const getTmpPath = () => {
  console.log(path.join(__dirname, '/../uploads'))
  if (fs.existsSync("/tmp")) {
    return "/tmp";
  }
  const uploadFolder = path.join(__dirname, '/../uploads');
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
  }
  return uploadFolder;
}