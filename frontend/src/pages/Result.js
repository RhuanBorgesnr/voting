import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getResult, clearVoteResult } from '../store/slices/topicsSlice';
import './Result.css';

const Result = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, results, topics } = useSelector((state) => state.topics);

  const topicId = parseInt(id || '0');
  const topic = topics.find(t => t.id === topicId);
  const voteResult = results[topicId];

  useEffect(() => {
    dispatch(clearVoteResult(topicId));
    dispatch(getResult(topicId));
  }, [dispatch, topicId]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const calculatePercentage = (votes, total) => {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  if (loading) {
    return <div className="loading">Carregando resultado...</div>;
  }

  if (!topic) {
    return <div className="loading">Pauta não encontrada...</div>;
  }

  return (
    <div className="result-container">
      <div className="result-card">
        <h2>Resultado da Votação</h2>
        
        <div className="topic-info">
          <h3>{topic.title}</h3>
          <p>{topic.description}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {voteResult && (
          <div className="vote-results">
            <div className="result-summary">
              <h4>Total de Votos: {voteResult.total_votes}</h4>
            </div>

            <div className="result-bars">
              <div className="result-item">
                <div className="result-label">
                  <span>Sim</span>
                  <span>{voteResult.result.yes} votos ({calculatePercentage(voteResult.result.yes, voteResult.total_votes)}%)</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill yes-fill"
                    style={{ width: `${calculatePercentage(voteResult.result.yes, voteResult.total_votes)}%` }}
                  ></div>
                </div>
              </div>

              <div className="result-item">
                <div className="result-label">
                  <span>Não</span>
                  <span>{voteResult.result.no} votos ({calculatePercentage(voteResult.result.no, voteResult.total_votes)}%)</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill no-fill"
                    style={{ width: `${calculatePercentage(voteResult.result.no, voteResult.total_votes)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="result-winner">
              <h4>
                Resultado: {voteResult.result.yes > voteResult.result.no ? 'Aprovado' : 
                           voteResult.result.no > voteResult.result.yes ? 'Reprovado' : 'Empate'}
              </h4>
            </div>
          </div>
        )}

        <div className="result-actions">
          <button onClick={handleBack} className="back-btn">
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result; 