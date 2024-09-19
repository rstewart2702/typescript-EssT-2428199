type ContactName = string;
type ContactStatus = "active" | "inactive" | "new"
type ContactBirthDate = Date | number | string

interface Contact {
    id: number;
    name: ContactName;
    birthDate?: ContactBirthDate;
    status?: ContactStatus;
}

let primaryContact: Contact = {
    id: 12345,
    name: "Jamie Johnson",
    status: "active"
}

type ContactFields = keyof Contact
const field : ContactFields = "status"

// Really, once things get to be complicated enough,
// what is wrong with putting things onto separate lines
// in order to help visually separate things which are
// conceptually separate?
function getValue
   <T, U extends keyof T>
   (source:T, propertyName: U)
{
    return source[propertyName]
}

const value = getValue({min:1,max:34},"max")
