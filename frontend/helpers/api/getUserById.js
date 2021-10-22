import performRequest, { to } from "../request";
import { USERS } from "../../utils/constans/routes";

const getUserById = async ({ id }) => {
  const request = performRequest({
    method: "get",
    url: `${USERS}/${id}`,
    omitAccessToken: true,
  });

  const [error, response] = await to(request);
  if (error) {
    return [error, null];
  }
  return [null, response.data];
};

export default getUserById;
