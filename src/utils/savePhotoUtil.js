import fs from 'fs/promises';
import path from 'path';
import generateErrorUtil from './generateErrorUtil.js';
import sharp from 'sharp';

const savePhotoUtil = async (img) => {
    try {
        const filePath = path.join(process.cwd(), process.env.UPLOADS);
        try {
            await fs.access(filePath);
        } catch {
            await fs.mkdir(filePath);
        }
        const sharpImg = sharp(img.data);
        const fileName = `${crypto.randomUUID()}.jpg`;

        const imgPath = path.join(filePath, fileName);
        await sharpImg.toFile(imgPath);
        return fileName;
    } catch (err) {
        console.error(err);
        generateErrorUtil('Error al guardar el archivo', 500);
    }
};

export { savePhotoUtil };
