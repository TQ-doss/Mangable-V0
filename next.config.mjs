/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Strip node: prefix so webpack can resolve built-ins (or polyfills)
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        })
      );
      // Stub out Node.js built-ins that aren't available in the browser
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        https: false,
        http: false,
        os: false,
        stream: false,
        url: false,
        buffer: false,
        crypto: false,
        zlib: false,
        net: false,
        tls: false,
        dns: false,
        querystring: false,
        util: false,
        events: false,
        child_process: false,
        worker_threads: false,
      };
    }
    return config;
  },
};

export default nextConfig;
