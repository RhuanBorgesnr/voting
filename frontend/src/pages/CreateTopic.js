import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTopic, clearError } from '../store/slices/topicsSlice';
import './CreateTopic.css';

const CreateTopic = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.topics);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(createTopic(formData));
    if (createTopic.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="create-topic-container">
      <div className="create-topic-card">
        <h2>Criar Nova Pauta</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título da Pauta:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Digite o título da pauta"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Digite a descrição da pauta"
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" disabled={loading || !formData.title.trim()}>
              {loading ? 'Criando...' : 'Criar Pauta'}
            </button>
            <button type="button" onClick={handleBack} className="back-btn">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTopic; 