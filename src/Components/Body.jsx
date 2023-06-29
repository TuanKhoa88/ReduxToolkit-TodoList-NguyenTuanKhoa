import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

export default function Body() {
    const { todoList, filterStatus } = useSelector((state) => state.todo);

    const sortedTodoList = useMemo(
        () =>
            [...todoList].sort((a, b) => new Date(b.time) - new Date(a.time)),
        [todoList]
    );

    const filterTodoList = useMemo(() => {
        if (filterStatus === "all") {
            return sortedTodoList;
        }
        return sortedTodoList.filter((item) => item.status === filterStatus);
    }, [filterStatus, sortedTodoList]);

    return (
        <div className="todolist-container">
            {filterTodoList.length ? (
                filterTodoList.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))
            ) : (
                <p className="no-todo">NO TODOS</p>
            )}
        </div>
    );
}
