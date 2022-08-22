import './App.css';
import Read from './components/read';
import Create from './components/create';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Update from './components/update';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Read />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;