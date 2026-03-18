import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response, message } = error;
    const status = response?.status;
    const errorMessage = response?.data?.msg;

    if (!response) {
      toast.error("Network error", {
        description: message || "Please check your internet connection.",
      });
    } else {
      switch (status) {
        case 401: {
          toast.error("Unauthorized", {
            description:
              errorMessage ?? "You are not authorized to access this resource.",
          });
          break;
        }
        case 403: {
          toast.error("Forbidden", {
            description:
              errorMessage ??
              "You do not have permission to access this resource.",
          });
          break;
        }
        case 500: {
          toast.error("Server Error", {
            description:
              errorMessage ??
              "An error occurred on the server. Please try again later.",
          });
          break;
        }
        case 400: {
          toast.error("Bad Request", {
            description:
              errorMessage ??
              "Please check your input. There was an error with your request.",
          });
          break;
        }
        default: {
          toast.error("Error", {
            description: errorMessage || "An unexpected error occurred.",
          });
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
