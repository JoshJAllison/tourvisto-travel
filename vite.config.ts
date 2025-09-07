import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import type { SentryReactRouterBuildOptions }  from "@sentry/react-router";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "csuoh",
  project: "travel-agency",
  // An auth token is required for uploading source maps;
  // store it in an environment variable to keep it secure.
  authToken: "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",
  // ...
};

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: [/@syncfusion/]
  }
});
