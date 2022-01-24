# fastify-routes-tables

_fastify-routes-tables_ provides a simple printout of the routes declared for the [Fastify][fastify] web framework.

## Getting started

First install the package:

```bash
npm i fastify-routes-tables
```

Next, set up the plugin:

```js
const fastify = require("fastify");

fastify.register(require("fastify-routes-table"));
```

`fastify-routes-table` plugin will render a printout of the used routes and verbs.
