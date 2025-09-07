import * as Sentry from "@sentry/react-router";
 import { startTransition, StrictMode } from "react";
 import { hydrateRoot } from "react-dom/client";
 import { HydratedRouter } from "react-router/dom";
Sentry.init({
 dsn: "https://4313678f42540c73318cd95dd05fede2@o4509980636413952.ingest.de.sentry.io/4509980675604560",
 // Adds request headers and IP for users, for more info visit:
 // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
 sendDefaultPii: true,
 integrations: [
   //  performance
   Sentry.reactRouterTracingIntegration(),
   //  performance
   //  session-replay
   Sentry.replayIntegration(),
   //  session-replay
   //  user-feedback
   Sentry.feedbackIntegration({
     // Additional SDK configuration goes in here, for example:
     colorScheme: "system",
   }),
   //  user-feedback
 ],
 //  logs
 // Enable logs to be sent to Sentry
 enableLogs: true,
 //  logs
 //  performance
 tracesSampleRate: 1.0, //  Capture 100% of the transactions
 // Set `tracePropagationTargets` to declare which URL(s) should have trace propagation enabled
 tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],
 //  performance
 //  session-replay
 // Capture Replay for 10% of all sessions,
 // plus 100% of sessions with an error
 replaysSessionSampleRate: 0.1,
 replaysOnErrorSampleRate: 1.0,
 //  session-replay
});
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  );
});