import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  topics: [],
  sessions: [],
  votes: {}, // Votos por tópico
  results: {}, // Resultados por tópico
  userVotes: {}, // Votos do usuário por tópico
  loading: false,
  error: null,
};

export const fetchTopics = createAsyncThunk(
  'topics/fetchTopics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('topics/');
      return response.data.results || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch topics');
    }
  }
);

export const createTopic = createAsyncThunk(
  'topics/createTopic',
  async (topicData, { rejectWithValue }) => {
    try {
      const response = await api.post('topics/', topicData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to create topic');
    }
  }
);

export const openSession = createAsyncThunk(
  'topics/openSession',
  async ({ topicId, durationMinutes }, { rejectWithValue }) => {
    try {
      const response = await api.post(`topics/${topicId}/session/`, {
        duration_minutes: durationMinutes
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to open session');
    }
  }
);

export const checkUserVote = createAsyncThunk(
  'topics/checkUserVote',
  async (topicId, { rejectWithValue }) => {
    try {
      const response = await api.get(`votes/topics/${topicId}/check-vote/`);
      return { topicId, hasVoted: response.data.has_voted, vote: response.data.vote };
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to check user vote');
    }
  }
);

export const vote = createAsyncThunk(
  'topics/vote',
  async ({ topicId, choice }, { rejectWithValue }) => {
    try {
      const response = await api.post(`votes/topics/${topicId}/vote/`, { choice });
      return { topicId, vote: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to vote');
    }
  }
);

export const getResult = createAsyncThunk(
  'topics/getResult',
  async (topicId, { rejectWithValue }) => {
    try {
      const response = await api.get(`votes/topics/${topicId}/result/`);
      return { topicId, result: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to get result');
    }
  }
);

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearVoteResult: (state, action) => {
      const topicId = action.payload;
      if (topicId) {
        delete state.results[topicId];
      } else {
        state.results = {};
      }
    },
    clearVote: (state, action) => {
      const topicId = action.payload;
      if (topicId) {
        delete state.votes[topicId];
        delete state.userVotes[topicId];
      } else {
        state.votes = {};
        state.userVotes = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics.push(action.payload);
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(openSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(openSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions.push(action.payload);
      })
      .addCase(openSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkUserVote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserVote.fulfilled, (state, action) => {
        state.loading = false;
        const { topicId, hasVoted, vote } = action.payload;
        state.userVotes[topicId] = { hasVoted, vote };
      })
      .addCase(checkUserVote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(vote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(vote.fulfilled, (state, action) => {
        state.loading = false;
        const { topicId, vote } = action.payload;
        state.votes[topicId] = vote;
        state.userVotes[topicId] = { hasVoted: true, vote };
      })
      .addCase(vote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.loading = false;
        const { topicId, result } = action.payload;
        state.results[topicId] = result;
      })
      .addCase(getResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearVoteResult, clearVote } = topicsSlice.actions;
export default topicsSlice.reducer; 