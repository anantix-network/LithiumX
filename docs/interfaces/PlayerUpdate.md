[**LithiumX v1.0.6**](../README.md)

***

[LithiumX](../globals.md) / PlayerUpdate

# Interface: PlayerUpdate

Defined in: [src/Structures/Utils.ts:340](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Utils.ts#L340)

## Properties

### guildId

> **guildId**: `string`

Defined in: [src/Structures/Utils.ts:343](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Utils.ts#L343)

The guild id of the player.

***

### op

> **op**: `"playerUpdate"`

Defined in: [src/Structures/Utils.ts:341](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Utils.ts#L341)

***

### state

> **state**: `object`

Defined in: [src/Structures/Utils.ts:344](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Utils.ts#L344)

#### connected

> **connected**: `boolean`

Whether Lavalink is connected to the voice gateway.

#### ping

> **ping**: `number`

The ping of the node to the Discord voice server in milliseconds (-1 if not connected).

#### position

> **position**: `number`

The position of the track in milliseconds.

#### time

> **time**: `number`

Unix timestamp in milliseconds.
