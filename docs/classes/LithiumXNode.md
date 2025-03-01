[**LithiumX v1.0.2**](../README.md)

***

[LithiumX](../globals.md) / LithiumXNode

# Class: LithiumXNode

Defined in: [src/Structures/Node.ts:18](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L18)

## Constructors

### new LithiumXNode()

> **new LithiumXNode**(`options`): [`LithiumXNode`](LithiumXNode.md)

Defined in: [src/Structures/Node.ts:53](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L53)

Creates an instance of Node.

#### Parameters

##### options

[`NodeOptions`](../interfaces/NodeOptions.md)

#### Returns

[`LithiumXNode`](LithiumXNode.md)

## Properties

### manager

> **manager**: [`LithiumXManager`](LithiumXManager.md)

Defined in: [src/Structures/Node.ts:23](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L23)

***

### options

> **options**: [`NodeOptions`](../interfaces/NodeOptions.md)

Defined in: [src/Structures/Node.ts:53](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L53)

***

### rest

> `readonly` **rest**: [`LithiumXRest`](LithiumXRest.md)

Defined in: [src/Structures/Node.ts:27](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L27)

The REST instance.

***

### sessionId

> **sessionId**: `string`

Defined in: [src/Structures/Node.ts:25](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L25)

The node's session ID.

***

### socket

> **socket**: `WebSocket` = `null`

Defined in: [src/Structures/Node.ts:20](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L20)

The socket for the node.

***

### stats

> **stats**: [`NodeStats`](../interfaces/NodeStats.md)

Defined in: [src/Structures/Node.ts:22](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L22)

The stats for the node.

## Accessors

### address

#### Get Signature

> **get** **address**(): `string`

Defined in: [src/Structures/Node.ts:40](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L40)

Returns the address for this node.

##### Returns

`string`

***

### connected

#### Get Signature

> **get** **connected**(): `boolean`

Defined in: [src/Structures/Node.ts:34](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L34)

Returns if connected to the Node.

##### Returns

`boolean`

## Methods

### connect()

> **connect**(): `void`

Defined in: [src/Structures/Node.ts:106](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L106)

Connects to the Node.

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: [src/Structures/Node.ts:124](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L124)

Destroys the Node and all players connected with it.

#### Returns

`void`

***

### extractSpotifyArtistID()

> **extractSpotifyArtistID**(`url`): `string`

Defined in: [src/Structures/Node.ts:288](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L288)

#### Parameters

##### url

`string`

#### Returns

`string`

***

### extractSpotifyTrackID()

> **extractSpotifyTrackID**(`url`): `string`

Defined in: [src/Structures/Node.ts:282](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Node.ts#L282)

#### Parameters

##### url

`string`

#### Returns

`string`
