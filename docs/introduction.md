# Introduction

LithiumX is a powerful, simple, and effective stable [Lavalink](https://github.com/lavalink-devs/Lavalink) client developed in TypeScript. It provides a robust foundation for building Discord music bots with minimal boilerplate.

## Architecture

LithiumX is built around a few core concepts:

### Manager
The `LithiumXManager` is the central hub that manages nodes, players, and voice connections. It handles:
- Node lifecycle (connect, reconnect, failover)
- Player creation and destruction
- Voice state updates from Discord
- Event dispatching

### Nodes
A `LithiumXNode` represents a connection to a Lavalink server. Multiple nodes can be configured for:
- **Load balancing** — distribute players across nodes
- **Failover** — automatic reconnection if a node goes down
- **Auto-resume** — persist and restore player state on reconnect

### Players
A `LithiumXPlayer` manages playback for a single guild. Each player provides:
- Play, pause, stop, skip controls
- Queue management (add, remove, shuffle, loop)
- Audio filters (equalizer, karaoke, tremolo, etc.)
- Volume control

### Queue
The `LithiumXQueue` handles track ordering with:
- Track queuing and dequeuing
- Shuffle and loop modes
- Track repeat and queue repeat

### REST
The `LithiumXRest` provides direct HTTP access to Lavalink's REST API for:
- Track searching and loading
- Decoding track data
- Session management

## Features

- **Full Lavalink v4 support**
- **Multi-node** with load balancing and failover
- **Auto-resume** — persist player state across node restarts
- **Audio filters** — 14+ built-in filter presets (bass boost, vaporwave, etc.)
- **Queue management** — save/load/share queues across guilds
- **Analytics** — track plays, skips, listening habits, and user activity
- **Storage strategies** — in-memory or Redis persistence
- **Lyrics** — built-in lyrics fetching
- **Visualization** — audio visualization data
- **TypeScript first** — full type definitions throughout

## Next Steps

- [Installation](./installation) — set up LithiumX and Lavalink
- [Getting Started](./get-started) — a simple working example
- [Manager API](../classes/LithiumXManager) — full configuration reference
