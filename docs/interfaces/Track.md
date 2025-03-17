[**LithiumX v1.0.7**](README.md)

***

[LithiumX](globals.md) / Track

# Interface: Track

Defined in: [src/Structures/Player.ts:578](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L578)

If track partials are set some of these will be `undefined` as they were removed.

## Properties

### artworkUrl

> `readonly` **artworkUrl**: `string`

Defined in: [src/Structures/Player.ts:582](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L582)

The artwork url of the track.

***

### author

> **author**: `string`

Defined in: [src/Structures/Player.ts:590](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L590)

The author of the track.

***

### customData

> **customData**: `Record`\<`string`, `unknown`\>

Defined in: [src/Structures/Player.ts:610](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L610)

Add your own data to the track.

***

### duration

> `readonly` **duration**: `number`

Defined in: [src/Structures/Player.ts:592](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L592)

The duration of the track.

***

### identifier

> `readonly` **identifier**: `string`

Defined in: [src/Structures/Player.ts:588](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L588)

The identifier of the track.

***

### isrc

> `readonly` **isrc**: `string`

Defined in: [src/Structures/Player.ts:594](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L594)

The ISRC of the track.

***

### isSeekable

> `readonly` **isSeekable**: `boolean`

Defined in: [src/Structures/Player.ts:596](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L596)

If the track is seekable.

***

### isStream

> `readonly` **isStream**: `boolean`

Defined in: [src/Structures/Player.ts:598](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L598)

If the track is a stream..

***

### pluginInfo

> **pluginInfo**: [`TrackPluginInfo`](interfaces\TrackPluginInfo.md)

Defined in: [src/Structures/Player.ts:608](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L608)

Additional track info provided by plugins.

***

### requester

> `readonly` **requester**: `string`

Defined in: [src/Structures/Player.ts:604](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L604)

The user that requested the track.

***

### sourceName

> `readonly` **sourceName**: [`TrackSourceName`](type-aliases\TrackSourceName.md)

Defined in: [src/Structures/Player.ts:584](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L584)

The track source name.

***

### thumbnail

> `readonly` **thumbnail**: `string`

Defined in: [src/Structures/Player.ts:602](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L602)

The thumbnail of the track or null if it's a unsupported source.

***

### title

> **title**: `string`

Defined in: [src/Structures/Player.ts:586](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L586)

The title of the track.

***

### track

> `readonly` **track**: `string`

Defined in: [src/Structures/Player.ts:580](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L580)

The base64 encoded track.

***

### uri

> `readonly` **uri**: `string`

Defined in: [src/Structures/Player.ts:600](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L600)

The uri of the track.

## Methods

### displayThumbnail()

> **displayThumbnail**(`size`?): `string`

Defined in: [src/Structures/Player.ts:606](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Player.ts#L606)

Displays the track thumbnail with optional size or null if it's a unsupported source.

#### Parameters

##### size?

[`Sizes`](type-aliases\Sizes.md)

#### Returns

`string`
