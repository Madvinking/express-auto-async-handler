# express-auto-async-handler

![npm](https://img.shields.io/npm/v/express-auto-async-handler)

automatically wrap express async function with async handlers.

## Example

```
  const express = require('express');
  const app = express();
  const warp = require('express-auto-async-handler');

  async function a() {};

  app.get('/path1', a);
  app.all('/path4', a);
  app.use(a);
  router1.get('/path5', a);

  warp(app);
  app.listen(PORT) // or just warp(app).listen(PORT);
```
