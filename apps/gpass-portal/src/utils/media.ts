export const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
export const isVideoFile = (filename: string) =>
  VIDEO_EXTENSIONS.some((ext) => filename.toLowerCase().endsWith(ext));

export const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
export const isImageFile = (filename: string) =>
  IMAGE_EXTENSIONS.some((ext) => filename.toLowerCase().endsWith(ext));
