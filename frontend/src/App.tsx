import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainLayout from './layouts/MainLayout';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          {/* --- 公開路徑 --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/get-start" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />

          {/* --- 受保護路徑 (需要登入) --- */}
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
          </Route> */}
        </Route>
        {/* 404 頁面處理 */}
        <Route path="*" element={<div className="p-10">404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;