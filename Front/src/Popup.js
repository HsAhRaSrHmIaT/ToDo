import React, { useState } from "react";
import './Popup.css';
import { editTodo } from './TodoService';

const Popup = ({ id, content, handleClose, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(content || "");

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            await editTodo(id, { description });
            setIsEditing(false);
            onSave(id, description);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    return (
        <div className="popup-box">
            <div className="box">
                <h3>Description</h3>
                {isEditing ? (
                    <div>
                        <textarea 
                            value={description} 
                            onChange={handleChange} 
                            placeholder="Add a description"
                        />
                        <button onClick={handleSaveClick}>Save</button>
                    </div>
                ) : (
                    <div>
                        <p>{description || "Add a description"}</p>
                        <button onClick={handleEditClick}>{description ? "Edit" : "Add"}</button>
                    </div>
                )}
                <span className="close-icon" onClick={handleClose}>✖</span>
            </div>
        </div>
    );
};
  
export default Popup;