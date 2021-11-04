const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [marker] = await strapi.services.marker.find({
      id: ctx.params.id,
      "user.id": ctx.state.user.id,
    });

    if (!marker) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    entity = await strapi.services.marker.delete({ id }, ctx.request.body);

    return sanitizeEntity(entity, { model: strapi.models.marker });
  },
};
