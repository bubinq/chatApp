import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/authContext';
import { RoomProvider } from './contexts/roomContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthProvider>
            <RoomProvider>
                <App />
            </RoomProvider>
        </AuthProvider>
    </BrowserRouter>

);
