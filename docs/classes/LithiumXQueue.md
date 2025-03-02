[**LithiumX v1.0.4**](../README.md)

***

[LithiumX](../globals.md) / LithiumXQueue

# Class: LithiumXQueue

Defined in: [src/Structures/Queue.ts:7](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Queue.ts#L7)

The player's queue, the `current` property is the currently playing track, think of the rest as the up-coming tracks.

## Extends

- `Array`\<[`Track`](../interfaces/Track.md) \| [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md)\>

## Indexable

\[`n`: `number`\]: [`Track`](../interfaces/Track.md) \| [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md)

## Constructors

### new LithiumXQueue()

> **new LithiumXQueue**(`arrayLength`): [`LithiumXQueue`](LithiumXQueue.md)

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1508

#### Parameters

##### arrayLength

`number`

#### Returns

[`LithiumXQueue`](LithiumXQueue.md)

#### Inherited from

Array\<Track \| UnresolvedTrack\>.constructor

### new LithiumXQueue()

> **new LithiumXQueue**(...`items`): [`LithiumXQueue`](LithiumXQueue.md)

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1509

#### Parameters

##### items

...([`Track`](../interfaces/Track.md) \| [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md))[]

#### Returns

[`LithiumXQueue`](LithiumXQueue.md)

#### Inherited from

Array\<Track \| UnresolvedTrack\>.constructor

## Properties

### current

> **current**: [`Track`](../interfaces/Track.md) \| [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md) = `null`

Defined in: [src/Structures/Queue.ts:25](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Queue.ts#L25)

The current track

***

### previous

> **previous**: [`Track`](../interfaces/Track.md) \| [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md) = `null`

Defined in: [src/Structures/Queue.ts:28](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Queue.ts#L28)

The previous track

## Accessors

### duration

#### Get Signature

> **get** **duration**(): `number`

Defined in: [src/Structures/Queue.ts:9](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Queue.ts#L9)

The total duration of the queue.

##### Returns

`number`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [src/Structures/Queue.ts:20](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Queue.ts#L20)

The size of tracks in the queue.

##### Returns

`number`

***

### totalSize

#### Get Signature

> **get** **totalSize**(): `number`

Defined in: [src/Structures/Queue.ts:15](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Queue.ts#L15)

The total size of tracks in the queue including the current track.

##### Returns

`number`

## Methods

### add()

> **add**(`track`, `offset`?): `void`

Defined in: [src/Structures/Queue.ts:35](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Queue.ts#L35)

Adds a track to the queue.

#### Parameters

##### track

[`Track`](../interfaces/Track.md) | [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md) | ([`Track`](../interfaces/Track.md) \| [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md))[]

##### offset?

`number`

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [src/Structures/Queue.ts:88](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Queue.ts#L88)

Clears the queue.

#### Returns

`void`

***

### equalizedShuffle()

> **equalizedShuffle**(): `void`

Defined in: [src/Structures/Queue.ts:100](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Queue.ts#L100)

#### Returns

`void`

***

### remove()

#### Call Signature

> **remove**(`position`?): ([`Track`](../interfaces/Track.md) \| [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md))[]

Defined in: [src/Structures/Queue.ts:69](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Queue.ts#L69)

Removes a track from the queue. Defaults to the first track, returning the removed track, EXCLUDING THE `current` TRACK.

##### Parameters

###### position?

`number`

##### Returns

([`Track`](../interfaces/Track.md) \| [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md))[]

#### Call Signature

> **remove**(`start`, `end`): ([`Track`](../interfaces/Track.md) \| [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md))[]

Defined in: [src/Structures/Queue.ts:76](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Queue.ts#L76)

Removes an amount of tracks using a exclusive start and end exclusive index, returning the removed tracks, EXCLUDING THE `current` TRACK.

##### Parameters

###### start

`number`

###### end

`number`

##### Returns

([`Track`](../interfaces/Track.md) \| [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md))[]

***

### shuffle()

> **shuffle**(): `void`

Defined in: [src/Structures/Queue.ts:93](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Queue.ts#L93)

Shuffles the queue.

#### Returns

`void`
