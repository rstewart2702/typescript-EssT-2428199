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

// This kind of type spec allows us to specify that
// an Awesome is of the type of the postalCode field
// of the address field of an instance of Contact...
type Awesome = Contact["address"]["postalCode"]

interface ContactEvent {
    contactId: Contact["id"];
}

interface ContactDeletedEvent extends ContactEvent {
}

interface ContactStatusChangedEvent extends ContactEvent {
    oldStatus: Contact["status"];
    newStatus: Contact["status"];
}

interface ContactEvents {
    deleted: ContactDeletedEvent;
    statusChanged: ContactStatusChangedEvent;
    // ... and so on
}

function getValue<T, U extends keyof T>(source: T, propertyName: U) {
    return source[propertyName];
}

function handleEvent<T extends keyof ContactEvents>(
    eventName: T,
    handler: (evt: ContactEvents[T]) => void
) {
    if (eventName === "statusChanged") {
        handler({ contactId: 1, oldStatus: "active", newStatus: "inactive" })
    }
}

handleEvent("statusChanged", evt => evt)