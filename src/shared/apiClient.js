import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const setAuthInterceptor = (dispatch) => {
  instance.interceptors.response.use(
    function onSuccess(response) {
      return response;
    },
    async function onInvalidToken(error) {
      const originalRequest = error.config;

      if (error.response?.status === 401) {
        try {
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            const newResponse = await instance.get("auth/refresh");

            originalRequest.headers.Authorization = `Bearer ${newResponse.data.token}`;
            dispatch({ type: "ALTER_TOKEN", payload: newResponse.data.token });

            return instance(originalRequest);
          }
        } catch (err) {
          dispatch({ type: "REVOKE_DATA" });
        }
      }
      throw error;
    },
  );
};

export const refreshSession = async () => {
  const response = await instance.post("/auth/refresh");
  return response.data;
};

export const loginUser = async (formData) => {
  const response = await instance.post("/auth/login", formData);
  return response.data;
};

export const getTotalScore = async () => {
  const response = await instance.get("/analytics/scoreboard");
  return response.data;
};

export const getSales = async () => {
  const response = await instance.get("/sales/admin");
  return response.data;
};

export const createSale = async ({ salesData, token }) => {
  const response = await instance.post("/sales/create", salesData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateSale = async ({ saleId, salesData, token }) => {
  const response = await instance.patch(`/sales/update/${saleId}`, salesData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllVendors = async () => {
  const response = await instance.get("/vendor/list");

  return response.data;
};

export const getAllSdrs = async () => {
  const response = await instance.get("/sdr/list");

  return response.data;
};

export const getScoreBoard = async () => {
  const response = await instance.get("/analytics/scoreboard?period=week");

  return response.data;
};

export const getFans = async () => {
  const response = await instance.get("/fan/list");
  return response.data;
};

export const getWeeklyRanking = async () => {
  const response = await instance.get("/analytics/ranking?period=week");
  return response.data;
};
