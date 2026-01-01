import axiosClient from "@/utils/axios";

let refreshPromise: Promise<boolean> | null = null;

export const refreshToken = async () => {
  if (refreshPromise) {
    return refreshPromise; // wait for ongoing refresh
  }

  refreshPromise = axiosClient
    .get("/auth/refresh")
    .then(() => true)
    .catch(() => false)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};