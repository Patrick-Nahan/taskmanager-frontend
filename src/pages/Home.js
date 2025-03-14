import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "../services/api";

function Home() {
    const[tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        getTasks().then(response => setTasks(response.data));
    },[]);

    const handleCreate = () => {
        createTask({title: newTask}).then(() => {
            setNewTask("");
            getTasks().then(response => setTasks(response.data));
        });
    };
    return (
        <div> 
            <h1>Task Manager</h1>
            <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
            <button onClick={handleCreate}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title}
                        <button onClick={() => deleteTask(task.id).then(() => getTasks().then(response => setTasks(response.data)))}>Delete</button>
                    </li>
            ))}
            </ul>
        </div>
    );
}

export default Home;