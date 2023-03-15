import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Bar } from "./components/Bar";
import { Home } from "./components/Home";
import FormPolls from "./components/FormPolls";
import { VotePoll } from "./components/VotePoll";
import PollResult  from "./components/PollResult";
import UserForm from "./views/UserForm";
import axios from "axios";
import moment from "moment";

moment.locale("es");

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return (
    <div className="App">
      <Bar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserForm />} />
          <Route path="/polls/new" element={<FormPolls />} />
          <Route path="/poll/:id" element={<VotePoll />} />
          <Route path="/poll/chart/:id" element={<PollResult />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
