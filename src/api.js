// src/api.js
import axios from 'axios';

const API_URL = "https://localhost:7100/api/auth"; // Altere conforme o seu backend

// Função para registrar o usuário
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;  // Retorna os dados do usuário registrado
  } catch (error) {
    console.error("Erro ao registrar o usuário:", error);
    throw error;
  }
};

// Se você também tem outras funções, como createTask, deleteTask, etc, elas devem estar aqui também.
export const createTask = (task) => axios.post("https://localhost:7100/api/Task", task);
export const getTasks = () => axios.get("https://localhost:7100/api/Task");
export const updateTask = (id, task) => axios.put(`https://localhost:7100/api/Task/${id}`, task);
export const deleteTask = (id) => axios.delete(`https://localhost:7100/api/Task/${id}`);
