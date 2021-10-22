import performRequest, { to } from "../request";
import { USERS } from "../../utils/constans/routes";

const getUsersList = async () => {
  const request = performRequest({
    method: "get",
    url: USERS,
    omitAccessToken: true,
  });

  const [error, response] = await to(request);
  if (error) {
    return [error, null];
  }
  return [null, response.data];
};

export default getUsersList;
