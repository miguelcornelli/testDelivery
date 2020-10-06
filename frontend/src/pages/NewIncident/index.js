import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css';
import logoImg from '../../assests/logo.png';
import api from '../../services/api'

export default function Register(){
    const[title, setTitle] = useState('');
    const[description, setDescripition] = useState('');
    const[value, setValue] = useState('');
    const pedidoId = localStorage.getItem('pedidoId');
    const history = useHistory();

   async function handleNewIncident(e){
        e.preventDefault();

        const data ={
            title,
            description,
            value
        };

        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: pedidoId,
                }
            })
            history.push('/profile');
        }catch (err){
            alert('Erro ao cadatrar, tente novamente')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Delivery Center" />

                    <h1>Cadastrar novo pedidos</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resover isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#fe5200"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                     placeholder="titulo do caso"
                     value={title}
                     onChange={ e => setTitle(e.target.value)} 
                    />
                    <textarea
                     placeholder="Descrição"
                     value={description}
                     onChange={ e => setDescripition(e.target.value)}
                     />
                    <input
                     placeholder="Valor em Reais" 
                     value={value}
                     onChange={ e => setValue(e.target.value)}
                     />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}