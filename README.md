# paseo-airified

A personal collection of [Paseo](https://paseo.sh) tweaks and features.

## Current tweaks

- Thinking uses a muted, collapsible row aligned with tool-call labels.
- Collapsed rows show only “Thinking” (or “Thinking…” while active), with no content preview.
- Expanded content renders Markdown, with an indentation rail instead of a shaded container.
- Concatenated bold topic labels get a `·` separator. Ordinary prose, lists, links, and code pass through unchanged.
- Streaming updates preserve the row's open/closed state. Final replies and tool calls are unchanged.

Currently client-only: no server entry, agent tools, plugin network requests, or conversation writes.
The plugin displays the reasoning or summary supplied by the backend; it cannot recover reasoning that was not supplied.

## Install from Git

Requires **Paseo 0.15.2+** on both the daemon and app. Enable plugins under **Settings → Plugins** on the target host, then install:

```sh
paseo plugin install git:airium/paseo-airified
paseo plugin ls paseo-airified
```

Or paste `git:airium/paseo-airified` into **Settings → Plugins → Plugin source**.
No npm install or separate build is needed for users; Paseo compiles the source and supplies the runtime libraries.

Use `--host HOST:PORT` if the target daemon is not the CLI default.
Installation happens on the daemon host and applies to the Paseo clients connected to it.

### Update or disable

```sh
paseo plugin update paseo-airified
paseo plugin disable paseo-airified
```

Git installs use a managed checkout.
Editing a separate local clone does not update the installed plugin; push your changes, then run the update command.

## Development

Use Node 24+ for development and tests:

```sh
git clone git@github.com:airium/paseo-airified.git
cd paseo-airified
npm ci
npm run check
```

Run `npm run format` before committing. Commits use Conventional Commits and the developer's
configured signing.

For local iteration, disable the Git-installed plugin and install this checkout under a separate
runtime ID:

```sh
paseo plugin disable paseo-airified
paseo plugin install . --id paseo-airified-dev
```

After edits, run `npm run check` and `paseo plugin reload paseo-airified-dev`. When finished:

```sh
paseo plugin remove paseo-airified-dev
paseo plugin enable paseo-airified
```

### Layout

| Path                        | Purpose                                |
| --------------------------- | -------------------------------------- |
| `index.client.tsx`          | Client contribution wiring             |
| `client/thinking.tsx`       | Thinking row and Markdown presentation |
| `client/format-markdown.ts` | Conservative topic-label cleanup       |
| `test/`                     | Markdown-preservation tests            |

Keep future tweaks in separate client modules and register them from `index.client.tsx`.
Add server-side code only when a feature needs it.
The `compact-thinking` contribution IDs name the existing feature, not the plugin as a whole.

The initial implementation targets Paseo v0.15.2 and its public timeline plugin API.
Checks cover types, lint, and Markdown preservation.
Rendering was also checked with a compiled-bundle browser fixture at 360 px and 1100 px in light/dark themes; that fixture does not test Paseo's native Markdown engine.

## License

[Apache-2.0](LICENSE). The thinking integration and alignment draw on Paseo's plugin example and tool-row layout; see [NOTICE](NOTICE) for attribution.
