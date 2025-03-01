[**LithiumX v1.0.2**](../README.md)

***

[LithiumX](../globals.md) / LithiumXPlayer

# Class: LithiumXPlayer

Defined in: [src/Structures/Player.ts:9](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L9)

## Constructors

### new LithiumXPlayer()

> **new LithiumXPlayer**(`options`): [`LithiumXPlayer`](LithiumXPlayer.md)

Defined in: [src/Structures/Player.ts:77](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L77)

Creates a new player, returns one if it already exists.

#### Parameters

##### options

[`PlayerOptions`](../interfaces/PlayerOptions.md)

#### Returns

[`LithiumXPlayer`](LithiumXPlayer.md)

## Properties

### bands

> **bands**: `number`[]

Defined in: [src/Structures/Player.ts:39](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L39)

The equalizer bands array.

***

### dynamicRepeat

> **dynamicRepeat**: `boolean` = `false`

Defined in: [src/Structures/Player.ts:19](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L19)

Whether the queue repeats and shuffles after each song.

***

### filters

> **filters**: [`Filters`](Filters.md)

Defined in: [src/Structures/Player.ts:13](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L13)

The filters applied to the audio.

***

### guild

> **guild**: `string`

Defined in: [src/Structures/Player.ts:31](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L31)

The guild for the player.

***

### isAutoplay

> **isAutoplay**: `boolean` = `false`

Defined in: [src/Structures/Player.ts:45](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L45)

The autoplay state of the player.

***

### manager

> **manager**: [`LithiumXManager`](LithiumXManager.md)

Defined in: [src/Structures/Player.ts:43](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L43)

The Manager.

***

### node

> **node**: [`LithiumXNode`](LithiumXNode.md)

Defined in: [src/Structures/Player.ts:29](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L29)

The Node for the Player.

***

### options

> **options**: [`PlayerOptions`](../interfaces/PlayerOptions.md)

Defined in: [src/Structures/Player.ts:77](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L77)

***

### paused

> **paused**: `boolean` = `false`

Defined in: [src/Structures/Player.ts:25](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L25)

Whether the player is paused.

***

### playing

> **playing**: `boolean` = `false`

Defined in: [src/Structures/Player.ts:23](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L23)

Whether the player is playing.

***

### position

> **position**: `number` = `0`

Defined in: [src/Structures/Player.ts:21](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L21)

The time the player is in the track.

***

### queue

> `readonly` **queue**: [`LithiumXQueue`](LithiumXQueue.md)

Defined in: [src/Structures/Player.ts:11](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L11)

The Queue for the Player.

***

### queueRepeat

> **queueRepeat**: `boolean` = `false`

Defined in: [src/Structures/Player.ts:17](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L17)

Whether the queue repeats the queue.

***

### state

> **state**: [`State`](../type-aliases/State.md) = `"DISCONNECTED"`

Defined in: [src/Structures/Player.ts:37](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L37)

The current state of the player.

***

### textChannel

> **textChannel**: `string` = `null`

Defined in: [src/Structures/Player.ts:35](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L35)

The text channel for the player.

***

### trackRepeat

> **trackRepeat**: `boolean` = `false`

Defined in: [src/Structures/Player.ts:15](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L15)

Whether the queue repeats the track.

***

### voiceChannel

> **voiceChannel**: `string` = `null`

Defined in: [src/Structures/Player.ts:33](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L33)

The voice channel for the player.

***

### voiceState

> **voiceState**: [`VoiceState`](../interfaces/VoiceState.md)

Defined in: [src/Structures/Player.ts:41](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L41)

The voice state object from Discord.

***

### volume

> **volume**: `number`

Defined in: [src/Structures/Player.ts:27](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L27)

The volume for the player

## Methods

### connect()

> **connect**(): `this`

Defined in: [src/Structures/Player.ts:117](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L117)

Connect to the voice channel.

#### Returns

`this`

***

### destroy()

