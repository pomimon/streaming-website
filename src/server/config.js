export const Config = {
  server: {
    idleTimeout: 10,
  },
  sqlite: {
    path: `${import.meta.dir}/streams.sqlite`,
    opts: {
      create: true,
      readonly: true,
      strict: true,
    },
  },
};

if (process.env.NODE_ENV !== "production") {
  Config.server.development = {};
  Config.server.development.console = true;
  // Disable hot reloading (messes with css modules)
  Config.server.development.hmr = false;
}
