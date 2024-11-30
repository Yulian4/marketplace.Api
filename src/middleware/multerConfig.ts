import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'E:/MarketplaceProject/marketplace/assets/images/products'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const extname = path.extname(file.originalname).toLowerCase();
  if (extname === '.png' || extname === '.jpg' || extname === '.jpeg') {
    cb(null, true); 
  } else {
    cb(new Error('Solo se permiten imágenes PNG, JPEG o JPG') as any, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

export default upload;
