// Types exercise:

// Create an interface to describe the structure of the
// individual todoItems.
const todoItems = [
    { id: 1, title: "Learn HTML", status: "done", completedOn: new Date("2021-09-11") },
    { id: 2, title: "Learn TypeScript", status: "in-progress" },
    { id: 3, title: "Write the best app in the world", status: "todo" },
]

// strongly-type the hard-coded values with an "enum"
// for the object field/attribute named "status"

// apply types to the parameters and return values of the functions.

function addTodoItem(todo) {
    const id = getNextId(todoItems)

    const newTodo = {
        id,
        title: todo,
        status: "todo",
    }

    todoItems.push(newTodo)

    return newTodo
}

// Use a generic type (i.e., a type parameter) for the argument type
// and return type of the genNextId function:

function getNextId(items) {
    return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1
}

const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app")

console.log(JSON.stringify(newTodo))
