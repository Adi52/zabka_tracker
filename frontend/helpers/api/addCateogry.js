import performRequest, { to } from "../request";
import { CATEGORIES } from "../../utils/constans/routes";

const addCategory = async ({ ctx, title, description }) => {
  const request = performRequest({
    method: "post",
    url: `${CATEGORIES}`,
    ctx,
    data: {
      name: title,
      description,
    },
  });

  const [error, response] = await to(request);
  if (error) {
    return [error, null];
  }
  return [null, response.data];
};

export default addCategory;
