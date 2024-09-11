import axios from "axios";

export const api = async (method, endpoint, data = null) => {
  const reqConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = `${endpoint}`;
  try {
    let response;
    switch (method.toLowerCase()) {
      case "get":
        response = await axios.get(url, reqConfig);
        break;
      case "post":
        response = await axios.post(url, data, reqConfig);
        break;
      case "put":
        response = await axios.put(url, data, reqConfig);
        break;
      case "patch":
        response = await axios.patch(url, data, reqConfig);
        break;
      case "delete":
        response = await axios.delete(url, reqConfig);
        break;
      default:
        throw new Error("Invalid HTTP method");
    }

    return response.data;
  } catch (error) {
    if (error.response?.status === 500) {
      throw new Error("Network Error");
    }
    throw error;
  }
};
