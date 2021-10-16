import performRequest, { to } from "../request";
import { LOGIN } from "../../utils/constans/routes";

const login = async ({ email, password }) => {
  const request = performRequest({
    method: "post",
    url: LOGIN,
    data: {
      identifier: email,
      password,
    },
    omitAccessToken: true,
  });

  const [error, response] = await to(request);
  if (error) {
    return [error, null];
  }
  return [null, response.data];
};

export default login;
