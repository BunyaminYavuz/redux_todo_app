import { createSlice } from "@reduxjs/toolkit";
import {getTodosAsync, addTodoAsync, toggleTodoAsync, deleteTodoAsync} from "./services"

export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: localStorage.getItem("activeFilter"),
        addNewTodo: {
            isLoading: false,
            error: null,
        }

    },
    reducers: {
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        },
        clearCompleted: (state) => {
            state.items = state.items.filter(todo => todo.completed === false)
        },
    },
    extraReducers: (builder) => {
        builder
            // get todos
            .addCase(getTodosAsync.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload
            })
            .addCase(getTodosAsync.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            // post todo
            .addCase(addTodoAsync.pending, (state, action) => {
                state.addNewTodo.isLoading = true
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.addNewTodo.isLoading = false
                state.items.push(action.payload)
            })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.addNewTodo.isLoading = false
                state.addNewTodo.error = action.error.message
            })
            // patch todo
            .addCase(toggleTodoAsync.fulfilled, (state, action) => {
                const { id, completed } = action.payload
                const index = state.items.findIndex(item => item.id === id)
                state.items[index].completed = completed
            })
            // delete todo
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                const id = action.payload
                const index = state.items.findIndex(item => item.id === id)
                state.items.splice(index, 1)
            })
    }
})

export const selectTodos = (state) => state.todos.items
export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === "all") {
        return state.todos.items
    }

    return state.todos.items.filter((todo) => state.todos.activeFilter === "active" ? todo.completed === false : todo.completed === true)

}
export const selectActiveFilter = (state) => state.todos.activeFilter

export const { changeActiveFilter, clearCompleted } = todosSlice.actions
export default todosSlice.reducer;