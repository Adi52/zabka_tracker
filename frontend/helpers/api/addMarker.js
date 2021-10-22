import performRequest, { to } from "../request";
import { MARKERS } from "../../utils/constans/routes";

const addMarker = async ({
  ctx,
  title,
  description,
  latitude,
  longitude,
  userId,
  category,
}) => {
  const request = performRequest({
    method: "post",
    url: MARKERS,
    ctx,
    data: {
      title,
      description,
      latitude,
      longitude,
      user: userId,
      category,
    },
  });

  const [error, response] = await to(request);
  if (error) {
    return [error, null];
  }
  return [null, response.data];
};

export default addMarker;
