import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTopic from './pages/CreateTopic';
import Vote from './pages/Vote';
import Result from './pages/Result';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-topic" 
              element={
                <ProtectedRoute>
                  <CreateTopic />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/vote/:id" 
              element={
                <ProtectedRoute>
                  <Vote />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/result/:id" 
              element={
                <ProtectedRoute>
                  <Result />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
