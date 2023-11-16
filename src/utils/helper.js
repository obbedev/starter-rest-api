import { default as bcrypt } from 'bcryptjs'

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