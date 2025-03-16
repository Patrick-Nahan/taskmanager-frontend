// src/pages/Login.js
import React, { useState } from "react";  // Para redirecionar após login
import { createTask } from "../api";  // Importando a função de criar tarefa
import { Link,useNavigate } from "react-router-dom";
import './style/Login.css';  // Certificando-se de que o caminho está correto
import Logo from '../images/ibm-login-icon-removebg-preview.png';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lógica para autenticar usuário aqui (sem autenticação no momento)
      // Após autenticar, você pode criar uma task como exemplo:
      await createTask({
        name: "Nova Task",
        description: "Task criada após login.",
        completed: false,
      });
      navigate("/"); // Redireciona para a página principal
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="div">
      <h1 className='Txt-Login'>Login</h1>
      <section className="Form-Login">
      <img src={Logo} alt=""className="Logo" />
      <form onSubmit={handleSubmit}>
     
      <label>Seu E-mail:</label>
      <br/>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <br/>
        <label>Sua senha:</label>
        <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <br/>
        <button type="submit" className="btb-submit">Acessar</button>
        <br/>
        <br/>
      </form>
      <div className="back-button">
        <Link to="/Register">
          <button className="create-account">create account</button>
        </Link>
      </div>
      </section>
    </div>
  );
};

export default Login;
