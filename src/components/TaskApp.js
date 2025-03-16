// src/components/TaskApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/task";

const TaskApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    // Carregar as tarefas
    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error("Erro ao carregar tarefas", error);
            });
    }, []);

    // Criar nova tarefa
    const createTask = () => {
        const taskData = { title: newTask, description: "Descrição da tarefa", userId: 1 }; // Ajuste conforme necessário
        axios.post(API_URL, taskData)
            .then(response => {
                setTasks([...tasks, response.data]);
                setNewTask("");
            })
            .catch(error => {
                console.error("Erro ao criar tarefa", error);
            });
    };

    // Deletar tarefa
    const deleteTask = (taskId) => {
        axios.delete(`${API_URL}/${taskId}`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== taskId));
            })
            .catch(error => {
                console.error("Erro ao excluir tarefa", error);
            });
    };

    return (
        <div>
            <h1>Tarefas</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Adicionar nova tarefa"
            />
            <button onClick={createTask}>Adicionar Tarefa</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.description}
                        <button onClick={() => deleteTask(task.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskApp;
