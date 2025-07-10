import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './template/Header';
import Home from './template/Home';
import About from './template/About';
import Contact from './template/Contact';
import Login from './template/Login';
import Dashboard from './dashboard/Dashboard';
import UpdateEmployee from './Modules/Admin/UpdateEmployee';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateEnquiry from './Modules/CRM/UpdateEnquiry';
import LoanApplicationForm from './Modules/CRM/LoanApplicationForm';
import GenerateSanctionLetter from './Modules/CM/GenerateSanctionLetter'
import CustomerLogin from './template/CustomerLogin';

function App() {
  return (
    <BrowserRouter>
      {/* Header always visible */}
      <Header />

      <div className="container mt-4">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/customerLogin' element={<CustomerLogin></CustomerLogin>}></Route>
          <Route path='/dashboard/*' element={<Dashboard />} />
          
          <Route path='/update/:id' element={<UpdateEmployee />} />
          <Route path='/updateEnquiry/:id' element={<UpdateEnquiry />} />
          <Route path='/loanApplicationForm/:id' element={<LoanApplicationForm/>}></Route>
          <Route path='/generateSanctionLetter/:id' element={<GenerateSanctionLetter/>}></Route>

        </Routes>
      </div>

      <footer className="bg-light text-center py-3 mt-4">
        <small>&copy; 2025 My React App. All rights reserved.</small>
      </footer>
    </BrowserRouter>
  );
}

export default App;
