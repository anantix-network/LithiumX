[**LithiumX v1.0.4**](../README.md)

***

[LithiumX](../globals.md) / TrackUtils

# Class: `abstract` TrackUtils

Defined in: [src/Structures/Utils.ts:16](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Utils.ts#L16)

## Constructors

### new TrackUtils()

> **new TrackUtils**(): [`TrackUtils`](TrackUtils.md)

#### Returns

[`TrackUtils`](TrackUtils.md)

## Properties

### trackPartial

> `static` **trackPartial**: `string`[] = `null`

Defined in: [src/Structures/Utils.ts:17](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Utils.ts#L17)

## Methods

### build()

> `static` **build**(`data`, `requester`?): [`Track`](../interfaces/Track.md)

Defined in: [src/Structures/Utils.ts:72](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Utils.ts#L72)

Builds a Track from the raw data from Lavalink and a optional requester.

#### Parameters

##### data

[`TrackData`](../interfaces/TrackData.md)

The raw data from Lavalink.

##### requester?

`string`

The user who requested the track.

#### Returns

[`Track`](../interfaces/Track.md)

***

### buildUnresolved()

> `static` **buildUnresolved**(`query`, `requester`?): [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md)

Defined in: [src/Structures/Utils.ts:123](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Utils.ts#L123)

Builds a UnresolvedTrack to be resolved before being played  .

#### Parameters

##### query

The query to search for.

`string` | [`UnresolvedQuery`](../interfaces/UnresolvedQuery.md)

##### requester?

`string`

The user who requested the track.

#### Returns

[`UnresolvedTrack`](../interfaces/UnresolvedTrack.md)

***

### getClosestTrack()

> `static` **getClosestTrack**(`unresolvedTrack`): `Promise`\<[`Track`](../interfaces/Track.md)\>

Defined in: [src/Structures/Utils.ts:146](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Utils.ts#L146)

#### Parameters

##### unresolvedTrack

[`UnresolvedTrack`](../interfaces/UnresolvedTrack.md)

#### Returns

`Promise`\<[`Track`](../interfaces/Track.md)\>

***

### isTrack()

> `static` **isTrack**(`track`): `boolean`

Defined in: [src/Structures/Utils.ts:62](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Utils.ts#L62)

Checks if the provided argument is a valid Track.

#### Parameters

##### track

`unknown`

#### Returns

`boolean`

***

### isUnresolvedTrack()

> `static` **isUnresolvedTrack**(`track`): `boolean`

Defined in: [src/Structures/Utils.ts:53](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Utils.ts#L53)

Checks if the provided argument is a valid UnresolvedTrack.

#### Parameters

##### track

`unknown`

#### Returns

`boolean`

***

### setTrackPartial()

> `static` **setTrackPartial**(`partial`): `void`

Defined in: [src/Structures/Utils.ts:25](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Utils.ts#L25)

#### Parameters

##### partial

`string`[]

#### Returns

`void`

***

### validate()

> `static` **validate**(`trackOrTracks`): `boolean`

Defined in: [src/Structures/Utils.ts:36](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Utils.ts#L36)

Checks if the provided argument is a valid Track or UnresolvedTrack, if provided an array then every element will be checked.

#### Parameters

##### trackOrTracks

`unknown`

#### Returns

`boolean`
