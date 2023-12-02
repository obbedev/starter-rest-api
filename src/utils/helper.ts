import { default as bcrypt } from 'bcryptjs'
import path from "path";
import fs from "fs";
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname } from 'path';
import { promises as fsPromises } from 'fs';

//TODO get from env
const manualSalt = '$2b$10$ABCDEFGHIJKLMNOPQRSTUV';
export const hash = async (...value) => {
  try {
    console.log(...value);
    const hashedValue = await bcrypt.hash(...value, manualSalt);
    console.log(...value, hashedValue);
    return hashedValue;
  } catch (error) {
    throw error;
  }
}

export const getTmpPath = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
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

export const toDotCase = (inputString) => {
  const dotCaseString = inputString.replace(/[-_]/g, '.');
  return dotCaseString;
}

export const projectRootPath = () => {
  const __filename = fileURLToPath(import.meta.url);
  console.log("filename", __filename)
  const __dirname = dirname(__filename);
  console.log("__dirname", __dirname)
  const rootPath = path.join(__dirname, "/../../");
  console.log("join folder root", rootPath);
  return rootPath;
}

export const projectSrcPath = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const rootPath = path.join(__dirname, "/../");
  console.log("join folder SRC", rootPath);
  return rootPath;
}

export async function controllerExists(controllerName, functionName = null) {
  try {
    let controllerPath = getControllerPath(controllerName);
    let controllerExists = await fileExists(controllerPath);
    if (!controllerExists) {
      console.log("return el archivo no existe", controllerPath);
      return false;
    }
    console.log("CONTROLLER EXISTS", controllerPath);
    if (functionName) {
      const controllerPathUrl = pathToFileURL(controllerPath);
      const controllerModule = await import(controllerPathUrl.toString());
      if (controllerModule && typeof controllerModule[functionName] === 'function') {
        console.log(`El controlador ${controllerName} existe y contiene la función ${functionName}.`);
        return true;
      } else {
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error(`Error al cargar el controlador: ${error.message}`);
  }
}

export async function getControllerFromTable(controllerName) {
  try {
    let controllerPath = getControllerPath(controllerName);
    await fsPromises.access(controllerPath);
    const controllerPathUrl = pathToFileURL(controllerPath);
    const controllerModule = await import(controllerPathUrl.toString());
    return controllerModule;
  } catch (error) {
    console.error(`Error al cargar el controlador: ${error.message}`);
  }
}

export async function fileExists(path: string): Promise<boolean> {
  try {
    console.error(`El archivo existe??: ${path}`);
    await fsPromises.access(path);
    console.error(`El archivo existe: ${path}`);
    return true;
  } catch (error) {
    console.error(`El archivo no existe: ${path}`, error);
    return false;
  }
}

export function getControllerPath(controllerName){
  controllerName = toDotCase(controllerName);
  let projectSrc = projectSrcPath();
  //issue with ts/js - IMPROVE
  let extension = 'ts';
  if(isProEnv()){
    extension = "js";
  }
  return path.join(projectSrc, "controllers", `${controllerName}.controller.${extension}`);
}

export function isLocalEnv(){
  return getEnv()=="local";
}

export function isProEnv(){
  return getEnv()=="pro";
}

export function getEnv(){
  return process.env.ENV;
}