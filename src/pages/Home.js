import React, { useState, useEffect } from 'react';
import { getTasks, createTask } from '../api';  // Certifique-se de importar as funções corretamente
import './style/Home.css'

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");  // Estado para o nome da tarefa
  const [taskDescription, setTaskDescription] = useState("");  // Estado para a descrição da tarefa

  useEffect(() => {
    // Carregar as tarefas quando o componente for montado
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);  // Executa apenas uma vez quando o componente for montado

  const handleCreateTask = async (e) => {
    e.preventDefault();  // Previne o comportamento padrão de envio do formulário
    const newTask = {
      name: taskName,
      description: taskDescription
    };

    try {
      const createdTask = await createTask(newTask);  // Chama a função para criar a task
      setTasks([...tasks, createdTask]);  // Atualiza a lista de tarefas
      setTaskName("");  // Limpa o campo de nome da tarefa
      setTaskDescription("");  // Limpa o campo de descrição
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div>
      <h1 className="Txt-home">Task Manager</h1>
      <section className="taskManager">
      <form onSubmit={handleCreateTask} >
        <div>
          <br/>
          <label className='form-manager'>Task Name</label>
          <br/>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <br/>
        <div>
          <label>Task Description</label>
          <br/>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
        </div>
        <br/>
        <button type="submit" className="Create-task">Create Task</button>
      </form>

      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}: {task.description}
          </li>
        ))}
      </ul>
      </section>
    </div>
  );
};

export default Home;
