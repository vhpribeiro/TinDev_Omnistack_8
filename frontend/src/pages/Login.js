import React, { useState } from 'react';
import './Login.css'; //Caso for só o css, nem precisa especificar o nome

import api from '../services/api';

import logo from '../assets/logo.svg';

function Login({ history }){
  const [username, setUserName] = useState('');

  async function handleSubmit(e){
    e.preventDefault();

    const response = await api.post('/devs', {
      username
    });

    const { _id } = response.data;
    console.log(response.data)

    history.push(`/dev/${_id}`); //Esse history vem do próprio Routes, ao dar o push, eu to falando para ele redirecionar para a /main
  }

  return(
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev"></img>
        <input 
        placeholder="Digite seu usuário no Github"
        value={username}
        onChange={e => setUserName(e.target.value)}/>
        
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default Login;