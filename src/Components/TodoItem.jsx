import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../Slices/todoSlice";
import AddTaskModal from "./AddTaskModal";
import { format } from "date-fns";

function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [checked, setChecked] = useState(todo.status === "complete");

    useEffect(() => {
        setChecked(todo.status === "complete");
    }, [todo.status]);

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
        toast.success("Todo Delete Successfully !!!");
    };

    const handleUpdate = () => {
        setUpdateModalOpen(true);
    };

    const handleCheck = () => {
        const newStatus = checked ? "incomplete" : "complete";
        setChecked(!checked);
        dispatch(updateTodo({
            ...todo,
            status: newStatus,
        }));
    };

    return (
        <>
            <div className="todo-item">
                <div className="todo-item-detail">
                    <div
                        className={`check-box ${checked ? "checked" : ""}`}
                        onClick={handleCheck}
                        type="checkbox"
                    >
                        <span className="check-box-border"></span>
                    </div>
                    <div className="todo-item-text">
                        <p className={`todoText ${checked ? "completed" : ""}`}>
                            {todo.title}
                        </p>
                        <p className="todo-time">{format(new Date(), "p, dd/MM/yyyy")}</p>
                    </div>
                </div>
                <div className="todo-action">
                    <div
                        className="todo-icon"
                        onClick={handleDelete}
                        role="button"
                    >
                        <MdDelete />
                    </div>
                    <div
                        className="todo-icon"
                        onClick={handleUpdate}
                        role="button"
                    >
                        <MdEdit />
                    </div>
                </div>
            </div>
            <AddTaskModal
                type="update"
                todo={todo}
                modalOpen={updateModalOpen}
                setModalOpen={setUpdateModalOpen}
            />
        </>
    );
}

export default TodoItem;

