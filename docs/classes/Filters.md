[**LithiumX v1.0.2**](../README.md)

***

[LithiumX](../globals.md) / Filters

# Class: Filters

Defined in: [src/Structures/Filters.ts:4](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L4)

## Constructors

### new Filters()

> **new Filters**(`player`): [`Filters`](Filters.md)

Defined in: [src/Structures/Filters.ts:18](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L18)

#### Parameters

##### player

[`LithiumXPlayer`](LithiumXPlayer.md)

#### Returns

[`Filters`](Filters.md)

## Properties

### distortion

> **distortion**: `DistortionOptions`

Defined in: [src/Structures/Filters.ts:5](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L5)

***

### equalizer

> **equalizer**: [`Band`](../interfaces/Band.md)[]

Defined in: [src/Structures/Filters.ts:6](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L6)

***

### karaoke

> **karaoke**: `KaraokeOptions`

Defined in: [src/Structures/Filters.ts:7](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L7)

***

### player

> **player**: [`LithiumXPlayer`](LithiumXPlayer.md)

Defined in: [src/Structures/Filters.ts:8](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L8)

***

### rotation

> **rotation**: `RotationOptions`

Defined in: [src/Structures/Filters.ts:9](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L9)

***

### timescale

> **timescale**: `TimescaleOptions`

Defined in: [src/Structures/Filters.ts:10](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L10)

***

### vibrato

> **vibrato**: `VibratoOptions`

Defined in: [src/Structures/Filters.ts:11](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L11)

***

### volume

> **volume**: `number`

Defined in: [src/Structures/Filters.ts:12](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L12)

## Methods

### bassBoost()

> **bassBoost**(): `this`

Defined in: [src/Structures/Filters.ts:90](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L90)

Applies the bass boost effect.

#### Returns

`this`

***

### clearFilters()

> **clearFilters**(): `Promise`\<[`Filters`](Filters.md)\>

Defined in: [src/Structures/Filters.ts:175](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L175)

Removes the audio effects and resets the filter status.

#### Returns

`Promise`\<[`Filters`](Filters.md)\>

***

### distort()

> **distort**(): `this`

Defined in: [src/Structures/Filters.ts:133](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L133)

Applies the distortion audio effect.

#### Returns

`this`

***

### eightD()

> **eightD**(): `this`

Defined in: [src/Structures/Filters.ts:85](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L85)

Applies the eight dimension audio effect.

#### Returns

`this`

***

### getFilterStatus()

> **getFilterStatus**(`filter`): `boolean`

Defined in: [src/Structures/Filters.ts:202](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L202)

Returns the status of the specified filter .

#### Parameters

##### filter

keyof `AvailableFilters`

#### Returns

`boolean`

***

### nightcore()

> **nightcore**(): `this`

Defined in: [src/Structures/Filters.ts:95](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L95)

Applies the nightcore effect.

#### Returns

`this`

***

### setDistortion()

> **setDistortion**(`distortion`?): `this`

Defined in: [src/Structures/Filters.ts:170](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L170)

Applies the distortion options specified by the filter.

#### Parameters

##### distortion?

`DistortionOptions`

#### Returns

`this`

***

### setEqualizer()

> **setEqualizer**(`bands`?): `this`

Defined in: [src/Structures/Filters.ts:80](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L80)

Sets the equalizer bands and updates the filters.

#### Parameters

##### bands?

[`Band`](../interfaces/Band.md)[]

The equalizer bands.

#### Returns

`this`

***

### setKaraoke()

> **setKaraoke**(`karaoke`?): `this`

Defined in: [src/Structures/Filters.ts:147](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L147)

Applies the karaoke options specified by the filter.

#### Parameters

##### karaoke?

`KaraokeOptions`

#### Returns

`this`

***

### setRotation()

> **setRotation**(`rotation`?): `this`

Defined in: [src/Structures/Filters.ts:165](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L165)

Applies the rotation options specified by the filter.

#### Parameters

##### rotation?

`RotationOptions`

#### Returns

`this`

***

### setTimescale()

> **setTimescale**(`timescale`?): `this`

Defined in: [src/Structures/Filters.ts:155](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L155)

Applies the timescale options specified by the filter.

#### Parameters

##### timescale?

`TimescaleOptions`

#### Returns

`this`

***

### setVibrato()

> **setVibrato**(`vibrato`?): `this`

Defined in: [src/Structures/Filters.ts:160](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L160)

Applies the vibrato options specified by the filter.

#### Parameters

##### vibrato?

`VibratoOptions`

#### Returns

`this`

***

### slowmo()

> **slowmo**(): `this`

Defined in: [src/Structures/Filters.ts:104](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L104)

Applies the slow motion audio effect.

#### Returns

`this`

***

### soft()

> **soft**(): `this`

Defined in: [src/Structures/Filters.ts:113](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L113)

Applies the soft audio effect.

#### Returns

`this`

***

### trebleBass()

> **trebleBass**(): `this`

Defined in: [src/Structures/Filters.ts:123](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L123)

Applies the treble bass effect.

#### Returns

`this`

***

### tv()

> **tv**(): `this`

Defined in: [src/Structures/Filters.ts:118](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L118)

Applies the television audio effect.

#### Returns

`this`

***

### vaporwave()

> **vaporwave**(): `this`

Defined in: [src/Structures/Filters.ts:128](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Filters.ts#L128)

Applies the vaporwave effect.

#### Returns

`this`
