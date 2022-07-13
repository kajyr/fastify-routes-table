const fp = require('fastify-plugin');
const colors = require('colors/safe');

const sortFn = (a, b) => a.localeCompare(b);

function routesTablePlugin(instance, options, done) {
  const routesMap = {};

  function logRoutes() {
    console.log(colors.blue('Routes'));

    const urls = Object.keys(routesMap).sort(sortFn);
    const lineLength = urls.reduce((val, url) => Math.max(val, url.length + 3), 20);

    for (const url of urls) {
      const list = routesMap[url];
      const methods = list.sort(sortFn).join(', ');
      console.log(`${colors.blue(url.padEnd(lineLength))}${methods}`);
    }
  }

  instance.addHook('onRoute', (routeOptions) => {
    const { url, method, schema } = routeOptions;
    if (schema?.hide) {
      return;
    }
    const urlMap = routesMap[url] || [];
    urlMap.push(method);
    routesMap[url] = urlMap;
  });

  instance.decorate('logRoutes', logRoutes);

  done();
}

module.exports = fp(routesTablePlugin, {
  fastify: '>=3.x',
  name: 'fastify-routes-table',
});
