import performRequest, { to } from "../request";
import { MARKERS } from "../../utils/constans/routes";

const removeMarker = async ({ ctx = null, id }) => {
  const request = performRequest({
    method: "delete",
    url: `${MARKERS}/${id}`,
    ctx,
  });

  const [error, response] = await to(request);
  if (error) {
    return [error, null];
  }
  return [null, response.data];
};

export default removeMarker;
