# Changelog

## [2.0.0] - 2026-06-03

### Breaking Changes

These type signature changes affect TypeScript consumers. JavaScript consumers are unaffected.

- **`LithiumXManager.useableNodes`** — now returns `LithiumXNode | undefined` (was `LithiumXNode`). Add a null check before use.
- **`LithiumXManager.lyrics`** — now typed `LyricsManager | undefined` (was `LyricsManager`). Already required enabling via options; type now reflects this.
- **`LithiumXRest.get/patch/post/delete`** — now generic `<T = unknown>`: return `Promise<T | null>` (was `Promise<unknown>`). No behavior change; pass a type parameter for typed responses.
- **`StorageStrategy.load()`** — returns `Promise<unknown>` (was `Promise<any>`). Cast the result at your call site.
- **`Track.artworkUrl`** — now `string | undefined` (was `string`). Guard before use.
- **`Track.sourceName`** — now `TrackSourceName | undefined` (was `TrackSourceName`).
- **`Track.isrc`** — now `string | undefined` (was `string`).
- **`Track.requester`** — now `string | undefined` (was `string | null`).
- **`Track.displayThumbnail()`** — return type now `string | null` (was `string`). Already could return null; type now accurate.

### Internal

- Enabled TypeScript strict mode: `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`
- Removed `skipDefaultLibCheck`; retained `skipLibCheck` for third-party type compatibility
- Resolved all 180+ strict-mode type errors
- All existing unit tests continue to pass
