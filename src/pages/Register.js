import React, { useState } from 'react';
import { registerUser } from '../api';  
import { Link,useNavigate } from 'react-router-dom';
import './style/Register.css'
import Logo from '../images/IBM-cadastro-icon-removebg-preview.png'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userData = {
      name,
      email,
      passwordHash: password, // Aqui, estamos enviando a senha diretamente (o backend vai hashear)
    };

    try {
      const data = await registerUser(userData); // Chama a função para registrar o usuário
      console.log('Usuário registrado com sucesso:', data);
      navigate('/login');
    } catch (error) {
      setError('Erro ao registrar usuário. Tente novamente.');
    }
  };

  return (
    <div>
      <h2 className="Txt-register">Cadastro</h2>
      <section className="Register-pag">
        <img src={Logo} alt=""className='Logo'></img>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Exibe erro se houver */}
      <form onSubmit={handleSubmit}>
        <label>your name</label>
        <br/>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br/>
        <label>Your Email:</label>
        <br/>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br/>
        <label>Your password:</label>
        <br/>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br/>
        <button type="submit" className="btb-submit">Create account</button>
      </form>
      <div className="back-button-home">
        <Link to="/Login">
          <button className="login">Login</button>
        </Link>
      </div>
      </section>
    </div>
  );
};

export default Register;
