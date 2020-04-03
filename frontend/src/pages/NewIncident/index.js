import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.png';

export default function NewIncident(props) {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [value, setValue] = useState();
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    const inc = props.location.inc

    useEffect(() => { 
        setTitle(inc ? inc.title : '')
        setDescription(inc ? inc.description : '')
        setValue(inc ? inc.value: '') 
    }, [])

    async function handleNewIncident(e) {
        e.preventDefault();
        
        const data = {
            title,
            description,
            value,
        };

        try {
            if(inc) {
                await api.put(`incidents/${inc.id}`,data, {
                    headers: {
                        Authorization: ongId
                    }
                });    
            } else {
                await api.post('incidents',data, {
                    headers: {
                        Authorization: ongId
                    }
                });
            }
            history.push('/profile');

        } catch (err) {
            alert('Ocorreu um erro ao cadastrar o caso');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>

                <form>
                    <input 
                        placeholder="Titulo do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button onClick={handleNewIncident} className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}