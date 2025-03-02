[**LithiumX v1.0.4**](../README.md)

***

[LithiumX](../globals.md) / LithiumXRest

# Class: LithiumXRest

Defined in: [src/Structures/Rest.ts:4](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Rest.ts#L4)

Handles the requests sent to the Lavalink REST API.

## Constructors

### new LithiumXRest()

> **new LithiumXRest**(`node`): [`LithiumXRest`](LithiumXRest.md)

Defined in: [src/Structures/Rest.ts:12](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Rest.ts#L12)

#### Parameters

##### node

[`LithiumXNode`](LithiumXNode.md)

#### Returns

[`LithiumXRest`](LithiumXRest.md)

## Methods

### delete()

> **delete**(`endpoint`): `Promise`\<`unknown`\>

Defined in: [src/Structures/Rest.ts:80](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Rest.ts#L80)

#### Parameters

##### endpoint

`string`

#### Returns

`Promise`\<`unknown`\>

***

### destroyPlayer()

> **destroyPlayer**(`guildId`): `Promise`\<`unknown`\>

Defined in: [src/Structures/Rest.ts:38](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Rest.ts#L38)

Sends a DELETE request to the server to destroy the player.

#### Parameters

##### guildId

`string`

#### Returns

`Promise`\<`unknown`\>

***

### get()

> **get**(`endpoint`): `Promise`\<`unknown`\>

Defined in: [src/Structures/Rest.ts:65](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Rest.ts#L65)

#### Parameters

##### endpoint

`string`

#### Returns

`Promise`\<`unknown`\>

***

### getAllPlayers()

> **getAllPlayers**(): `Promise`\<`unknown`\>

Defined in: [src/Structures/Rest.ts:28](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Rest.ts#L28)

Retrieves all the players that are currently running on the node.

#### Returns

`Promise`\<`unknown`\>

***

### patch()

> **patch**(`endpoint`, `body`): `Promise`\<`unknown`\>

Defined in: [src/Structures/Rest.ts:70](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Rest.ts#L70)

#### Parameters

##### endpoint

`string`

##### body

`unknown`

#### Returns

`Promise`\<`unknown`\>

***

### post()

> **post**(`endpoint`, `body`): `Promise`\<`unknown`\>

Defined in: [src/Structures/Rest.ts:75](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Rest.ts#L75)

#### Parameters

##### endpoint

`string`

##### body

`unknown`

#### Returns

`Promise`\<`unknown`\>

***

### setSessionId()

> **setSessionId**(`sessionId`): `string`

Defined in: [src/Structures/Rest.ts:22](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Rest.ts#L22)

Sets the session ID.

#### Parameters

##### sessionId

`string`

#### Returns

`string`

Returns the session ID.

***

### updatePlayer()

> **updatePlayer**(`options`): `Promise`\<`unknown`\>

Defined in: [src/Structures/Rest.ts:33](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Rest.ts#L33)

Sends a PATCH request to update player related data.

#### Parameters

##### options

`playOptions`

#### Returns

`Promise`\<`unknown`\>
