import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'
import './styles.css';
import dcImg from '../../assests/dc.png'
import logoImg from '../../assests/logo.png'
import api from '../../services/api' 

export default function Logon(){
    const [id,setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });

            localStorage.setItem('pedidoId', id);
            localStorage.setItem('pedidoName', response.data.name)

            history.push('/profile')
        }catch(err){
            alert('Falha no Login, tente novamente')
        }
    }

    return(
        <div className="logon-container">
        <section className="form">
            <img src={logoImg} alt="Delivery Center" />

            <form onSubmit={handleLogin}>
                <h1>Faça seu logon</h1>

                <input 
                    placeholder = "Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)} />
                <button className="button" type = "submit"> Entrar </button>
                <Link className="back-link" to="register">
                    <FiLogIn size={16} color="#fe5200"/>
                    Não tenho cadastro
                </Link>
            </form>
        </section>

        <img src = {dcImg} alt="Delivery" />
        </div>
    );
}