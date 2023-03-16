import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Bar } from "./components/Bar";
import { Home } from "./components/Home";
import FormPolls from "./components/FormPolls";
import { VotePoll } from "./components/VotePoll";
import PollResult  from "./components/PollResult";
import UserForm from "./views/UserForm";
import axios from "axios";
import moment from "moment";
import Login from "./components/admin/Login";
import Panel from "./components/admin/Panel";
import AdminEncuesta from "./components/admin/AdminEncuesta";

moment.locale("es");

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  const [idUsuario, setIdUsuario] = useState('');

  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/login" element={<UserForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/polls/new" element={<FormPolls />} />
          <Route path="/poll/:id" element={<VotePoll />} />
          <Route path="/poll/chart/:id" element={<PollResult />} />

          {/* Login Panel */}
          <Route path="/admin/" element={<Login idUsuario={idUsuario} setIdUsuario={setIdUsuario} />} />
          <Route path="/admin/login" element={<Login idUsuario={idUsuario} setIdUsuario={setIdUsuario} />} />
          <Route path="/admin/panel" element={<Panel />} />

          {/* Rutas Gestion Encuesta */}
          <Route path="/admin/encuesta" element={<AdminEncuesta accion="listado" />} />
          <Route path="/admin/encuesta/editar/:id" element={<AdminEncuesta accion="editar" />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
