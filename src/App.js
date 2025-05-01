import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import logo from './logo.svg';
import AppBody from './components/App';
import LoginPage from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
	return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
        <Route
          path="/"
          element={isAuthenticated ? <AppBody /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
    
  );

}





export default App;
