import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { configDefaults } from "vitest/config";
import { peerDependencies } from "./package.json";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "functions", "remotion", "dist"],
  },
  build: {
    lib: {
      entry: "./src/index.ts", // Specifies the entry point for building the library.
      name: "firereact", // Sets the name of the generated library.
      fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
      formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
    },
    rollupOptions: {
      external: [
        "@firebase/firestore",
        "@firebase/auth",
        "@firebase/util",
        "@firebase/storage",
        "@firebase/app",
        "@firebase/functions",
        "@firebase/component",
        "@firebase/logger",
        "react",
        "react/jsx-runtime",
        ...Object.keys(peerDependencies),
      ], // Defines external dependencies for Rollup bundling.
    },
    sourcemap: true, // Generates source maps for debugging.
    emptyOutDir: true, // Clears the output directory before building.
  },
  plugins: [
    dts({
      rollupTypes: true,
    }),
    peerDepsExternal(),
  ], // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
});
