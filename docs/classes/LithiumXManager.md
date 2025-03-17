[**LithiumX v1.0.7**](README.md)

***

[LithiumX](globals.md) / LithiumXManager

# Class: LithiumXManager

Defined in: [src/Structures/Manager.ts:26](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L26)

The main hub for interacting with Lavalink and using Magmastream,

## Extends

- `TypedEmitter`\<[`ManagerEvents`](interfaces\ManagerEvents.md)\>

## Constructors

### new LithiumXManager()

> **new LithiumXManager**(`options`): `LithiumXManager`

Defined in: [src/Structures/Manager.ts:95](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L95)

Initiates the Manager class.

#### Parameters

##### options

[`ManagerOptions`](interfaces\ManagerOptions.md)

#### Returns

`LithiumXManager`

#### Overrides

`TypedEmitter<ManagerEvents>.constructor`

## Properties

### caches

> **caches**: `Collection`\<`string`, [`SearchResult`](interfaces\SearchResult.md)\>

Defined in: [src/Structures/Manager.ts:46](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L46)

***

### nodes

> `readonly` **nodes**: `Collection`\<`string`, [`LithiumXNode`](classes\LithiumXNode.md)\>

Defined in: [src/Structures/Manager.ts:42](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L42)

The map of nodes.

***

### options

> `readonly` **options**: [`ManagerOptions`](interfaces\ManagerOptions.md)

Defined in: [src/Structures/Manager.ts:44](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L44)

The options that were set.

***

### players

> `readonly` **players**: `Collection`\<`string`, [`LithiumXPlayer`](classes\LithiumXPlayer.md)\>

Defined in: [src/Structures/Manager.ts:40](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L40)

The map of players.

***

### DEFAULT\_SOURCES

> `readonly` `static` **DEFAULT\_SOURCES**: `Record`\<[`SearchPlatform`](type-aliases\SearchPlatform.md), `string`\>

Defined in: [src/Structures/Manager.ts:27](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L27)

## Accessors

### leastLoadNode

#### Get Signature

> **get** **leastLoadNode**(): `Collection`\<`string`, [`LithiumXNode`](classes\LithiumXNode.md)\>

Defined in: [src/Structures/Manager.ts:49](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L49)

Returns the nodes that has the least load.

##### Returns

`Collection`\<`string`, [`LithiumXNode`](classes\LithiumXNode.md)\>

***

### useableNodes

#### Get Signature

> **get** **useableNodes**(): [`LithiumXNode`](classes\LithiumXNode.md)

Defined in: [src/Structures/Manager.ts:87](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L87)

Returns the node to use.

##### Returns

[`LithiumXNode`](classes\LithiumXNode.md)

## Methods

### create()

> **create**(`options`): [`LithiumXPlayer`](classes\LithiumXPlayer.md)

Defined in: [src/Structures/Manager.ts:292](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L292)

Creates a player or returns one if it already exists.

#### Parameters

##### options

[`PlayerOptions`](interfaces\PlayerOptions.md)

#### Returns

[`LithiumXPlayer`](classes\LithiumXPlayer.md)

***

### createNode()

> **createNode**(`options`): [`LithiumXNode`](classes\LithiumXNode.md)

Defined in: [src/Structures/Manager.ts:320](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L320)

Creates a node or returns one if it already exists.

#### Parameters

##### options

[`NodeOptions`](interfaces\NodeOptions.md)

#### Returns

[`LithiumXNode`](classes\LithiumXNode.md)

***

### decodeTrack()

> **decodeTrack**(`track`): `Promise`\<[`TrackData`](interfaces\TrackData.md)\>

Defined in: [src/Structures/Manager.ts:283](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L283)

Decodes the base64 encoded track and returns a TrackData.

#### Parameters

##### track

`string`

#### Returns

`Promise`\<[`TrackData`](interfaces\TrackData.md)\>

***

### decodeTracks()

> **decodeTracks**(`tracks`): `Promise`\<[`TrackData`](interfaces\TrackData.md)[]\>

Defined in: [src/Structures/Manager.ts:263](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L263)

Decodes the base64 encoded tracks and returns a TrackData array.

#### Parameters

##### tracks

`string`[]

#### Returns

`Promise`\<[`TrackData`](interfaces\TrackData.md)[]\>

***

### destroy()

> **destroy**(`guild`): `void`

Defined in: [src/Structures/Manager.ts:312](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L312)

Destroys a player if it exists.

#### Parameters

##### guild

`string`

#### Returns

`void`

***

### destroyNode()

> **destroyNode**(`identifier`): `void`

Defined in: [src/Structures/Manager.ts:332](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L332)

Destroys a node if it exists.

#### Parameters

##### identifier

`string`

#### Returns

`void`

***

### get()

> **get**(`guild`): [`LithiumXPlayer`](classes\LithiumXPlayer.md)

Defined in: [src/Structures/Manager.ts:304](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L304)

Returns a player or undefined if it does not exist.

#### Parameters

##### guild

`string`

#### Returns

[`LithiumXPlayer`](classes\LithiumXPlayer.md)

***

### init()

> **init**(`clientId`?): `this`

Defined in: [src/Structures/Manager.ts:151](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L151)

Initiates the Manager.

#### Parameters

##### clientId?

`string`

#### Returns

`this`

***

### search()

> **search**(`query`, `requester`?): `Promise`\<[`SearchResult`](interfaces\SearchResult.md)\>

Defined in: [src/Structures/Manager.ts:174](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L174)

Searches the enabled sources based off the URL or the `source` property.

#### Parameters

##### query

`string` | [`SearchQuery`](interfaces\SearchQuery.md)

##### requester?

`string`

The user who requested the search.

#### Returns

`Promise`\<[`SearchResult`](interfaces\SearchResult.md)\>

The search result.

***

### updateVoiceState()

> **updateVoiceState**(`data`): `Promise`\<`void`\>

Defined in: [src/Structures/Manager.ts:343](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L343)

Sends voice data to the Lavalink server.

#### Parameters

##### data

[`VoiceState`](interfaces\VoiceState.md) | [`VoiceServer`](interfaces\VoiceServer.md) | [`VoicePacket`](interfaces\VoicePacket.md)

#### Returns

`Promise`\<`void`\>
