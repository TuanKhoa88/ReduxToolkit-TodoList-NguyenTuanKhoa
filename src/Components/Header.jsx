import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../Slices/todoSlice";
import AddTaskModal from "./AddTaskModal";

export default function Header() {
    const [modalOpen, setModalOpen] = useState(false);
    const filterStatus = useSelector((state) => state.todo.filterStatus);
    const dispatch = useDispatch();

    const updatedFilter = (e) => {
        dispatch(updateFilterStatus(e.target.value));
    };

    return (
        <div className="header-task">
            <button className="add-task-btn" onClick={() => setModalOpen(true)}>
                ADD TODO
            </button>
            <select className="select-op" id="status" value={filterStatus} onChange={updatedFilter}>
                <option value="all">All</option>
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
            </select>
            <AddTaskModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    );
}
