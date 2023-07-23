import { inject } from "@vercel/analytics";

export default defineNuxtPlugin({
  hooks: {
    "app:created": () => {
      inject();
    }
  }
});
