import performRequest, { to } from "../request";
import { MARKERS } from "../../utils/constans/routes";

const getMarkersList = async () => {
  const request = performRequest({
    method: "get",
    url: MARKERS,
    omitAccessToken: true,
  });

  const [error, response] = await to(request);
  if (error) {
    return [error, null];
  }
  return [null, response.data];
};

export default getMarkersList;
