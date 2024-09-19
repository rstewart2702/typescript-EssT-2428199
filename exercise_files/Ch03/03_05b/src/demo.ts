let x = { name: "Wruce Bayne" };
x.id = 1234;



////////////////////

type ContactStatus = "active" | "inactive" | "new";

interface Address {
    street: string;
    province: string;
    postalCode: string;
}

interface Contact {
    id: number;
    name: string;
    status: ContactStatus;
    address: Address;
}

interface Query {
    sort?: 'asc' | 'desc';
    matches(val): boolean;
}

/* This is actually "query-by-example."
   The parameter query is indeed a JavaScript "object" and
   the intention here is to try and find the element in
   contacts (an array of Contact) which matches against the
   object named query, property-by-property.  Hence the inner
   loop of the function handed into the iteration implied
   by the use of the filter method!  Oof!

   There's a bit more intended sophistication by using
   functions embedded inside the query object to specify
   more sophisticated constraints/specifications than mere
   equality comparisons:  for each attribute, there's a corresponding
   "query-expression-function" which must evaluate to TRUE in order
   for the target-object's attribute to have met the query
   specification.

   I must admit this seems to be a rather peculiar way to query
   a collection of objects; I don't know why one would insist that
   all of the properties of an object be examined when it may not be
   necessary to examine all of them!  It makes much more sense to
   push the query predicate, and its individual conjuncts, into a
   single function which accepts an object-to-be-tested.

   In the end, this doesn't seem to be correct;
   I doubt you'd actually get anything back from a correctly-set-up
   list of contacts in which a phoneNumber === "Carol Weaver",
   even though this is what this effectively queries for.

   That inner iteration will end up reaching a state for which:
     property == "phoneNumber"
     query["phoneNumber"] == { matches: (name) => name === "Carol Weaver" }
     propertyQuery == { matches: (name) => name === "Carol Weaver" }
   and it will evaluate the following expression:
     propertyQuery.matches(contact["phoneNumber"])
     ==
       ( (name) => name === "Carol Weaver" ) (contact["phoneNumber"])
       ==
         contact["phoneNumber"] === "Carol Weaver"

  AAAHHHHH!
  But all of that reasoning is discarded in the final version of this
  program, in the "03_05e" folder, because phoneNumber is not a property
  of type/interface Contact IN THE FIRST PLACE!  And TypeScript compiler
  will end up complaining about it when it tries to parse the final
  filteredContacts assignment statement below, because the type
  of the query parameter was finally defined to be:
    Record<keyof Contact, Query>

*/
function searchContacts
  (contacts: Contact[],
   query
   )
{
    return contacts.filter(contact => {
        for (const property of Object.keys(contact)) {
            // get the query object for this property
            const propertyQuery = query[property];
            // check to see if it matches
	    // propertyQuery must be defined AND it must have a matches property
	    // which is a function:
            if (propertyQuery && propertyQuery.matches(contact[property])) {
                return true;
            }
	    // What's more, why not just write:
	    //   return (propertyQuery && propertyQuery.matches(contact[property])
	    // But oh, we need to proceed to the next property if the
	    // expression is false, so, never mind.
        }

        return false;
    })
}

const filteredContacts = searchContacts(
    [/* contacts */],
    {
        id: { matches: (id) => id === 123 },
        name: { matches: (name) => name === "Carol Weaver" },
        phoneNumber: { matches: (name) => name === "Carol Weaver" },
    }
);