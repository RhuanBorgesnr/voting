import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { vote, clearError, clearVote, checkUserVote } from '../store/slices/topicsSlice';
import './Vote.css';

const Vote = () => {
  const [choice, setChoice] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, votes, topics, userVotes } = useSelector((state) => state.topics);

  const topicId = parseInt(id || '0');
  const topic = topics.find(t => t.id === topicId);
  const currentVote = votes[topicId];
  const userVote = userVotes[topicId];

  useEffect(() => {
    console.log('Vote page mounted for topic:', topicId);
    console.log('Current userVote:', userVote);
    console.log('Current vote:', currentVote);
    
    // Limpar estado anterior ao entrar na página
    dispatch(clearError());
    
    // Verificar se o usuário já votou neste tópico
    dispatch(checkUserVote(topicId));
  }, [dispatch, topicId]);

  useEffect(() => {
    console.log('userVote changed:', userVote);
    // Se o usuário já votou neste tópico, redirecionar para resultado
    if (userVote && userVote.hasVoted) {
      console.log('User already voted, redirecting to result');
      navigate(`/result/${topicId}`);
    }
  }, [userVote, navigate, topicId]);

  useEffect(() => {
    console.log('currentVote changed:', currentVote);
    // Se o usuário acabou de votar, redirecionar para resultado
    if (currentVote) {
      console.log('User just voted, redirecting to result');
      navigate(`/result/${topicId}`);
    }
  }, [currentVote, navigate, topicId]);

  const handleVote = async () => {
    if (!choice) return;
    
    console.log('Submitting vote:', { topicId, choice });
    dispatch(clearError());
    const result = await dispatch(vote({ topicId, choice }));
    
    console.log('Vote result:', result);
    
    // Se o voto foi bem-sucedido, redirecionar
    if (vote.fulfilled.match(result)) {
      console.log('Vote successful, redirecting to result');
      navigate(`/result/${topicId}`);
    } else {
      console.log('Vote failed:', result.error);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (!topic) {
    return <div className="loading">Pauta não encontrada...</div>;
  }

  // Se ainda está carregando a verificação do voto
  if (loading && !userVote) {
    return <div className="loading">Verificando se você já votou...</div>;
  }

  // Se o usuário já votou, não mostrar o formulário
  if (userVote && userVote.hasVoted) {
    return <div className="loading">Redirecionando para o resultado...</div>;
  }

  return (
    <div className="vote-container">
      <div className="vote-card">
        <h2>Votar na Pauta</h2>
        <div className="topic-info">
          <h3>{topic.title}</h3>
          <p>{topic.description}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="vote-options">
          <h4>Escolha sua opção:</h4>
          <div className="options">
            <label className={`option ${choice === 'yes' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="choice"
                value="yes"
                checked={choice === 'yes'}
                onChange={() => setChoice('yes')}
              />
              <span className="option-text">Sim</span>
            </label>
            <label className={`option ${choice === 'no' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="choice"
                value="no"
                checked={choice === 'no'}
                onChange={() => setChoice('no')}
              />
              <span className="option-text">Não</span>
            </label>
          </div>
        </div>

        <div className="vote-actions">
          <button
            onClick={handleVote}
            disabled={!choice || loading}
            className="submit-vote-btn"
          >
            {loading ? 'Enviando voto...' : 'Enviar Voto'}
          </button>
          <button onClick={handleBack} className="back-btn">
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vote; 