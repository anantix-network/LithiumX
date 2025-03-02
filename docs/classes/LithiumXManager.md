[**LithiumX v1.0.4**](../README.md)

***

[LithiumX](../globals.md) / LithiumXManager

# Class: LithiumXManager

Defined in: [src/Structures/Manager.ts:26](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L26)

The main hub for interacting with Lavalink and using Magmastream,

## Extends

- `TypedEmitter`\<[`ManagerEvents`](../interfaces/ManagerEvents.md)\>

## Constructors

### new LithiumXManager()

> **new LithiumXManager**(`options`): [`LithiumXManager`](LithiumXManager.md)

Defined in: [src/Structures/Manager.ts:95](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L95)

Initiates the Manager class.

#### Parameters

##### options

[`ManagerOptions`](../interfaces/ManagerOptions.md)

#### Returns

[`LithiumXManager`](LithiumXManager.md)

#### Overrides

`TypedEmitter<ManagerEvents>.constructor`

## Properties

### caches

> **caches**: `Collection`\<`string`, [`SearchResult`](../interfaces/SearchResult.md)\>

Defined in: [src/Structures/Manager.ts:46](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L46)

***

### nodes

> `readonly` **nodes**: `Collection`\<`string`, [`LithiumXNode`](LithiumXNode.md)\>

Defined in: [src/Structures/Manager.ts:42](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L42)

The map of nodes.

***

### options

> `readonly` **options**: [`ManagerOptions`](../interfaces/ManagerOptions.md)

Defined in: [src/Structures/Manager.ts:44](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L44)

The options that were set.

***

### players

> `readonly` **players**: `Collection`\<`string`, [`LithiumXPlayer`](LithiumXPlayer.md)\>

Defined in: [src/Structures/Manager.ts:40](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L40)

The map of players.

***

### DEFAULT\_SOURCES

> `readonly` `static` **DEFAULT\_SOURCES**: `Record`\<[`SearchPlatform`](../type-aliases/SearchPlatform.md), `string`\>

Defined in: [src/Structures/Manager.ts:27](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L27)

## Accessors

### leastLoadNode

#### Get Signature

> **get** **leastLoadNode**(): `Collection`\<`string`, [`LithiumXNode`](LithiumXNode.md)\>

Defined in: [src/Structures/Manager.ts:49](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L49)

Returns the nodes that has the least load.

##### Returns

`Collection`\<`string`, [`LithiumXNode`](LithiumXNode.md)\>

***

### useableNodes

#### Get Signature

> **get** **useableNodes**(): [`LithiumXNode`](LithiumXNode.md)

Defined in: [src/Structures/Manager.ts:87](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L87)

Returns the node to use.

##### Returns

[`LithiumXNode`](LithiumXNode.md)

## Methods

### create()

> **create**(`options`): [`LithiumXPlayer`](LithiumXPlayer.md)

Defined in: [src/Structures/Manager.ts:290](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L290)

Creates a player or returns one if it already exists.

#### Parameters

##### options

[`PlayerOptions`](../interfaces/PlayerOptions.md)

#### Returns

[`LithiumXPlayer`](LithiumXPlayer.md)

***

### createNode()

> **createNode**(`options`): [`LithiumXNode`](LithiumXNode.md)

Defined in: [src/Structures/Manager.ts:318](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L318)

Creates a node or returns one if it already exists.

#### Parameters

##### options

[`NodeOptions`](../interfaces/NodeOptions.md)

#### Returns

[`LithiumXNode`](LithiumXNode.md)

***

### decodeTrack()

> **decodeTrack**(`track`): `Promise`\<[`TrackData`](../interfaces/TrackData.md)\>

Defined in: [src/Structures/Manager.ts:281](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L281)

Decodes the base64 encoded track and returns a TrackData.

#### Parameters

##### track

`string`

#### Returns

`Promise`\<[`TrackData`](../interfaces/TrackData.md)\>

***

### decodeTracks()

> **decodeTracks**(`tracks`): `Promise`\<[`TrackData`](../interfaces/TrackData.md)[]\>

Defined in: [src/Structures/Manager.ts:261](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L261)

Decodes the base64 encoded tracks and returns a TrackData array.

#### Parameters

##### tracks

`string`[]

#### Returns

`Promise`\<[`TrackData`](../interfaces/TrackData.md)[]\>

***

### destroy()

> **destroy**(`guild`): `void`

Defined in: [src/Structures/Manager.ts:310](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L310)

Destroys a player if it exists.

#### Parameters

##### guild

`string`

#### Returns

`void`

***

### destroyNode()

> **destroyNode**(`identifier`): `void`

Defined in: [src/Structures/Manager.ts:330](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L330)

Destroys a node if it exists.

#### Parameters

##### identifier

`string`

#### Returns

`void`

***

### get()

> **get**(`guild`): [`LithiumXPlayer`](LithiumXPlayer.md)

Defined in: [src/Structures/Manager.ts:302](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L302)

Returns a player or undefined if it does not exist.

#### Parameters

##### guild

`string`

#### Returns

[`LithiumXPlayer`](LithiumXPlayer.md)

***

### init()

> **init**(`clientId`?): `this`

Defined in: [src/Structures/Manager.ts:149](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L149)

Initiates the Manager.

#### Parameters

##### clientId?

`string`

#### Returns

`this`

***

### search()

> **search**(`query`, `requester`?): `Promise`\<[`SearchResult`](../interfaces/SearchResult.md)\>

Defined in: [src/Structures/Manager.ts:172](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L172)

Searches the enabled sources based off the URL or the `source` property.

#### Parameters

##### query

`string` | [`SearchQuery`](../interfaces/SearchQuery.md)

##### requester?

`string`

The user who requested the search.

#### Returns

`Promise`\<[`SearchResult`](../interfaces/SearchResult.md)\>

The search result.

***

### updateVoiceState()

> **updateVoiceState**(`data`): `Promise`\<`void`\>

Defined in: [src/Structures/Manager.ts:341](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Manager.ts#L341)

Sends voice data to the Lavalink server.

#### Parameters

##### data

[`VoiceState`](../interfaces/VoiceState.md) | [`VoiceServer`](../interfaces/VoiceServer.md) | [`VoicePacket`](../interfaces/VoicePacket.md)

#### Returns

`Promise`\<`void`\>
