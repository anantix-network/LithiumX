[**LithiumX v1.0.6**](../README.md)

***

[LithiumX](../globals.md) / UnresolvedTrack

# Interface: UnresolvedTrack

Defined in: [src/Structures/Player.ts:623](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L623)

Unresolved tracks can't be played normally, they will resolve before playing into a Track.

## Extends

- `Partial`\<[`Track`](Track.md)\>

## Properties

### artworkUrl?

> `readonly` `optional` **artworkUrl**: `string`

Defined in: [src/Structures/Player.ts:582](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L582)

The artwork url of the track.

#### Inherited from

`Partial.artworkUrl`

***

### author?

> `optional` **author**: `string`

Defined in: [src/Structures/Player.ts:627](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L627)

The author to search against.

#### Overrides

`Partial.author`

***

### customData?

> `optional` **customData**: `Record`\<`string`, `unknown`\>

Defined in: [src/Structures/Player.ts:610](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L610)

Add your own data to the track.

#### Inherited from

`Partial.customData`

***

### duration?

> `optional` **duration**: `number`

Defined in: [src/Structures/Player.ts:629](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L629)

The duration to search within 1500 milliseconds of the results from YouTube.

#### Overrides

`Partial.duration`

***

### identifier?

> `readonly` `optional` **identifier**: `string`

Defined in: [src/Structures/Player.ts:588](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L588)

The identifier of the track.

#### Inherited from

`Partial.identifier`

***

### isrc?

> `readonly` `optional` **isrc**: `string`

Defined in: [src/Structures/Player.ts:594](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L594)

The ISRC of the track.

#### Inherited from

`Partial.isrc`

***

### isSeekable?

> `readonly` `optional` **isSeekable**: `boolean`

Defined in: [src/Structures/Player.ts:596](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L596)

If the track is seekable.

#### Inherited from

`Partial.isSeekable`

***

### isStream?

> `readonly` `optional` **isStream**: `boolean`

Defined in: [src/Structures/Player.ts:598](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L598)

If the track is a stream..

#### Inherited from

`Partial.isStream`

***

### pluginInfo?

> `optional` **pluginInfo**: [`TrackPluginInfo`](TrackPluginInfo.md)

Defined in: [src/Structures/Player.ts:608](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L608)

Additional track info provided by plugins.

#### Inherited from

`Partial.pluginInfo`

***

### requester?

> `readonly` `optional` **requester**: `string`

Defined in: [src/Structures/Player.ts:604](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L604)

The user that requested the track.

#### Inherited from

`Partial.requester`

***

### sourceName?

> `readonly` `optional` **sourceName**: [`TrackSourceName`](../type-aliases/TrackSourceName.md)

Defined in: [src/Structures/Player.ts:584](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L584)

The track source name.

#### Inherited from

`Partial.sourceName`

***

### thumbnail?

> `readonly` `optional` **thumbnail**: `string`

Defined in: [src/Structures/Player.ts:602](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L602)

The thumbnail of the track or null if it's a unsupported source.

#### Inherited from

`Partial.thumbnail`

***

### title

> **title**: `string`

Defined in: [src/Structures/Player.ts:625](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L625)

The title to search against.

#### Overrides

`Partial.title`

***

### track?

> `readonly` `optional` **track**: `string`

Defined in: [src/Structures/Player.ts:580](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L580)

The base64 encoded track.

#### Inherited from

`Partial.track`

***

### uri?

> `readonly` `optional` **uri**: `string`

Defined in: [src/Structures/Player.ts:600](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L600)

The uri of the track.

#### Inherited from

`Partial.uri`

## Methods

### displayThumbnail()?

> `optional` **displayThumbnail**(`size`?): `string`

Defined in: [src/Structures/Player.ts:606](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L606)

Displays the track thumbnail with optional size or null if it's a unsupported source.

#### Parameters

##### size?

[`Sizes`](../type-aliases/Sizes.md)

#### Returns

`string`

#### Inherited from

`Partial.displayThumbnail`

***

### resolve()

> **resolve**(): `Promise`\<`void`\>

Defined in: [src/Structures/Player.ts:631](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L631)

Resolves into a Track.

#### Returns

`Promise`\<`void`\>
