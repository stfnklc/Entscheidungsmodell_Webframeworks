const fastify = require('fastify')({ logger: true });
const path = require('path');
const { calculateAHP } = require('./ahp');
const { calculateTOPSIS } = require('./topsis');

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, '../public'),
  prefix: '/', 
});

fastify.post('/api/calculate-weights', async (request, reply) => {
  const { answers } = request.body; 
  
  try {
    const ahpResult = calculateAHP(answers);
    const topsisResult = calculateTOPSIS(ahpResult.weights);

    return {
        ahp: ahpResult,
        ranking: topsisResult
    }; 
  } catch (error) {
    fastify.log.error(error);
    reply.code(500).send({ error: 'Berechnungsfehler' });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server läuft auf http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();