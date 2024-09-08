import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import Orders from './Pages/Orders';
import Users from './Pages/Users';
import Sidebar from './Components/Sidebar/Sidebar';
import Admin from './Pages/Admin';

export const backend_url = 'http://localhost:4000';
const uzsCurrency = 'UZS';
export const currency = uzsCurrency;

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          {/* Include other routes here */}
        </Routes>
        <Admin />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
