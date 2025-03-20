[**LithiumX v1.0.8**](../README.md)

***

[LithiumX](../globals.md) / NodeMessage

# Interface: NodeMessage

Defined in: [src/Structures/Utils.ts:293](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Utils.ts#L293)

## Extends

- [`NodeStats`](NodeStats.md)

## Properties

### cpu

> **cpu**: [`CPUStats`](CPUStats.md)

Defined in: [src/Structures/Node.ts:480](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Node.ts#L480)

The cpu stats for the node.

#### Inherited from

[`NodeStats`](NodeStats.md).[`cpu`](NodeStats.md#cpu)

***

### frameStats

> **frameStats**: [`FrameStats`](FrameStats.md)

Defined in: [src/Structures/Node.ts:482](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Node.ts#L482)

The frame stats for the node.

#### Inherited from

[`NodeStats`](NodeStats.md).[`frameStats`](NodeStats.md#framestats)

***

### guildId

> **guildId**: `string`

Defined in: [src/Structures/Utils.ts:296](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Utils.ts#L296)

***

### memory

> **memory**: [`MemoryStats`](MemoryStats.md)

Defined in: [src/Structures/Node.ts:478](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Node.ts#L478)

The memory stats for the node.

#### Inherited from

[`NodeStats`](NodeStats.md).[`memory`](NodeStats.md#memory)

***

### op

> **op**: `"stats"` \| `"playerUpdate"` \| `"event"`

Defined in: [src/Structures/Utils.ts:295](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Utils.ts#L295)

***

### players

> **players**: `number`

Defined in: [src/Structures/Node.ts:472](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Node.ts#L472)

The amount of players on the node.

#### Inherited from

[`NodeStats`](NodeStats.md).[`players`](NodeStats.md#players)

***

### playingPlayers

> **playingPlayers**: `number`

Defined in: [src/Structures/Node.ts:474](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Node.ts#L474)

The amount of playing players on the node.

#### Inherited from

[`NodeStats`](NodeStats.md).[`playingPlayers`](NodeStats.md#playingplayers)

***

### type

> **type**: [`PlayerEventType`](../type-aliases/PlayerEventType.md)

Defined in: [src/Structures/Utils.ts:294](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Utils.ts#L294)

***

### uptime

> **uptime**: `number`

Defined in: [src/Structures/Node.ts:476](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Node.ts#L476)

The uptime for the node.

#### Inherited from

[`NodeStats`](NodeStats.md).[`uptime`](NodeStats.md#uptime)
