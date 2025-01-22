import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCallsData = createAsyncThunk(
  'refine/fetchCalls',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/calls');
      if (!response.ok) {
        throw new Error('Failed to fetch calls data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmailsData = createAsyncThunk(
  'refine/fetchEmails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/emails');
      if (!response.ok) {
        throw new Error('Failed to fetch emails data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refineSlice = createSlice({
  name: 'refine',
  initialState: {
    teritoryData: [],
    callsData: [],
    emailData: [],
    status: {
      calls: 'idle',
      emails: 'idle'
    },
    error: {
      calls: null,
      emails: null
    }
  },
  reducers: {
    setTeritoryData: (state, action) => {
      state.teritoryData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Calls data cases
      .addCase(fetchCallsData.pending, (state) => {
        state.status.calls = 'loading';
        state.error.calls = null;
      })
      .addCase(fetchCallsData.fulfilled, (state, action) => {
        state.status.calls = 'succeeded';
        state.callsData = action.payload;
        state.error.calls = null;
      })
      .addCase(fetchCallsData.rejected, (state, action) => {
        state.status.calls = 'failed';
        state.error.calls = action.payload;
      })
      // Emails data cases
      .addCase(fetchEmailsData.pending, (state) => {
        state.status.emails = 'loading';
        state.error.emails = null;
      })
      .addCase(fetchEmailsData.fulfilled, (state, action) => {
        state.status.emails = 'succeeded';
        state.emailData = action.payload;
        state.error.emails = null;
      })
      .addCase(fetchEmailsData.rejected, (state, action) => {
        state.status.emails = 'failed';
        state.error.emails = action.payload;
      });
  }
});

export const { setTeritoryData } = refineSlice.actions;
export default refineSlice.reducer;