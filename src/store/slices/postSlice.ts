import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getPostInfo, savePost, deletePost } from "@/app/api/routes";
import { PostInterface } from "@/app/utils/types";

interface PostState {
  post: PostInterface | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Получение инфы о конкретном посте
export const fetchPostInfo = createAsyncThunk(
  "post/fetchPostInfo",
  async (hash: string, { rejectWithValue }) => {
    try {
      const res = await getPostInfo(hash);
      return res;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

// Сохранение поста в датабазу
export const savePostData = createAsyncThunk(
  "post/savePostData",
  async (post: PostInterface, { rejectWithValue }) => {
    try {
      const res = await savePost(post);
      return res;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

// Удаление поста из датабазы
export const deletePostData = createAsyncThunk(
  "delete/deletePostData",
  async (hash: string, { rejectWithValue }) => {
    try {
      const res = await deletePost(hash);
      return res;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const initialState: PostState = {
  post: null,
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchPostInfo.fulfilled,
        (state, action: PayloadAction<PostInterface>) => {
          state.status = "succeeded";
          state.post = action.payload;
        }
      )
      .addCase(fetchPostInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(savePostData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        savePostData.fulfilled,
        (state, action: PayloadAction<PostInterface>) => {
          state.status = "succeeded";
          state.post = action.payload;
        }
      )
      .addCase(savePostData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(deletePostData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deletePostData.fulfilled, (state) => {
        state.status = "succeeded";
        state.post = null;
      })
      .addCase(deletePostData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;
