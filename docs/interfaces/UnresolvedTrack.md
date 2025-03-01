[**LithiumX v1.0.2**](../README.md)

***

[LithiumX](../globals.md) / UnresolvedTrack

# Interface: UnresolvedTrack

Defined in: [src/Structures/Player.ts:680](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L680)

Unresolved tracks can't be played normally, they will resolve before playing into a Track.

## Extends

- `Partial`\<[`Track`](Track.md)\>

## Properties

### artworkUrl?

> `readonly` `optional` **artworkUrl**: `string`

Defined in: [src/Structures/Player.ts:639](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L639)

The artwork url of the track.

#### Inherited from

`Partial.artworkUrl`

***

### author?

> `optional` **author**: `string`

Defined in: [src/Structures/Player.ts:684](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L684)

The author to search against.

#### Overrides

`Partial.author`

***

### customData?

> `optional` **customData**: `Record`\<`string`, `unknown`\>

Defined in: [src/Structures/Player.ts:667](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L667)

Add your own data to the track.

#### Inherited from

`Partial.customData`

***

### duration?

> `optional` **duration**: `number`

Defined in: [src/Structures/Player.ts:686](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L686)

The duration to search within 1500 milliseconds of the results from YouTube.

#### Overrides

`Partial.duration`

***

### identifier?

> `readonly` `optional` **identifier**: `string`

Defined in: [src/Structures/Player.ts:645](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L645)

The identifier of the track.

#### Inherited from

`Partial.identifier`

***

### isrc?

> `readonly` `optional` **isrc**: `string`

Defined in: [src/Structures/Player.ts:651](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L651)

The ISRC of the track.

#### Inherited from

`Partial.isrc`

***

### isSeekable?

> `readonly` `optional` **isSeekable**: `boolean`

Defined in: [src/Structures/Player.ts:653](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L653)

If the track is seekable.

#### Inherited from

`Partial.isSeekable`

***

### isStream?

> `readonly` `optional` **isStream**: `boolean`

Defined in: [src/Structures/Player.ts:655](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L655)

If the track is a stream..

#### Inherited from

`Partial.isStream`

***

### pluginInfo?

> `optional` **pluginInfo**: [`TrackPluginInfo`](TrackPluginInfo.md)

Defined in: [src/Structures/Player.ts:665](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L665)

Additional track info provided by plugins.

#### Inherited from

`Partial.pluginInfo`

***

### requester?

> `readonly` `optional` **requester**: `string`

Defined in: [src/Structures/Player.ts:661](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L661)

The user that requested the track.

#### Inherited from

`Partial.requester`

***

### sourceName?

> `readonly` `optional` **sourceName**: [`TrackSourceName`](../type-aliases/TrackSourceName.md)

Defined in: [src/Structures/Player.ts:641](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L641)

The track source name.

#### Inherited from

`Partial.sourceName`

***

### thumbnail?

> `readonly` `optional` **thumbnail**: `string`

Defined in: [src/Structures/Player.ts:659](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L659)

The thumbnail of the track or null if it's a unsupported source.

#### Inherited from

`Partial.thumbnail`

***

### title

> **title**: `string`

Defined in: [src/Structures/Player.ts:682](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L682)

The title to search against.

#### Overrides

`Partial.title`

***

### track?

> `readonly` `optional` **track**: `string`

Defined in: [src/Structures/Player.ts:637](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L637)

The base64 encoded track.

#### Inherited from

`Partial.track`

***

### uri?

> `readonly` `optional` **uri**: `string`

Defined in: [src/Structures/Player.ts:657](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L657)

The uri of the track.

#### Inherited from

`Partial.uri`

## Methods

### displayThumbnail()?

> `optional` **displayThumbnail**(`size`?): `string`

Defined in: [src/Structures/Player.ts:663](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L663)

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

Defined in: [src/Structures/Player.ts:688](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L688)

Resolves into a Track.

#### Returns

`Promise`\<`void`\>
