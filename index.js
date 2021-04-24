const warp = fn =>
  function expressAsyncWarper(...args) {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  }

const transformToAsync = app => {
  function start(layers) {
    layers.forEach(layer => {
      if (layer.route && layer.route.stack) start(layer.route.stack);
      else if (layer.handle && layer.handle.stack) start(layer.handle.stack);
      else if (layer.handle.constructor.name === 'AsyncFunction') {
        layer.handle = warp(layer.handle);
      }
    });

  }
  start(app._router.stack);

  return app;
}

module.exports = transformToAsync;
