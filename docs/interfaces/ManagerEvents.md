[**LithiumX v1.0.8**](../README.md)

***

[LithiumX](../globals.md) / ManagerEvents

# Interface: ManagerEvents

Defined in: [src/Structures/Manager.ts:479](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L479)

## Properties

### NodeConnect()

> **NodeConnect**: (`node`) => `void`

Defined in: [src/Structures/Manager.ts:482](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L482)

#### Parameters

##### node

[`LithiumXNode`](../classes/LithiumXNode.md)

#### Returns

`void`

***

### NodeCreate()

> **NodeCreate**: (`node`) => `void`

Defined in: [src/Structures/Manager.ts:480](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L480)

#### Parameters

##### node

[`LithiumXNode`](../classes/LithiumXNode.md)

#### Returns

`void`

***

### NodeDestroy()

> **NodeDestroy**: (`node`) => `void`

Defined in: [src/Structures/Manager.ts:481](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L481)

#### Parameters

##### node

[`LithiumXNode`](../classes/LithiumXNode.md)

#### Returns

`void`

***

### NodeDisconnect()

> **NodeDisconnect**: (`node`, `reason`) => `void`

Defined in: [src/Structures/Manager.ts:484](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L484)

#### Parameters

##### node

[`LithiumXNode`](../classes/LithiumXNode.md)

##### reason

###### code?

`number`

###### reason?

`string`

#### Returns

`void`

***

### NodeError()

> **NodeError**: (`node`, `error`) => `void`

Defined in: [src/Structures/Manager.ts:485](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L485)

#### Parameters

##### node

[`LithiumXNode`](../classes/LithiumXNode.md)

##### error

`Error`

#### Returns

`void`

***

### NodeRaw()

> **NodeRaw**: (`payload`) => `void`

Defined in: [src/Structures/Manager.ts:486](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L486)

#### Parameters

##### payload

`unknown`

#### Returns

`void`

***

### NodeReconnect()

> **NodeReconnect**: (`node`) => `void`

Defined in: [src/Structures/Manager.ts:483](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L483)

#### Parameters

##### node

[`LithiumXNode`](../classes/LithiumXNode.md)

#### Returns

`void`

***

### PlayerCreate()

> **PlayerCreate**: (`player`) => `void`

Defined in: [src/Structures/Manager.ts:487](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L487)

#### Parameters

##### player

[`LithiumXPlayer`](../classes/LithiumXPlayer.md)

#### Returns

`void`

***

### PlayerDestroy()

> **PlayerDestroy**: (`player`) => `void`

Defined in: [src/Structures/Manager.ts:488](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L488)

#### Parameters

##### player

[`LithiumXPlayer`](../classes/LithiumXPlayer.md)

#### Returns

`void`

***

### PlayerDisconnect()

> **PlayerDisconnect**: (`player`, `oldChannel`) => `void`

Defined in: [src/Structures/Manager.ts:491](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L491)

#### Parameters

##### player

[`LithiumXPlayer`](../classes/LithiumXPlayer.md)

##### oldChannel

`string`

#### Returns

`void`

***

### PlayerMove()

> **PlayerMove**: (`player`, `initChannel`, `newChannel`) => `void`

Defined in: [src/Structures/Manager.ts:490](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L490)

#### Parameters

##### player

[`LithiumXPlayer`](../classes/LithiumXPlayer.md)

##### initChannel

`string`

##### newChannel

`string`

#### Returns

`void`

***

### PlayerStateUpdate()

> **PlayerStateUpdate**: (`oldPlayer`, `newPlayer`) => `void`

Defined in: [src/Structures/Manager.ts:489](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L489)

#### Parameters

##### oldPlayer

[`LithiumXPlayer`](../classes/LithiumXPlayer.md)

##### newPlayer

[`LithiumXPlayer`](../classes/LithiumXPlayer.md)

#### Returns

`void`

***

### QueueEnd()

> **QueueEnd**: (`player`, `track`, `payload`) => `void`

Defined in: [src/Structures/Manager.ts:492](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L492)

#### Parameters

##### player

[`LithiumXPlayer`](../classes/LithiumXPlayer.md)

##### track

[`Track`](Track.md) | [`UnresolvedTrack`](UnresolvedTrack.md)

##### payload

[`TrackEndEvent`](TrackEndEvent.md)

#### Returns

`void`

***

### SocketClosed()

> **SocketClosed**: (`player`, `payload`) => `void`

Defined in: [src/Structures/Manager.ts:493](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L493)

#### Parameters

##### player

[`LithiumXPlayer`](../classes/LithiumXPlayer.md)

##### payload

[`WebSocketClosedEvent`](WebSocketClosedEvent.md)

#### Returns

`void`

***

### TrackEnd()

> **TrackEnd**: (`player`, `track`, `payload`) => `void`

Defined in: [src/Structures/Manager.ts:495](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L495)

#### Parameters

##### player

[`LithiumXPlayer`](../classes/LithiumXPlayer.md)

##### track

[`Track`](Track.md)

##### payload

[`TrackEndEvent`](TrackEndEvent.md)

#### Returns

`void`

***

### TrackError()

> **TrackError**: (`player`, `track`, `payload`) => `void`

Defined in: [src/Structures/Manager.ts:497](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L497)

#### Parameters

##### player

[`LithiumXPlayer`](../classes/LithiumXPlayer.md)

##### track

[`Track`](Track.md) | [`UnresolvedTrack`](UnresolvedTrack.md)

##### payload

[`TrackExceptionEvent`](TrackExceptionEvent.md)

#### Returns

`void`

***

### TrackStart()

> **TrackStart**: (`player`, `track`, `payload`) => `void`

Defined in: [src/Structures/Manager.ts:494](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L494)

#### Parameters

##### player

[`LithiumXPlayer`](../classes/LithiumXPlayer.md)

##### track

[`Track`](Track.md)

##### payload

[`TrackStartEvent`](TrackStartEvent.md)

#### Returns

`void`

***

### TrackStuck()

> **TrackStuck**: (`player`, `track`, `payload`) => `void`

Defined in: [src/Structures/Manager.ts:496](https://github.com/anantix-network/LithiumX/blob/6d83bed841f7c0d8766531c5310768bcb05e7f91/src/Structures/Manager.ts#L496)

#### Parameters

##### player

[`LithiumXPlayer`](../classes/LithiumXPlayer.md)

##### track

[`Track`](Track.md)

##### payload

[`TrackStuckEvent`](TrackStuckEvent.md)

#### Returns

`void`
