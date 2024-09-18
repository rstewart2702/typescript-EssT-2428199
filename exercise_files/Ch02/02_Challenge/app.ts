// Types exercise:

// The name here is singular now instead of plural:
enum StatusValue {
  Todo = "todo",
  InProgress = "in-progress",
  Done = "done"
}

interface todoItem {
  id : number;
  title : string;
  status : StatusValue;
  completedOn? : Date;   // N.B. notice this one's optional.
}
  

// Create an interface to describe the structure of the
// individual todoItems.
const todoItems : todoItem[] = [
    { id: 1, title: "Learn HTML", status: StatusValue.Done, completedOn: new Date("2021-09-11") },
    { id: 2, title: "Learn TypeScript", status: StatusValue.InProgress },
    { id: 3, title: "Write the best app in the world", status: StatusValue.Todo },
]

// strongly-type the hard-coded values with an "enum"
// for the object field/attribute named "status"

// apply types to the parameters and return values of the functions.

function addTodoItem(todo: string) : todoItem {
    const id = getNextId<todoItem>(todoItems)
    // const id = getNextId(todoItems)

    const newTodo = {
        id,
        title: todo,
        status: StatusValue.Todo,
    }

    todoItems.push(newTodo)

    return newTodo
}

// Use a generic type (i.e., a type parameter) for the argument type
// of the genNextId function:

// Here is how the instructor defined the generic type parameter a little
// differently than I:
//   function getNextId<T extends { id : number }>(items:T[]) : number {
// This means, roughly, that anything of type T should be an object which
// at least can respond to the message "id" and this is how a Smalltalk
// programmer might have thought about the issue.
//
// What's more, the object answered back from the "id" message should
// respond to the message ">".
// So, the instructor's type-signature is probably better!
//
// Here is how I defined the types on the getNextId function:
function getNextId<T extends todoItem>(items: T[]) : number {
    return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1
}

const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app")

console.log(JSON.stringify(newTodo))

