import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTopics, clearError, checkUserVote } from '../store/slices/topicsSlice';
import { logout } from '../store/slices/authSlice';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { topics, loading, error, userVotes } = useSelector((state) => state.topics);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    dispatch(clearError());
    dispatch(fetchTopics());
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    // Verificar votos do usuário para cada tópico
    if (topics.length > 0) {
      topics.forEach(topic => {
        if (!userVotes[topic.id]) {
          dispatch(checkUserVote(topic.id));
        }
      });
    }
  }, [topics, userVotes, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleCreateTopic = () => {
    navigate('/create-topic');
  };

  const handleVote = (topicId) => {
    navigate(`/vote/${topicId}`);
  };

  const handleViewResult = (topicId) => {
    navigate(`/result/${topicId}`);
  };

  const getUserVoteStatus = (topicId) => {
    const userVote = userVotes[topicId];
    if (!userVote) return null;
    return userVote.hasVoted ? userVote.vote?.choice : null;
  };

  if (loading) {
    return <div className="loading">Carregando pautas...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard - Sistema de Votação</h1>
        <div className="user-info">
          <span>Bem-vindo, {user?.first_name || user?.username}!</span>
          <button onClick={handleLogout} className="logout-btn">
            Sair
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main className="dashboard-main">
        <div className="dashboard-actions">
          <h2>Pautas Disponíveis</h2>
          <button onClick={handleCreateTopic} className="create-topic-btn">
            + Nova Pauta
          </button>
        </div>
        
        {topics.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma pauta encontrada.</p>
            <button onClick={handleCreateTopic} className="create-first-topic-btn">
              Criar Primeira Pauta
            </button>
          </div>
        ) : (
          <div className="topics-grid">
            {topics.map((topic) => {
              const userVoteStatus = getUserVoteStatus(topic.id);
              const hasVoted = userVoteStatus !== null;
              
              return (
                <div key={topic.id} className="topic-card">
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                  <div className="topic-meta">
                    <span>Criada em: {new Date(topic.created_at).toLocaleDateString('pt-BR')}</span>
                    {hasVoted && (
                      <span className="vote-status">
                        Você votou: <strong>{userVoteStatus === 'yes' ? 'Sim' : 'Não'}</strong>
                      </span>
                    )}
                  </div>
                  <div className="topic-actions">
                    {!hasVoted ? (
                      <button
                        onClick={() => handleVote(topic.id)}
                        className="vote-btn"
                      >
                        Votar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleViewResult(topic.id)}
                        className="result-btn"
                      >
                        Ver Resultado
                      </button>
                    )}
                    <button
                      onClick={() => handleViewResult(topic.id)}
                      className="result-btn"
                    >
                      Ver Resultado
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard; 