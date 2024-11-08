import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Components/LoginRegister/Login';
import { Register } from './Components/LoginRegister/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login/>} /> {/* Blank path makes this component render at startup */}
          <Route path="/register" element={<Register/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
