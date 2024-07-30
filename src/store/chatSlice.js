import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addReply: (state, action) => {
      const { messageId, reply } = action.payload;
      const message = state.messages.find(m => m.id === messageId);
      if (message) {
        message.replies = message.replies || [];
        message.replies.push(reply);
      }
    },
  },
});

export const { addMessage, addReply } = chatSlice.actions;
export default chatSlice.reducer;