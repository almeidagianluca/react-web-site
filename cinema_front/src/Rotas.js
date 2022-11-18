import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Catalog from './views/Catalog'
import MoviesUpdate from './views/MoviesUpdate'
import AuthService from './services/AuthService';
import Login from './components/Login'
import Logout from './components/Logout'

export default function Rotas() {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Routes>
            <Route exact path='/' element={<Catalog />} />
            {currentUser ? (
                <Route path='/update-movies' element={<MoviesUpdate />} />
            ) : (
                <Route exact path='/update-movies' element={<div style={{textAlign: "center", marginTop: 220}}>Acesso Restrito, faça Login para acessar a página...</div>} />
            )}
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<div>Página não encontrada</div>} />
        </Routes>
        
    )
}