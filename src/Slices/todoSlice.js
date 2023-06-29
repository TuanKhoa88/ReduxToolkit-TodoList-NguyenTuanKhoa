import { createSlice } from "@reduxjs/toolkit";

const getInitialTodos = () => {
    const localTodoList = JSON.parse(window.localStorage.getItem("todoList")) || [];
    window.localStorage.setItem("todoList", JSON.stringify(localTodoList));
    return localTodoList;
};

const initialValue = {
    todoList: getInitialTodos(),
    filterStatus: "all",
};

export const todoSlice = createSlice({
    name: "todo",
    initialState: initialValue,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
            window.localStorage.setItem("todoList", JSON.stringify(state.todoList));
        },
        deleteTodo: (state, action) => {
            const updatedTodoList = state.todoList.filter((todo) => todo.id !== action.payload);
            state.todoList = updatedTodoList;
            window.localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
        },
        updateTodo: (state, action) => {
            const { id, title, status } = action.payload;
            const updatedTodoList = state.todoList.map((todo) =>
                todo.id === id ? { ...todo, title, status } : todo
            );
            state.todoList = updatedTodoList;
            window.localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
        },
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        },
    },
});

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;
