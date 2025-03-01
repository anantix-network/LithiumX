[**LithiumX v1.0.2**](../README.md)

***

[LithiumX](../globals.md) / Track

# Interface: Track

Defined in: [src/Structures/Player.ts:635](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L635)

If track partials are set some of these will be `undefined` as they were removed.

## Properties

### artworkUrl

> `readonly` **artworkUrl**: `string`

Defined in: [src/Structures/Player.ts:639](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L639)

The artwork url of the track.

***

### author

> **author**: `string`

Defined in: [src/Structures/Player.ts:647](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L647)

The author of the track.

***

### customData

> **customData**: `Record`\<`string`, `unknown`\>

Defined in: [src/Structures/Player.ts:667](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L667)

Add your own data to the track.

***

### duration

> `readonly` **duration**: `number`

Defined in: [src/Structures/Player.ts:649](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L649)

The duration of the track.

***

### identifier

> `readonly` **identifier**: `string`

Defined in: [src/Structures/Player.ts:645](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L645)

The identifier of the track.

***

### isrc

> `readonly` **isrc**: `string`

Defined in: [src/Structures/Player.ts:651](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L651)

The ISRC of the track.

***

### isSeekable

> `readonly` **isSeekable**: `boolean`

Defined in: [src/Structures/Player.ts:653](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L653)

If the track is seekable.

***

### isStream

> `readonly` **isStream**: `boolean`

Defined in: [src/Structures/Player.ts:655](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L655)

If the track is a stream..

***

### pluginInfo

> **pluginInfo**: [`TrackPluginInfo`](TrackPluginInfo.md)

Defined in: [src/Structures/Player.ts:665](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L665)

Additional track info provided by plugins.

***

### requester

> `readonly` **requester**: `string`

Defined in: [src/Structures/Player.ts:661](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L661)

The user that requested the track.

***

### sourceName

> `readonly` **sourceName**: [`TrackSourceName`](../type-aliases/TrackSourceName.md)

Defined in: [src/Structures/Player.ts:641](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L641)

The track source name.

***

### thumbnail

> `readonly` **thumbnail**: `string`

Defined in: [src/Structures/Player.ts:659](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L659)

The thumbnail of the track or null if it's a unsupported source.

***

### title

> **title**: `string`

Defined in: [src/Structures/Player.ts:643](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L643)

The title of the track.

***

### track

> `readonly` **track**: `string`

Defined in: [src/Structures/Player.ts:637](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L637)

The base64 encoded track.

***

### uri

> `readonly` **uri**: `string`

Defined in: [src/Structures/Player.ts:657](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L657)

The uri of the track.

## Methods

### displayThumbnail()

> **displayThumbnail**(`size`?): `string`

Defined in: [src/Structures/Player.ts:663](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L663)

Displays the track thumbnail with optional size or null if it's a unsupported source.

#### Parameters

##### size?

[`Sizes`](../type-aliases/Sizes.md)

#### Returns

`string`
