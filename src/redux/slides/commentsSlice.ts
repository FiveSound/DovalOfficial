import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getRepliesCommentService,
  ReplyCommentService,
  desLikesCommentService,
  setLikesCommentService,
  getLikesCommentService,
} from '../../services/posts';

interface CommentState {
  comments: Array<any>;
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchReplies = createAsyncThunk(
  'comments/fetchReplies',
  async (commentId: number) => {
    const replies = await getRepliesCommentService(commentId);
    return replies;
  },
);

export const addReply = createAsyncThunk(
  'comments/addReply',
  async ({
    postId,
    commentId,
    comment,
  }: {
    postId: number;
    commentId: number;
    comment: string;
  }) => {
    const response = await ReplyCommentService(postId, commentId, comment);
    return response;
  },
);

export const toggleLike = createAsyncThunk(
  'comments/toggleLike',
  async ({ commentId, liked }: { commentId: number; liked: boolean }) => {
    if (liked) {
      await desLikesCommentService(commentId);
    } else {
      await setLikesCommentService(commentId);
    }
    const likes = await getLikesCommentService(commentId);
    return likes.length;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchReplies.pending, state => {
        state.loading = true;
      })
      .addCase(fetchReplies.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchReplies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch replies';
      })
      .addCase(addReply.pending, state => {
        state.loading = true;
      })
      .addCase(addReply.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload);
      })
      .addCase(addReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add reply';
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        // Update the likes count in the state
      });
  },
});

export default commentsSlice.reducer;
