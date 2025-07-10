import React, { useState, useEffect } from "react";
import { Pin, PinOff, Trash2 } from "lucide-react";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [originalCounter, setOriginalCounter] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      const savedPinned = JSON.parse(stored);
      setTasks(savedPinned);
    }
  }, []);

  const saveToLocalStorage = (taskList) => {
    const pinnedOnly = taskList.filter((t) => t.pinned);
    localStorage.setItem("tasks", JSON.stringify(pinnedOnly));
  };

  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: task,
        pinned: false,
        originalIndex: originalCounter,
      };

      const pinned = tasks.filter((t) => t.pinned);
      const unpinned = tasks.filter((t) => !t.pinned);
      const updatedTasks = [...pinned, newTask, ...unpinned];

      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
      setOriginalCounter(originalCounter - 1);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
    saveToLocalStorage(updated);
  };

  const togglePin = (index) => {
    const updated = [...tasks];
    const toggledTask = { ...updated[index] };
    toggledTask.pinned = !toggledTask.pinned;
    updated.splice(index, 1);

    let newTasks;
    if (toggledTask.pinned) {
      newTasks = [toggledTask, ...updated];
    } else {
      const pinned = updated.filter((t) => t.pinned);
      const unpinned = [...updated.filter((t) => !t.pinned), toggledTask];
      unpinned.sort((a, b) => a.originalIndex - b.originalIndex);
      newTasks = [...pinned, ...unpinned];
    }

    setTasks(newTasks);
    saveToLocalStorage(newTasks);
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(to bottom, #014d33, #036c45)",
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
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
            placeholder="Enter items..."
            className="form-control"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              color: "#d9ffe0",
              border: "2px solid transparent",
              borderRadius: "12px",
              padding: "10px",
              outline: "none",
              boxShadow: "none",
            }}
            onFocus={(e) => {
              e.target.style.border = "2px solid #00a676";
            }}
            onBlur={(e) => {
              e.target.style.border = "2px solid transparent";
            }}
          />
          <button
            onClick={addTask}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
            }}
            style={{
              marginLeft: "10px",
              padding: "10px 16px",
              border: "none",
              borderRadius: "12px",
              backgroundColor: "#28a745",
              color: "#ffffff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Add
          </button>
        </div>

        <div>
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="mb-3 d-flex justify-content-between align-items-center px-3 py-2"
              style={{
                backgroundColor: task.pinned
                  ? "rgb(0, 107, 34)"
                  : "rgba(0, 128, 0, 0.1)",
                borderRadius: "12px",
                color: "#e0ffe0",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              <span>{task.text}</span>
              <div className="d-flex">
                <button
                  onClick={() => togglePin(index)}
                  title={task.pinned ? "Unpin" : "Pin"}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#ffc107",
                    marginRight: "10px",
                  }}
                >
                  {task.pinned ? <PinOff size={20} /> : <Pin size={20} />}
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  title="Delete"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#ff5c5c",
                  }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
