
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from './pages/Upload';
import Display from './pages/Display';
import Admin from './pages/Admin';
import Update from './pages/Update';
import Navbar from './pages/Navbar';

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <div className="App">
        <Routes>
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<Display />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/update/:id" element={<Update/>} />
        </Routes>
      </div>
      <div className='footer'>copywrite @2024</div>
    
    </BrowserRouter>
  )
}

export default App
