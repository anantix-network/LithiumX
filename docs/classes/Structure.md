[**LithiumX v1.0.4**](../README.md)

***

[LithiumX](../globals.md) / Structure

# Class: `abstract` Structure

Defined in: [src/Structures/Utils.ts:180](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Utils.ts#L180)

Gets or extends structures to extend the built in, or already extended, classes to add more functionality.

## Constructors

### new Structure()

> **new Structure**(): [`Structure`](Structure.md)

#### Returns

[`Structure`](Structure.md)

## Methods

### extend()

> `static` **extend**\<`K`, `T`\>(`name`, `extender`): `T`

Defined in: [src/Structures/Utils.ts:186](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Utils.ts#L186)

Extends a class.

#### Type Parameters

• **K** *extends* keyof [`Extendable`](../interfaces/Extendable.md)

• **T** *extends* *typeof* [`LithiumXQueue`](LithiumXQueue.md) \| *typeof* [`LithiumXPlayer`](LithiumXPlayer.md) \| *typeof* [`LithiumXNode`](LithiumXNode.md)

#### Parameters

##### name

`K`

##### extender

(`target`) => `T`

#### Returns

`T`

***

### get()

> `static` **get**\<`K`\>(`name`): [`Extendable`](../interfaces/Extendable.md)\[`K`\]

Defined in: [src/Structures/Utils.ts:197](https://github.com/anantix-network/LithiumX/blob/1ee801f60507a40b0e1da1b728c5a61e34ba8699/src/Structures/Utils.ts#L197)

Get a structure from available structures by name.

#### Type Parameters

• **K** *extends* keyof [`Extendable`](../interfaces/Extendable.md)

#### Parameters

##### name

`K`

#### Returns

[`Extendable`](../interfaces/Extendable.md)\[`K`\]
