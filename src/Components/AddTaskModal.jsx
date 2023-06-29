import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../Slices/todoSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

function AddTaskModal({ type, modalOpen, setModalOpen, todo }) {
    const [title, setTitle] = useState("");
    const [status, setStauts] = useState("incomplete");
    const dispatch = useDispatch();
    const [isTitleValid, setIsTitleValid] = useState(true);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (type === "update" && todo) {
            setTitle(todo.title);
            setStauts(todo.status);
        } else {
            setTitle("");
            setStauts("incomplete");
        }
    }, [type.todo, modalOpen]);

    const handleSumbit = (e) => {
        e.preventDefault();
        if (title === "") {
            setIsTitleValid(false);
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 2000);
            toast.error("Please enter a title !!!", { duration: 2000 });
            return;
        }
        if (title && status) {
            if (type === "add") {
                dispatch(
                    addTodo({
                        id: uuid(),
                        title,
                        status,
                        time: new Date().toLocaleDateString(),
                    })
                );
                setIsTitleValid(true);
                setShowErrorMessage(false);
                toast.success("Task Added Successfully !!!", { duration: 2000 });
                setModalOpen(false);
            }
            if (type === "update") {
                if (todo.title !== title || todo.status !== status) {
                    dispatch(
                        updateTodo({
                            ...todo,
                            title,
                            status,
                        })
                    );
                } else {
                    toast.error("No Changes Made !!!", { duration: 2000 });
                    return;
                }
            }
            setModalOpen(false);
        }
    };

    return (
        <>
            {modalOpen && (
                <div className="modal-wrapper">
                    <div className="modal-container">
                        <div
                            className="modal-close-btn"
                            onClick={() => setModalOpen(false)}
                            role="button"
                        >
                            <MdOutlineClose />
                        </div>
                        <form className="modal-form" onSubmit={(e) => handleSumbit(e)}>
                            <h1 className="modal-form-title">
                                {type === "update" ? "Update" : "Add"} Task
                            </h1>
                            <label htmlFor="title">
                                Title
                                <input
                                    value={title}
                                    type="text"
                                    id="title"
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        setIsTitleValid(true);
                                        setShowErrorMessage(false);
                                    }}
                                />
                            </label>
                            {!isTitleValid && showErrorMessage && (
                                <p className="error-message">Please enter a title !!!</p>
                            )}
                            <label htmlFor="status">
                                Status
                                <select
                                    name="status"
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStauts(e.target.value)}
                                >
                                    <option value="incomplete">Incomplete</option>
                                    <option value="complete">Complete</option>
                                </select>
                            </label>
                            <div className="modal-submit-btn">
                                <button className="add-task-btn" type="submit">
                                    {type === "update" ? "Update" : "Add"} Task
                                </button>
                                <button
                                    className="cancel-task-btn"
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddTaskModal;
