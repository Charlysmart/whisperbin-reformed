import axiosClient from "@/utils/axios";
import { AxiosType } from "@/utils/types";
import { refreshToken } from "./refresh_token";
import { alertBox } from "@/utils/alert";

export async function getData<T>({ url, onSuccess, onError, finallyCallback, navigate }: AxiosType<T>) {
  const path = window.location.pathname;
  try {
    const response = await axiosClient.get(url);
    if (onSuccess) onSuccess(response);
    return response;
  } catch (error: any) {
    if (error.response?.data?.detail?.code === "TOKEN_EXPIRED") {
      if (url.includes("/auth/refresh")) {
        // Prevent infinite loop
        throw error;
      }

      const refreshSucceeded = await refreshToken();

      if (refreshSucceeded) {
        // Update axios headers with new token inside refreshToken()!

        try {
          const retry = await axiosClient.get(url);
          if (onSuccess) onSuccess(retry);
          return retry;
        } catch (retryError) {
          if (onError) onError(retryError);
          else console.error(retryError);
          return;
        }
      } else {
        alertBox({
          message: "Login session expired! Kindly login again!",
          success: false,
          top: "0",
          onClose: () => navigate("../login", { replace: true, state: {} }),
        });
        setTimeout(() => {
          if (navigate) navigate("../login", { replace: true, state: {path : path} });
        }, 3000);
        return;
      }
    }

    if (error.response?.data?.detail === "User not verified") {
      navigate("../verify")
    }

    if (onError) onError(error);
    else console.error(error);

    throw error;
  } finally {
    if (finallyCallback) finallyCallback();
  }
}
