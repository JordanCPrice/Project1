import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Components/LoginRegister/Login';
import { Register } from './Components/LoginRegister/Register';
import { ReimbursementContainer } from './Components/Reimbursement/ReimbursementContainer';
import { User } from './Components/User/User';
import { ListReimbursements } from './Components/User/ListReimbursements';
import { ListUsers } from './Components/User/ListUsers';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login/>} /> {/* Blank path makes this component render at startup */}
          <Route path="/register" element={<Register/>} />
          <Route path="/reimbursements" element={<ReimbursementContainer/>} />
          <Route path="/users" element={<User/>} />
          <Route path="/list-users" element={<ListUsers/>} />
          <Route path="/list-reimbursements" element={<ListReimbursements/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
