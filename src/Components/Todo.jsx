import React, { useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#014d33", 
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="p-4"
        style={{
          backgroundColor: "rgba(0, 128, 0, 0.15)", 
          backdropFilter: "blur(8px)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#c8facc" }}>
          Todo App
        </h2>

       
        <div className="d-flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter items..."
            className="form-control"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              color: "#d9ffe0",
              border: "none",
              borderRadius: "12px",
              padding: "10px",
            }}
          />
          <button
            onClick={addTask}
            style={{
              marginLeft: "10px",
              padding: "10px 16px",
              border: "none",
              borderRadius: "12px",
              backgroundColor: "#28a745",
              color: "#ffffff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Add
          </button>
        </div>

        <div>
          {tasks.map((t, index) => (
            <div
              key={index}
              className="mb-3 d-flex justify-content-between align-items-center px-3 py-2"
              style={{
                backgroundColor: "rgba(0, 128, 0, 0.1)", 
                borderRadius: "12px",
                color: "#e0ffe0",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              <span>{t}</span>
              <button
                onClick={() => deleteTask(index)}
                style={{
                  backgroundColor: "#dc3545", 
                  color: "#fff",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
