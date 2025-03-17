[**LithiumX v1.0.7**](README.md)

***

[LithiumX](globals.md) / SearchResult

# Interface: SearchResult

Defined in: [src/Structures/Manager.ts:450](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L450)

## Properties

### loadType

> **loadType**: [`LoadType`](type-aliases\LoadType.md)

Defined in: [src/Structures/Manager.ts:452](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L452)

The load type of the result.

***

### playlist?

> `optional` **playlist**: [`PlaylistData`](interfaces\PlaylistData.md)

Defined in: [src/Structures/Manager.ts:456](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L456)

The playlist info if the load type is 'playlist'.

***

### tracks

> **tracks**: [`Track`](interfaces\Track.md)[]

Defined in: [src/Structures/Manager.ts:454](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Manager.ts#L454)

The array of tracks from the result.
