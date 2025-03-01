[**LithiumX v1.0.2**](../README.md)

***

[LithiumX](../globals.md) / LithiumXRest

# Class: LithiumXRest

Defined in: [src/Structures/Rest.ts:5](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Rest.ts#L5)

Handles the requests sent to the Lavalink REST API.

## Constructors

### new LithiumXRest()

> **new LithiumXRest**(`node`): [`LithiumXRest`](LithiumXRest.md)

Defined in: [src/Structures/Rest.ts:15](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Rest.ts#L15)

#### Parameters

##### node

[`LithiumXNode`](LithiumXNode.md)

#### Returns

[`LithiumXRest`](LithiumXRest.md)

## Methods

### delete()

> **delete**(`endpoint`): `Promise`\<`unknown`\>

Defined in: [src/Structures/Rest.ts:85](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Rest.ts#L85)

#### Parameters

##### endpoint

`string`

#### Returns

`Promise`\<`unknown`\>

***

### destroyPlayer()

> **destroyPlayer**(`guildId`): `Promise`\<`unknown`\>

Defined in: [src/Structures/Rest.ts:42](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Rest.ts#L42)

Sends a DELETE request to the server to destroy the player.

#### Parameters

##### guildId

`string`

#### Returns

`Promise`\<`unknown`\>

***

### get()

> **get**(`endpoint`): `Promise`\<`unknown`\>

Defined in: [src/Structures/Rest.ts:70](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Rest.ts#L70)

#### Parameters

##### endpoint

`string`

#### Returns

`Promise`\<`unknown`\>

***

### getAllPlayers()

> **getAllPlayers**(): `Promise`\<`unknown`\>

Defined in: [src/Structures/Rest.ts:32](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Rest.ts#L32)

Retrieves all the players that are currently running on the node.

#### Returns

`Promise`\<`unknown`\>

***

### patch()

> **patch**(`endpoint`, `body`): `Promise`\<`unknown`\>

Defined in: [src/Structures/Rest.ts:75](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Rest.ts#L75)

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

Defined in: [src/Structures/Rest.ts:80](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Rest.ts#L80)

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

Defined in: [src/Structures/Rest.ts:26](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Rest.ts#L26)

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

Defined in: [src/Structures/Rest.ts:37](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Rest.ts#L37)

Sends a PATCH request to update player related data.

#### Parameters

##### options

`playOptions`

#### Returns

`Promise`\<`unknown`\>
