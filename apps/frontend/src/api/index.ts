import { FormData } from "../models";

const BASE_URL = "http://localhost:8081";

export const requestHandler = (
  data: FormData
): Promise<{ success: boolean; message?: string }> =>
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    const result = await response.json();
    switch (response.status) {
      case 200:
        return { success: true, message: result.message };
      case 401:
      case 403:
        return { success: false, message: result.message };
      default:
        return { success: false };
    }
  });
