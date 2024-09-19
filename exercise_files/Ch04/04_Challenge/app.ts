function query<T>(
    items: T[],
    query: any // <--- replace this!
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

interface Query<ItmType> {
  fieldName : keyof ItmType;
  predicate : (v : ItmType) => boolean
}

interface Query2<ItmType> {
  (fieldName: keyof ItmType)  : (v : ItmType) => boolean
}

let queries : Query<Item>[] = [];
  

const matches = query(
    [
        { name: "Ted", age: 12 },
        { name: "Angie", age: 31 }
    ],
    {
        name: name => name === "Angie",
        age: age => age > 30
    })
