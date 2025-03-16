[**LithiumX v1.0.6**](../README.md)

***

[LithiumX](../globals.md) / LithiumXPlayer

# Class: LithiumXPlayer

Defined in: [src/Structures/Player.ts:8](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L8)

## Constructors

### new LithiumXPlayer()

> **new LithiumXPlayer**(`options`): [`LithiumXPlayer`](LithiumXPlayer.md)

Defined in: [src/Structures/Player.ts:76](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L76)

Creates a new player, returns one if it already exists.

#### Parameters

##### options

[`PlayerOptions`](../interfaces/PlayerOptions.md)

#### Returns

[`LithiumXPlayer`](LithiumXPlayer.md)

## Properties

### bands

> **bands**: `number`[]

Defined in: [src/Structures/Player.ts:38](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L38)

The equalizer bands array.

***

### dynamicRepeat

> **dynamicRepeat**: `boolean` = `false`

Defined in: [src/Structures/Player.ts:18](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L18)

Whether the queue repeats and shuffles after each song.

***

### filters

> **filters**: [`Filters`](Filters.md)

Defined in: [src/Structures/Player.ts:12](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L12)

The filters applied to the audio.

***

### guild

> **guild**: `string`

Defined in: [src/Structures/Player.ts:30](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L30)

The guild for the player.

***

### isAutoplay

> **isAutoplay**: `boolean` = `false`

Defined in: [src/Structures/Player.ts:44](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L44)

The autoplay state of the player.

***

### manager

> **manager**: [`LithiumXManager`](LithiumXManager.md)

Defined in: [src/Structures/Player.ts:42](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L42)

The Manager.

***

### node

> **node**: [`LithiumXNode`](LithiumXNode.md)

Defined in: [src/Structures/Player.ts:28](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L28)

The Node for the Player.

***

### options

> **options**: [`PlayerOptions`](../interfaces/PlayerOptions.md)

Defined in: [src/Structures/Player.ts:76](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L76)

***

### paused

> **paused**: `boolean` = `false`

Defined in: [src/Structures/Player.ts:24](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L24)

Whether the player is paused.

***

### playing

> **playing**: `boolean` = `false`

Defined in: [src/Structures/Player.ts:22](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L22)

Whether the player is playing.

***

### position

> **position**: `number` = `0`

Defined in: [src/Structures/Player.ts:20](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L20)

The time the player is in the track.

***

### queue

> `readonly` **queue**: [`LithiumXQueue`](LithiumXQueue.md)

Defined in: [src/Structures/Player.ts:10](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L10)

The Queue for the Player.

***

### queueRepeat

> **queueRepeat**: `boolean` = `false`

Defined in: [src/Structures/Player.ts:16](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L16)

Whether the queue repeats the queue.

***

### state

> **state**: [`State`](../type-aliases/State.md) = `"DISCONNECTED"`

Defined in: [src/Structures/Player.ts:36](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L36)

The current state of the player.

***

### textChannel

> **textChannel**: `string` = `null`

Defined in: [src/Structures/Player.ts:34](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L34)

The text channel for the player.

***

### trackRepeat

> **trackRepeat**: `boolean` = `false`

Defined in: [src/Structures/Player.ts:14](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L14)

Whether the queue repeats the track.

***

### voiceChannel

> **voiceChannel**: `string` = `null`

Defined in: [src/Structures/Player.ts:32](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L32)

The voice channel for the player.

***

### voiceState

> **voiceState**: [`VoiceState`](../interfaces/VoiceState.md)

Defined in: [src/Structures/Player.ts:40](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L40)

The voice state object from Discord.

***

### volume

> **volume**: `number`

Defined in: [src/Structures/Player.ts:26](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L26)

The volume for the player

## Methods

### connect()

> **connect**(): `this`

Defined in: [src/Structures/Player.ts:110](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L110)

Connect to the voice channel.

#### Returns

`this`

***

### destroy()

> **destroy**(`disconnect`): `void`

Defined in: [src/Structures/Player.ts:209](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L209)

Destroys the player.

#### Parameters

##### disconnect

`boolean` = `true`

#### Returns

`void`

***

### disconnect()

> **disconnect**(): `this`

Defined in: [src/Structures/Player.ts:188](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L188)

Disconnect from the voice channel.

#### Returns

`this`

***

### get()

> **get**\<`T`\>(`key`): `T`

Defined in: [src/Structures/Player.ts:63](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L63)

Get custom data.

#### Type Parameters

• **T**

#### Parameters

##### key

`string`

#### Returns

`T`

***

### getRecommended()

> **getRecommended**(`track`, `requester`?): `Promise`\<[`Track`](../interfaces/Track.md)[]\>

Defined in: [src/Structures/Player.ts:307](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L307)

Gets recommended tracks and returns an array of tracks.

#### Parameters

##### track

[`Track`](../interfaces/Track.md)

##### requester?

`string`

#### Returns

`Promise`\<[`Track`](../interfaces/Track.md)[]\>

***

### moveNode()

> **moveNode**(`node`?): `Promise`\<[`LithiumXPlayer`](LithiumXPlayer.md)\>

Defined in: [src/Structures/Player.ts:133](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L133)

