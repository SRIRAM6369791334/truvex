export async function validateImage(file: File) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error('Only JPG, PNG, and WEBP images are allowed.');
  }
  if (file.size > 2 * 1024 * 1024) {
    throw new Error('Image size exceeds the 2 MB limit.');
  }
}
