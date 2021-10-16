import { parseCookies } from "nookies";
import axios from "axios";

const getAccessToken = (ctx) => {
  const { jwt } = parseCookies(ctx);
  return jwt;
};

export const to = async (promise) =>
  promise.then((data) => [null, data]).catch((error) => [error, null]);

const performRequest = async ({
  method,
  url,
  data = null,
  params = null,
  headers = {},
  omitAccessToken = false,
  ...rest
}) => {
  const ctx = rest.ctx || null;
  const accessToken = getAccessToken(ctx);
  const config = {
    method,
    url,
  };
  if (method.toLowerCase() === "get") {
    config.params = params;
  } else {
    config.data = data;
  }
  config.headers = {
    ...headers,
  };
  if (!omitAccessToken && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return axios.request(config);
};

export default performRequest;
