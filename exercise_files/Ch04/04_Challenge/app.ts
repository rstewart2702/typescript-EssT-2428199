function query<T extends object>(
    items: T[],
    // query: QType<T> // <--- replace this!
    query : QType<T>
) {
    return items.filter(item => {
        // iterate through each of the item's properties
        for (const property of Object.keys(item)) {

            // get the query for this property name
            const propertyQuery = query[property]

            // see if this property value matches the query
            if (propertyQuery && propertyQuery(item[property])) {
                return true
            }
        }

        // nothing matched so return false
        return false
    })
}

interface Item {
  name : string;
  age : number;
}


type Query1 = (v ) => boolean;

type QType<ItmType> =
  // The following worked:
  //   N.B. using Partial here allows the binding of queryLoc, below, compile.
  Partial< Record < keyof ItmType, Query1> >


/* HERE IS THE INSTRUCTOR'S SOLUTION: */
// Basic idea:
// An instance of QType1 is "accessed" via properties
// which are the set of properties/keys provided by ItmType.
// Each element of the QType1 is a function which takes input
// which is of the same type as the type of the field of the
// ItmType which is accessed via field/property name TProp.
// So, something which has type QType1<Item> will end up with
// type signature that looks like:
//   { name : (v : string) => boolean, age : (v : number) => boolean }
type QType1<ItmType> =
  { [TProp in keyof ItmType]? : (v : ItmType[TProp]) => boolean }
/* this is seen as preferable, since it is "more specific," but
   I need a way to get the compiler to show me this information
   that he gets when he hovers over expressions in his editor (VSCode,
   using a background language server?)

   Is there a way to get some piece of the compiler to show that
   information?

   Don't know of one, yet.  Need to reason about quantified predicates
   over object types and their sets-of-keys, I guess...
*/

// Showing the equivalence of the two formulations, a type-driven,
// generic one, and a literal one, and how the structural
// typing works out:
let v1 : QType1<Item> = { name : (v : string) => false, age : (v : number) => false }

let v2 = { name : (v : string) => true, age : (v : number) => true}

v1 = v2

// This is not allowed:
// "A mapped type is a generic type which uses a union of PropertyKey's
// (frequently created via keyof) to interate through keys to create a type..."
// says the TypeScript handbook.
// 
// So, the following violates that notion, and isn't allowed.
// The fundamental idea of a mapped type seems to be very
// JavaScript-oriented:  this allows us to specify a general
// quantification over all of the "keys"/attributes of a type
// (specified as a type parameter) derive a new type with the
// same attributes, but with types whose structure is a function
// of the original type-and-attribute-set.
//
// It's important to note that all of the properties/keys come
// from the original type, and we are not allowed to specify any
// others than what come from that set.
// 
/*
type QType2<ItmType> =
  { [TProp in keyof ItmType]? : (v : ItmType[TProp]) => boolean;
    ["ephemeral"|"something"] : (v : ItmType) => null }
*/

// I tried to understand this "indexed access types" topic
// as it is connected to a parameterized type declaration
// for which the "attribute" part is from the set of "keys" used
// in the type parameter...
// I don't understand why the [] brackets the "key" portion
// of the specification in:
//   { [TProp in keyof ItmType]? : (v : ItmType[TProp]) => boolean }
// 
// The following results in a compiler complaint:
//   { ItmType[TProp in keyof ItmType]? : (v : ItmType[TProp]) => boolean }
/*
app.ts:55:5 - error TS1131: Property or signature expected.

55   { ItmType[TProp in keyof ItmType]? : (v : ItmType[TProp]) => boolean }
       ~~~~~~~

app.ts:55:28 - error TS1005: ']' expected.

55   { ItmType[TProp in keyof ItmType]? : (v : ItmType[TProp]) => boolean }
                              ~~~~~~~

app.ts:55:35 - error TS1128: Declaration or statement expected.

55   { ItmType[TProp in keyof ItmType]? : (v : ItmType[TProp]) => boolean }
                                     ~

app.ts:55:36 - error TS1128: Declaration or statement expected.

55   { ItmType[TProp in keyof ItmType]? : (v : ItmType[TProp]) => boolean }
                                      ~

app.ts:55:38 - error TS1128: Declaration or statement expected.

55   { ItmType[TProp in keyof ItmType]? : (v : ItmType[TProp]) => boolean }
                                        ~

app.ts:55:72 - error TS1128: Declaration or statement expected.

55   { ItmType[TProp in keyof ItmType]? : (v : ItmType[TProp]) => boolean }
                                                                          ~


Found 6 errors in the same file, starting at: app.ts:55

*/


let queryLoc : QType1<Item> = { name: name => name === "Angie" }

const matches = query<Item>(
    [
        { name: "Ted", age: 12 },
        { name: "Angie", age: 31 }
    ],
    {
        name: name => name === "Angie",
        age: age => age > 30
    })

console.log(matches)