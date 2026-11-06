# paseo-airified

A personal collection of Paseo tweaks and features.
Public source does not imply publication to Paseo's plugin directory; do not submit it there unless explicitly requested.

- Keep `index.client.tsx` focused on contribution wiring and client features under `client/`.
- The current `compact-thinking` contribution IDs are feature names, not the plugin's runtime ID.
- Use Paseo's public plugin SDK and React Native primitives; preserve desktop/mobile support and theme colors.
  Update `requirements.paseo` when adopting newer APIs.
- Keep reasoning formatting conservative. Preserve normal prose, lists, links, and code.
- Run `npm run check` after code changes and `npm run format` before commits.
- Use Conventional Commits and the configured signing. Do not disable signing to get a commit through.
- The normal installation is Git-backed. Push authorized changes, then update the installed `paseo-airified` plugin when requested.
  Local edits do not change that managed checkout.
- Never restart the main Paseo daemon to install or reload this plugin.
- Keep the Apache-2.0 license and upstream attribution in `NOTICE`.
