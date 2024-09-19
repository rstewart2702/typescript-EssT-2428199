const x = "string"
const y = true
console.log(typeof x) // --> "string"
console.log(typeof y) // --> "boolean"



type ContactName = string;
type ContactStatus = "active" | "inactive" | "new"
type ContactBirthDate = Date | number | string

interface Contact {
    id: number;
    name: ContactName;
    birthDate?: ContactBirthDate;
    status?: ContactStatus;
}

// Instructor added in the parameter type specification.
// He depended a great deal upon the "intellisense" feature
// of his editor to illustrate how the compiler uses the
// type information to provide prompts which elaborate/explain
// the options available.
function toContact(nameOrContact: string | Contact): Contact {
    if (typeof nameOrContact === "object") {
        return {
            id: nameOrContact.id,
            name: nameOrContact.name,
            status: nameOrContact.status
        }
    }
    else {
        return {
            id: 0,
            name: nameOrContact,
            status: "active"
        }
    }
}

const myType = { min: 1, max: 200 }

function save(source: typeof myType) {}



