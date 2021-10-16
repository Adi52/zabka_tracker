import performRequest, { to } from "../request";
import { SIGNUP } from "../../utils/constans/routes";

const getMyProfileInfo = async ({ username, email, password }) => {
  const request = performRequest({
    method: "post",
    url: SIGNUP,
    data: {
      username,
      email,
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

export default getMyProfileInfo;
