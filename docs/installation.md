# Installation Guide

## Prerequisites

Before installing LithiumX, make sure you have:

- Node.js 18.x or higher
- A running [Lavalink](https://github.com/lavalink-devs/Lavalink) server
- TypeScript (if using TypeScript)

## Installing LithiumX

Install via npm:
```bash
npm install lithiumx
```

Or using yarn:
```bash
yarn add lithiumx
```

Or using bun:
```bash
bun add lithiumx
```

## Setting Up Lavalink

1. Download the latest Lavalink.jar from [GitHub Releases](https://github.com/lavalink-devs/Lavalink/releases)

2. Create an `application.yml` file:
```yaml
server:
  port: 2333
  address: 0.0.0.0
lavalink:
  server:
    password: "youshallnotpass"
    sources:
      youtube: true
      soundcloud: true
    filters:
      volume: true
      equalizer: true
```

3. Run Lavalink:
```bash
java -jar Lavalink.jar
```

## Configuration

Basic setup with Discord.js:

```typescript
import { Client } from 'discord.js';
import { LithiumXManager } from 'lithiumx';

const manager = new LithiumXManager({
    nodes: [
        {
            identifier: 'main',    // Unique identifier
            host: 'localhost',     // Lavalink host
            port: 2333,           // Lavalink port
            password: 'youshallnotpass', // Lavalink password
            secure: false         // Use SSL/TLS
        }
    ],
    // Required for Discord.js integration
    send(guildId, packet) {
        const guild = client.guilds.cache.get(guildId);
        if (guild) guild.shard.send(packet);
    }
});

// Initialize when your bot is ready
manager.init(client.user.id);
```

For more detailed configuration options, check out the [Manager Configuration](./classes/LithiumXManager) documentation.
