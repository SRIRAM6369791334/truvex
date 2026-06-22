export async function validateImage(file: File) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error('Only JPG, PNG, and WEBP images are allowed.');
  }
  if (file.size > 2 * 1024 * 1024) {
    throw new Error('Image size exceeds the 2 MB limit.');
  }

  const url = URL.createObjectURL(file);
  try {
    const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
      image.onerror = () => reject(new Error('The selected image could not be read.'));
      image.src = url;
    });
    if (dimensions.width !== 800 || dimensions.height !== 600) {
      throw new Error(`Image dimensions must be exactly 800×600 px. Selected image is ${dimensions.width}×${dimensions.height} px.`);
    }
  } finally {
    URL.revokeObjectURL(url);
  }
}
