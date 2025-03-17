[**LithiumX v1.0.7**](README.md)

***

[LithiumX](globals.md) / NodeMessage

# Interface: NodeMessage

Defined in: [src/Structures/Utils.ts:293](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Utils.ts#L293)

## Extends

- [`NodeStats`](interfaces\NodeStats.md)

## Properties

### cpu

> **cpu**: [`CPUStats`](interfaces\CPUStats.md)

Defined in: [src/Structures/Node.ts:480](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Node.ts#L480)

The cpu stats for the node.

#### Inherited from

[`NodeStats`](interfaces\NodeStats.md).[`cpu`](interfaces\NodeStats.md#cpu)

***

### frameStats

> **frameStats**: [`FrameStats`](interfaces\FrameStats.md)

Defined in: [src/Structures/Node.ts:482](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Node.ts#L482)

The frame stats for the node.

#### Inherited from

[`NodeStats`](interfaces\NodeStats.md).[`frameStats`](interfaces\NodeStats.md#framestats)

***

### guildId

> **guildId**: `string`

Defined in: [src/Structures/Utils.ts:296](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Utils.ts#L296)

***

### memory

> **memory**: [`MemoryStats`](interfaces\MemoryStats.md)

Defined in: [src/Structures/Node.ts:478](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Node.ts#L478)

The memory stats for the node.

#### Inherited from

[`NodeStats`](interfaces\NodeStats.md).[`memory`](interfaces\NodeStats.md#memory)

***

### op

> **op**: `"stats"` \| `"playerUpdate"` \| `"event"`

Defined in: [src/Structures/Utils.ts:295](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Utils.ts#L295)

***

### players

> **players**: `number`

Defined in: [src/Structures/Node.ts:472](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Node.ts#L472)

The amount of players on the node.

#### Inherited from

[`NodeStats`](interfaces\NodeStats.md).[`players`](interfaces\NodeStats.md#players)

***

### playingPlayers

> **playingPlayers**: `number`

Defined in: [src/Structures/Node.ts:474](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Node.ts#L474)

The amount of playing players on the node.

#### Inherited from

[`NodeStats`](interfaces\NodeStats.md).[`playingPlayers`](interfaces\NodeStats.md#playingplayers)

***

### type

> **type**: [`PlayerEventType`](type-aliases\PlayerEventType.md)

Defined in: [src/Structures/Utils.ts:294](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Utils.ts#L294)

***

### uptime

> **uptime**: `number`

Defined in: [src/Structures/Node.ts:476](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Node.ts#L476)

The uptime for the node.

#### Inherited from

[`NodeStats`](interfaces\NodeStats.md).[`uptime`](interfaces\NodeStats.md#uptime)
