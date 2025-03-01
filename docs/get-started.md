# Getting Started with LithiumX

LithiumX is a powerful Lavalink client for Discord music bots, written in TypeScript. This guide will help you get started with basic implementation.

## Basic Usage

Here's a simple example using Discord.js:

```typescript
import { Client } from 'discord.js';
import { LithiumXManager } from 'lithiumx';

const client = new Client({
    intents: ['Guilds', 'GuildVoiceStates']
});

const manager = new LithiumXManager({
    nodes: [
        {
            identifier: 'main',
            host: 'localhost',
            port: 2333,
            password: 'youshallnotpass',
            secure: false
        }
    ],
    send(guildId, packet) {
        const guild = client.guilds.cache.get(guildId);
        if (guild) guild.shard.send(packet);
    }
});

client.on('ready', () => {
    console.log('Bot is ready!');
    manager.init(client.user.id);
});

// Handle voice state updates
client.on('raw', (d) => manager.updateVoiceState(d));

// Playing music
const player = manager.create({
    guild: 'guild_id',
    voiceChannel: 'voice_channel_id',
    textChannel: 'text_channel_id'
});

await player.connect();
const result = await player.search('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
await player.play(result.tracks[0]);
```

## Next Steps

- Check out the [Installation Guide](./installation) for setup instructions
- Learn about [Filters](./classes/Filters) for audio effects
- Explore [Player Controls](./classes/LithiumXPlayer) for playback management
