import React from 'react';
import './App.css';
import Dashboard from './containers/Dashboard/Dashboard';
import axios from 'axios';

function App() {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

    return (
        <Dashboard/>
    );
}

export default App;
