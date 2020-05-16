import React from 'react';
import './App.css';
import Dashboard from './containers/Dashboard/Dashboard';
import axios from 'axios';

function App() {
    axios.defaults.baseURL = "http://10.10.219.23:5000";
    // axios.defaults.baseURL = "http://localhost:5000";

    return (
        <Dashboard/>
    );
}

export default App;
