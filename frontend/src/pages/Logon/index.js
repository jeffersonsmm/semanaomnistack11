import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom'; 

import api from '../../Services/api';
import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logonImg from '../../assets/logo.svg';

export default function Logon(){
  const [id, setId] = useState('');
  const history = useHistory();

  async function handlerLogin(e){
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      alert('Falha no login');
    }
  }
  return(
    <div className="logon-container">
      <section className="form">
        <img src={logonImg} alt="Logo"/>

        <form onSubmit={handlerLogin}>
          <h1>Faça seu logon</h1>
          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
            <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#E02041" />
              Não tenho cadastro.
            </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}