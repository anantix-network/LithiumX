[**LithiumX v1.0.4**](../README.md)

***

[LithiumX](../globals.md) / Filters

# Class: Filters

Defined in: [src/Structures/Filters.ts:4](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L4)

## Constructors

### new Filters()

> **new Filters**(`player`): [`Filters`](Filters.md)

Defined in: [src/Structures/Filters.ts:18](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L18)

#### Parameters

##### player

[`LithiumXPlayer`](LithiumXPlayer.md)

#### Returns

[`Filters`](Filters.md)

## Properties

### distortion

> **distortion**: [`DistortionOptions`](../interfaces/DistortionOptions.md)

Defined in: [src/Structures/Filters.ts:5](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L5)

***

### equalizer

> **equalizer**: [`Band`](../interfaces/Band.md)[]

Defined in: [src/Structures/Filters.ts:6](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L6)

***

### karaoke

> **karaoke**: [`KaraokeOptions`](../interfaces/KaraokeOptions.md)

Defined in: [src/Structures/Filters.ts:7](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L7)

***

### player

> **player**: [`LithiumXPlayer`](LithiumXPlayer.md)

Defined in: [src/Structures/Filters.ts:8](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L8)

***

### rotation

> **rotation**: [`RotationOptions`](../interfaces/RotationOptions.md)

Defined in: [src/Structures/Filters.ts:9](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L9)

***

### timescale

> **timescale**: [`TimescaleOptions`](../interfaces/TimescaleOptions.md)

Defined in: [src/Structures/Filters.ts:10](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L10)

***

### vibrato

> **vibrato**: [`VibratoOptions`](../interfaces/VibratoOptions.md)

Defined in: [src/Structures/Filters.ts:11](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L11)

***

### volume

> **volume**: `number`

Defined in: [src/Structures/Filters.ts:12](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L12)

## Methods

### clearFilters()

> **clearFilters**(): `Promise`\<[`Filters`](Filters.md)\>

Defined in: [src/Structures/Filters.ts:209](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L209)

Removes the audio effects and resets the filter status.

#### Returns

`Promise`\<[`Filters`](Filters.md)\>

***

### distort()

> **distort**(): `this`

Defined in: [src/Structures/Filters.ts:85](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L85)

Applies the distortion audio effect.

#### Returns

`this`

***

### getFilterStatus()

> **getFilterStatus**(`filter`): `boolean`

Defined in: [src/Structures/Filters.ts:236](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L236)

Returns the status of the specified filter .

#### Parameters

##### filter

keyof [`AvailableFilters`](../interfaces/AvailableFilters.md)

#### Returns

`boolean`

***

### setDistortion()

> **setDistortion**(`distortion`?): `this`

Defined in: [src/Structures/Filters.ts:122](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L122)

Applies the distortion options specified by the filter.

#### Parameters

##### distortion?

[`DistortionOptions`](../interfaces/DistortionOptions.md)

#### Returns

`this`

***

### setEightD()

> **setEightD**(`status`): `this`

Defined in: [src/Structures/Filters.ts:130](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L130)

Set the 8D options

#### Parameters

##### status

`boolean`

The status to set.

#### Returns

`this`

***

### setEqualizer()

> **setEqualizer**(`bands`?): `this`

Defined in: [src/Structures/Filters.ts:80](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L80)

Sets the equalizer bands and updates the filters.

#### Parameters

##### bands?

[`Band`](../interfaces/Band.md)[]

The equalizer bands.

#### Returns

`this`

***

### setKaraoke()

> **setKaraoke**(`status`, `karaoke`?): `this`

Defined in: [src/Structures/Filters.ts:99](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L99)

Applies the karaoke options specified by the filter.

#### Parameters

##### status

`boolean`

##### karaoke?

[`KaraokeOptions`](../interfaces/KaraokeOptions.md)

#### Returns

`this`

***

### setNightcore()

> **setNightcore**(`status`): `this`

Defined in: [src/Structures/Filters.ts:142](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L142)

Set the nightcore options

#### Parameters

##### status

`boolean`

The status to set.

#### Returns

`this`

***

### setRotation()

> **setRotation**(`rotation`?): `this`

Defined in: [src/Structures/Filters.ts:117](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L117)

Applies the rotation options specified by the filter.

#### Parameters

##### rotation?

[`RotationOptions`](../interfaces/RotationOptions.md)

#### Returns

`this`

***

### setSlowmo()

> **setSlowmo**(`status`): `this`

Defined in: [src/Structures/Filters.ts:158](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L158)

Set the slowmo options

#### Parameters

##### status

`boolean`

The status to set.

#### Returns

`this`

***

### setSoft()

> **setSoft**(`status`): `this`

Defined in: [src/Structures/Filters.ts:174](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L174)

Set the soft options

#### Parameters

##### status

`boolean`

The status to set.

#### Returns

`this`

***

### setTimescale()

> **setTimescale**(`timescale`?): `this`

Defined in: [src/Structures/Filters.ts:107](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L107)

Applies the timescale options specified by the filter.

#### Parameters

##### timescale?

[`TimescaleOptions`](../interfaces/TimescaleOptions.md)

#### Returns

`this`

***

### setTrebleBass()

> **setTrebleBass**(`status`): `this`

Defined in: [src/Structures/Filters.ts:182](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L182)

Set the treble bass options

#### Parameters

##### status

`boolean`

The status to set.

#### Returns

`this`

***

### setTV()

> **setTV**(`status`): `this`

Defined in: [src/Structures/Filters.ts:190](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L190)

Set the TV options

#### Parameters

##### status

`boolean`

The status to set.

#### Returns

`this`

***

### setVaporwave()

> **setVaporwave**(`status`): `this`

Defined in: [src/Structures/Filters.ts:199](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L199)

Set the vaporwave options

#### Parameters

##### status

`boolean`

The status to set.

#### Returns

`this`

***

### setVibrato()

> **setVibrato**(`vibrato`?): `this`

Defined in: [src/Structures/Filters.ts:112](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Filters.ts#L112)

Applies the vibrato options specified by the filter.

#### Parameters

##### vibrato?

[`VibratoOptions`](../interfaces/VibratoOptions.md)

#### Returns

`this`
