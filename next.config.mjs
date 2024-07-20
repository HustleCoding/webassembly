/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";

    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/async",
    });

    // Add a resolver for the WebAssembly module
    config.resolve.alias["@/wasm"] = require("path").resolve(
      __dirname,
      "rust-lib/pkg"
    );

    return config;
  },
};

export default nextConfig;