> **destroy**(`disconnect`): `void`

Defined in: [src/Structures/Player.ts:221](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L221)

Destroys the player.

#### Parameters

##### disconnect

`boolean` = `true`

#### Returns

`void`

***

### disconnect()

> **disconnect**(): `this`

Defined in: [src/Structures/Player.ts:200](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L200)

Disconnect from the voice channel.

#### Returns

`this`

***

### get()

> **get**\<`T`\>(`key`): `T`

Defined in: [src/Structures/Player.ts:64](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L64)

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

Defined in: [src/Structures/Player.ts:337](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L337)

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

Defined in: [src/Structures/Player.ts:141](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L141)

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

Defined in: [src/Structures/Player.ts:564](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L564)

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

Defined in: [src/Structures/Player.ts:257](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L257)

Plays the next track.

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **play**(`track`): `Promise`\<`void`\>

Defined in: [src/Structures/Player.ts:263](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L263)

Plays the specified track.

##### Parameters

###### track

[`Track`](../interfaces/Track.md) | [`UnresolvedTrack`](../interfaces/UnresolvedTrack.md)

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **play**(`options`): `Promise`\<`void`\>

Defined in: [src/Structures/Player.ts:269](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L269)

Plays the next track with some options.

##### Parameters

###### options

[`PlayOptions`](../interfaces/PlayOptions.md)

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **play**(`track`, `options`): `Promise`\<`void`\>

Defined in: [src/Structures/Player.ts:276](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L276)

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

Defined in: [src/Structures/Player.ts:586](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L586)

Go back to the previous song.

#### Returns

`this`

***

### restart()

> **restart**(): `void`

Defined in: [src/Structures/Player.ts:528](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L528)

Restarts the current track to the start.

#### Returns

`void`

***

### search()

> **search**(`query`, `requester`?): `Promise`\<[`SearchResult`](../interfaces/SearchResult.md)\>

Defined in: [src/Structures/Player.ts:112](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L112)

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

Defined in: [src/Structures/Player.ts:597](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L597)

Seeks to the position in the current track.

#### Parameters

##### position

`number`

#### Returns

`this`

***

### set()

> **set**(`key`, `value`): `void`

Defined in: [src/Structures/Player.ts:56](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L56)

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

Defined in: [src/Structures/Player.ts:317](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L317)

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

Defined in: [src/Structures/Player.ts:492](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L492)

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

Defined in: [src/Structures/Player.ts:468](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L468)

Sets the queue repeat.

#### Parameters

##### repeat

`boolean`

#### Returns

`this`

***

### setTextChannel()

> **setTextChannel**(`channel`): `this`

Defined in: [src/Structures/Player.ts:249](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L249)

Sets the player text channel.

#### Parameters

##### channel

`string`

#### Returns

`this`

***

### setTrackRepeat()

> **setTrackRepeat**(`repeat`): `this`

Defined in: [src/Structures/Player.ts:445](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L445)

Sets the track repeat.

#### Parameters

##### repeat

`boolean`

#### Returns

`this`

***

### setVoiceChannel()

> **setVoiceChannel**(`channel`): `this`

Defined in: [src/Structures/Player.ts:237](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L237)

Sets the player voice channel.

#### Parameters

##### channel

`string`

#### Returns

`this`

***

### setVolume()

> **setVolume**(`volume`): `this`

Defined in: [src/Structures/Player.ts:426](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L426)

Sets the player volume.

#### Parameters

##### volume

`number`

#### Returns

`this`

***

### stop()

> **stop**(`amount`?): `this`

Defined in: [src/Structures/Player.ts:544](https://github.com/anantix-network/LithiumX/blob/791eed01fbe9f7030525ce976bc687f47cb06e89/src/Structures/Player.ts#L544)

Stops the current track, optionally give an amount to skip to, e.g 5 would play the 5th song.

#### Parameters

##### amount?

`number`

#### Returns

`this`
