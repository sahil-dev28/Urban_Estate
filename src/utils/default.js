export const DROPZONE_IMAGE_FORMAT = {
  "image/jpeg": [],
  "image/jgp": [],
  "image/png": [],
};
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const IMAGE_EXTENSIONS = [".jpeg", ".jpg", ".png"];

export const MAX_IMAGES = 5;

export const UNITS = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

// Optional demo accounts so reviewers can explore without signing up.
// Set VITE_DEMO_TENANT_* and VITE_DEMO_LANDLORD_* in the deploy environment;
// an account is only offered when both its email and password are set.
const env = import.meta.env;

export const DEMO_ACCOUNTS = [
  {
    role: "tenant",
    label: "Tenant",
    hint: "Browse and apply",
    email: env.VITE_DEMO_TENANT_EMAIL,
    password: env.VITE_DEMO_TENANT_PASSWORD,
    redirectTo: "/property",
  },
  {
    role: "landlord",
    label: "Landlord",
    hint: "List and manage",
    email: env.VITE_DEMO_LANDLORD_EMAIL,
    password: env.VITE_DEMO_LANDLORD_PASSWORD,
    redirectTo: "/property/my",
  },
].filter((account) => account.email && account.password);
