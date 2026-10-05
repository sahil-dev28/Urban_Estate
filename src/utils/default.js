export const DROPZONE_IMAGE_FORMAT = {
  "image/jpeg": [],
  "image/jgp": [],
  "image/png": [],
};
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const IMAGE_EXTENSIONS = [".jpeg", ".jpg", ".png"];

export const MAX_IMAGES = 5;

export const UNITS = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

// Optional demo account so reviewers can explore without signing up.
// Set VITE_DEMO_EMAIL and VITE_DEMO_PASSWORD in the deploy environment.
export const DEMO_ACCOUNT =
  import.meta.env.VITE_DEMO_EMAIL && import.meta.env.VITE_DEMO_PASSWORD
    ? {
        email: import.meta.env.VITE_DEMO_EMAIL,
        password: import.meta.env.VITE_DEMO_PASSWORD,
      }
    : null;
