
const fastifyPlugin = (fastify, opts, done) => {
  fastify.addHook('preHandler', (request, reply, done) => {
    request.decorate('user', { id: null });
    done();
  });

  done();
};

export default fastifyPlugin;
