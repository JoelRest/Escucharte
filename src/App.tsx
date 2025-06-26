import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Information from './pages/Information';
import Forum from './pages/Forum';
import EmotionalAgenda from './pages/EmotionalAgenda';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/information" element={<Information />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/agenda" element={<EmotionalAgenda />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;