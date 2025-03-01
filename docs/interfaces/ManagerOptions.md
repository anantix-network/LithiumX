[**LithiumX v1.0.2**](../README.md)

***

[LithiumX](../globals.md) / ManagerOptions

# Interface: ManagerOptions

Defined in: [src/Structures/Manager.ts:402](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L402)

## Properties

### autoPlay?

> `optional` **autoPlay**: `boolean`

Defined in: [src/Structures/Manager.ts:418](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L418)

Whether players should automatically play the next song.

***

### caches

> **caches**: `object`

Defined in: [src/Structures/Manager.ts:425](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L425)

#### enabled

> **enabled**: `boolean`

Whether to cache the search results.

#### time

> **time**: `number`

The time to cache the search results.

***

### clientId?

> `optional` **clientId**: `string`

Defined in: [src/Structures/Manager.ts:410](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L410)

The client ID to use.

***

### clientName?

> `optional` **clientName**: `string`

Defined in: [src/Structures/Manager.ts:412](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L412)

Value to use for the `Client-Name` header.

***

### defaultSearchPlatform?

> `optional` **defaultSearchPlatform**: [`SearchPlatform`](../type-aliases/SearchPlatform.md)

Defined in: [src/Structures/Manager.ts:422](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L422)

The default search platform to use, can be "youtube", "youtube music", "soundcloud" or deezer.

***

### nodes?

> `optional` **nodes**: [`NodeOptions`](NodeOptions.md)[]

Defined in: [src/Structures/Manager.ts:408](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L408)

The array of nodes to connect to.

***

### plugins?

> `optional` **plugins**: [`Plugin`](../classes/Plugin.md)[]

Defined in: [src/Structures/Manager.ts:416](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L416)

A array of plugins to use.

***

### replaceYouTubeCredentials?

> `optional` **replaceYouTubeCredentials**: `boolean`

Defined in: [src/Structures/Manager.ts:424](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L424)

Whether the YouTube video titles should be replaced if the Author does not exactly match.

***

### shards?

> `optional` **shards**: `number`

Defined in: [src/Structures/Manager.ts:414](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L414)

The shard count.

***

### trackPartial?

> `optional` **trackPartial**: `string`[]

Defined in: [src/Structures/Manager.ts:420](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L420)

An array of track properties to keep. `track` will always be present.

***

### useNode?

> `optional` **useNode**: `"leastLoad"` \| `"leastPlayers"`

Defined in: [src/Structures/Manager.ts:406](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L406)

Use the least amount of players or least load?

***

### usePriority?

> `optional` **usePriority**: `boolean`

Defined in: [src/Structures/Manager.ts:404](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L404)

Use priority mode over least amount of player or load?

## Methods

### send()

> **send**(`id`, `payload`): `void`

Defined in: [src/Structures/Manager.ts:436](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Manager.ts#L436)

Function to send data to the websocket.

#### Parameters

##### id

`string`

##### payload

[`Payload`](Payload.md)

#### Returns

`void`