Moves the player to a different node.

#### Parameters

##### node?

`string`

The ID of the node to move to.

#### Returns

`Promise`\<[`LithiumXPlayer`](LithiumXPlayer.md)\>

- The player instance.

***

### pause()

> **pause**(`pause`): `this`

Defined in: [src/Structures/Player.ts:507](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L507)

Pauses the current track.

#### Parameters

##### pause

`boolean`

#### Returns

`this`

***

### play()

#### Call Signature

> **play**(): `Promise`\<`void`\>

Defined in: [src/Structures/Player.ts:239](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L239)

Plays the next track.

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **play**(`track`): `Promise`\<`void`\>

Defined in: [src/Structures/Player.ts:245](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L245)

Plays the specified track.

##### Parameters

###### track

[`Track`](../interfaces/Track.md) | [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md)

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **play**(`options`): `Promise`\<`void`\>

Defined in: [src/Structures/Player.ts:251](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L251)

Plays the next track with some options.

##### Parameters

###### options

[`PlayOptions`](../interfaces/PlayOptions.md)

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **play**(`track`, `options`): `Promise`\<`void`\>

Defined in: [src/Structures/Player.ts:258](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L258)

Plays the specified track with some options.

##### Parameters

###### track

[`Track`](../interfaces/Track.md) | [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md)

###### options

[`PlayOptions`](../interfaces/PlayOptions.md)

##### Returns

`Promise`\<`void`\>

***

### previous()

> **previous**(): `this`

Defined in: [src/Structures/Player.ts:529](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L529)

Go back to the previous song.

#### Returns

`this`

***

### restart()

> **restart**(): `void`

Defined in: [src/Structures/Player.ts:471](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L471)

Restarts the current track to the start.

#### Returns

`void`

***

### search()

> **search**(`query`, `requester`?): `Promise`\<[`SearchResult`](../interfaces/SearchResult.md)\>

Defined in: [src/Structures/Player.ts:105](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L105)

Same as Manager#search() but a shortcut on the player itself.

#### Parameters

##### query

The query to search.

`string` | [`SearchQuery`](../interfaces/SearchQuery.md)

##### requester?

`string`

The user who requested the search.

#### Returns

`Promise`\<[`SearchResult`](../interfaces/SearchResult.md)\>

***

### seek()

> **seek**(`position`): `this`

Defined in: [src/Structures/Player.ts:540](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L540)

Seeks to the position in the current track.

#### Parameters

##### position

`number`

#### Returns

`this`

***

### set()

> **set**(`key`, `value`): `void`

Defined in: [src/Structures/Player.ts:55](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L55)

Set custom data.

#### Parameters

##### key

`string`

##### value

`unknown`

#### Returns

`void`

***

### setAutoplay()

> **setAutoplay**(`autoplayState`, `botUser`): [`LithiumXPlayer`](LithiumXPlayer.md)

Defined in: [src/Structures/Player.ts:294](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L294)

Sets the autoplay-state of the player.

#### Parameters

##### autoplayState

`boolean`

##### botUser

`object`

#### Returns

[`LithiumXPlayer`](LithiumXPlayer.md)

***

### setDynamicRepeat()

> **setDynamicRepeat**(`repeat`, `ms`): `this`

Defined in: [src/Structures/Player.ts:435](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L435)

Sets the queue to repeat and shuffles the queue after each song.

#### Parameters

##### repeat

`boolean`

"true" or "false".

##### ms

`number`

After how many milliseconds to trigger dynamic repeat.

#### Returns

`this`

***

### setQueueRepeat()

> **setQueueRepeat**(`repeat`): `this`

Defined in: [src/Structures/Player.ts:411](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L411)

Sets the queue repeat.

#### Parameters

##### repeat

`boolean`

#### Returns

`this`

***

### setTextChannel()

> **setTextChannel**(`channel`): `this`

Defined in: [src/Structures/Player.ts:232](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L232)

Sets the player text channel.

#### Parameters

##### channel

`string`

#### Returns

`this`

***

### setTrackRepeat()

> **setTrackRepeat**(`repeat`): `this`

Defined in: [src/Structures/Player.ts:391](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L391)

Sets the track repeat.

#### Parameters

##### repeat

`boolean`

#### Returns

`this`

***

### setVoiceChannel()

> **setVoiceChannel**(`channel`): `this`

Defined in: [src/Structures/Player.ts:221](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L221)

Sets the player voice channel.

#### Parameters

##### channel

`string`

#### Returns

`this`

***

### setVolume()

> **setVolume**(`volume`): `this`

Defined in: [src/Structures/Player.ts:375](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L375)

Sets the player volume.

#### Parameters

##### volume

`number`

#### Returns

`this`

***

### stop()

> **stop**(`amount`?): `this`

Defined in: [src/Structures/Player.ts:487](https://github.com/anantix-network/LithiumX/blob/50b399548f48d78c1c57a0dfe99d487d3da44bc6/src/Structures/Player.ts#L487)

Stops the current track, optionally give an amount to skip to, e.g 5 would play the 5th song.

#### Parameters

##### amount?

`number`

#### Returns

`this`
