import performRequest, { to } from "../request";
import { CATEGORIES } from "../../utils/constans/routes";

const getCategoryById = async ({ id }) => {
  const request = performRequest({
    method: "get",
    url: `${CATEGORIES}/${id}`,
    omitAccessToken: true,
  });

  const [error, response] = await to(request);
  if (error) {
    return [error, null];
  }
  return [null, response.data];
};

export default getCategoryById;
