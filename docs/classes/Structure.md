[**LithiumX v1.0.7**](README.md)

***

[LithiumX](globals.md) / Structure

# Class: `abstract` Structure

Defined in: [src/Structures/Utils.ts:180](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Utils.ts#L180)

Gets or extends structures to extend the built in, or already extended, classes to add more functionality.

## Constructors

### new Structure()

> **new Structure**(): `Structure`

#### Returns

`Structure`

## Methods

### extend()

> `static` **extend**\<`K`, `T`\>(`name`, `extender`): `T`

Defined in: [src/Structures/Utils.ts:186](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Utils.ts#L186)

Extends a class.

#### Type Parameters

##### K

`K` *extends* keyof [`Extendable`](interfaces\Extendable.md)

##### T

`T` *extends* *typeof* [`LithiumXQueue`](classes\LithiumXQueue.md) \| *typeof* [`LithiumXPlayer`](classes\LithiumXPlayer.md) \| *typeof* [`LithiumXNode`](classes\LithiumXNode.md)

#### Parameters

##### name

`K`

##### extender

(`target`) => `T`

#### Returns

`T`

***

### get()

> `static` **get**\<`K`\>(`name`): [`Extendable`](interfaces\Extendable.md)\[`K`\]

Defined in: [src/Structures/Utils.ts:197](https://github.com/anantix-network/LithiumX/blob/720bc1bb802e250a8740a01a0f217198cffacb28/src/Structures/Utils.ts#L197)

Get a structure from available structures by name.

#### Type Parameters

##### K

`K` *extends* keyof [`Extendable`](interfaces\Extendable.md)

#### Parameters

##### name

`K`

#### Returns

[`Extendable`](interfaces\Extendable.md)\[`K`\]
