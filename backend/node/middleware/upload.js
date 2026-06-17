const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { AppError } = require('./errorHandler');

const uploadDir = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function isAllowedImage(file) {
  const extension = path.extname(file.originalname || '').toLowerCase();
  return allowedMimeTypes.has(file.mimetype) && allowedExtensions.has(extension);
}

function imageFileFilter(_req, file, cb) {
  if (!isAllowedImage(file)) {
    return cb(new AppError('Only JPG, PNG, WEBP, and GIF image uploads are allowed.', 400));
  }

  return cb(null, true);
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeBase = path
      .basename(file.originalname, extension)
      .replace(/[^a-z0-9_-]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'upload';

    cb(null, `${Date.now()}-${safeBase}${extension}`);
  },
});

const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: Number(process.env.UPLOAD_MAX_FILE_SIZE_MB || 5) * 1024 * 1024,
    files: 10,
  },
});

const buyerReferenceUpload = upload.single('reference_image');
const supplierFactoryUpload = upload.fields([
  { name: 'factory_images', maxCount: 8 },
  { name: 'factory_photos', maxCount: 8 },
]);

module.exports = {
  buyerReferenceUpload,
  supplierFactoryUpload,
  imageFileFilter,
  isAllowedImage,
  upload,
};
