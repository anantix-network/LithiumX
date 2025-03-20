[**LithiumX v1.0.8**](../README.md)

***

[LithiumX](../globals.md) / ManagerOptions

# Interface: ManagerOptions

Defined in: [src/Structures/Manager.ts:399](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L399)

## Properties

### autoPlay?

> `optional` **autoPlay**: `boolean`

Defined in: [src/Structures/Manager.ts:415](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L415)

Whether players should automatically play the next song.

***

### caches

> **caches**: `object`

Defined in: [src/Structures/Manager.ts:422](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L422)

#### enabled

> **enabled**: `boolean`

Whether to cache the search results.

#### time

> **time**: `number`

The time to cache the search results.

***

### clientId?

> `optional` **clientId**: `string`

Defined in: [src/Structures/Manager.ts:407](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L407)

The client ID to use.

***

### clientName?

> `optional` **clientName**: `string`

Defined in: [src/Structures/Manager.ts:409](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L409)

Value to use for the `Client-Name` header.

***

### defaultSearchPlatform?

> `optional` **defaultSearchPlatform**: [`SearchPlatform`](../type-aliases/SearchPlatform.md)

Defined in: [src/Structures/Manager.ts:419](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L419)

The default search platform to use, can be "youtube", "youtube music", "soundcloud" or deezer.

***

### nodes?

> `optional` **nodes**: [`NodeOptions`](NodeOptions.md)[]

Defined in: [src/Structures/Manager.ts:405](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L405)

The array of nodes to connect to.

***

### plugins?

> `optional` **plugins**: [`Plugin`](../classes/Plugin.md)[]

Defined in: [src/Structures/Manager.ts:413](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L413)

A array of plugins to use.

***

### replaceYouTubeCredentials?

> `optional` **replaceYouTubeCredentials**: `boolean`

Defined in: [src/Structures/Manager.ts:421](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L421)

Whether the YouTube video titles should be replaced if the Author does not exactly match.

***

### shards?

> `optional` **shards**: `number`

Defined in: [src/Structures/Manager.ts:411](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L411)

The shard count.

***

### trackPartial?

> `optional` **trackPartial**: `string`[]

Defined in: [src/Structures/Manager.ts:417](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L417)

An array of track properties to keep. `track` will always be present.

***

### useNode?

> `optional` **useNode**: `"leastLoad"` \| `"leastPlayers"`

Defined in: [src/Structures/Manager.ts:403](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L403)

Use the least amount of players or least load?

***

### usePriority?

> `optional` **usePriority**: `boolean`

Defined in: [src/Structures/Manager.ts:401](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L401)

Use priority mode over least amount of player or load?

## Methods

### send()

> **send**(`id`, `payload`): `void`

Defined in: [src/Structures/Manager.ts:433](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L433)

Function to send data to the websocket.

#### Parameters

##### id

`string`

##### payload

[`Payload`](Payload.md)

#### Returns

`void`
