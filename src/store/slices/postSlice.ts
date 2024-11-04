import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getPostInfo,
  savePost,
  deletePost,
  generatePostDescription,
  generatePostImg,
  generatePostFull,
} from "@/app/api/routes";
import { PostInterface } from "@/app/utils/types";
import { RootState } from "..";

interface PostState {
  post: PostInterface | null;
  currentPost: PostInterface | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isTitleEditing: boolean;
  isLoading: {
    fetchPostInfo: boolean;
    savePostData: boolean;
    deletePostData: boolean;
    generatePostDescriptionData: boolean;
    generatePostImgData: boolean;
    generatePostData: boolean;
  };
  isError: {
    fetchPostInfo: boolean;
    savePostData: boolean;
    deletePostData: boolean;
    generatePostDescriptionData: boolean;
    generatePostImgData: boolean;
    generatePostData: boolean;
  };
}

// Получение инфы о конкретном посте
export const fetchPostInfo = createAsyncThunk<PostInterface, string>(
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

export const generatePostDescriptionData = createAsyncThunk(
  "post/generatePostDescriptionData",
  async (
    { text, category }: { text: string; category: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await generatePostDescription(text, category);
      return res;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const generatePostImgData = createAsyncThunk(
  "post/generatePostImgData",
  async (
    { text, category }: { text: string; category: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await generatePostImg(text, category);
      return res;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const generatePostData = createAsyncThunk(
  "post/generatePostData",
  async (category: string, { rejectWithValue }) => {
    try {
      const res = await generatePostFull(category);
      return res;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const initialState: PostState = {
  post: null,
  currentPost: null,
  status: "idle",
  error: null,
  isTitleEditing: false,
  isLoading: {
    fetchPostInfo: false,
    savePostData: false,
    deletePostData: false,
    generatePostDescriptionData: false,
    generatePostImgData: false,
    generatePostData: false,
  },
  isError: {
    fetchPostInfo: false,
    savePostData: false,
    deletePostData: false,
    generatePostDescriptionData: false,
    generatePostImgData: false,
    generatePostData: false,
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateCurrentPost: (state, action: PayloadAction<PostInterface | null>) => {
      state.currentPost = action.payload;
    },
    updateCurrentPostDescription: (state, action: PayloadAction<string>) => {
      if (state.currentPost) {
        state.currentPost.description = action.payload;
      }
    },
    updateCurrentPostImg: (state, action: PayloadAction<string>) => {
      if (state.currentPost) {
        state.currentPost.img = action.payload;
      }
    },
    updateCurrentPostStatus: (state, action: PayloadAction<string>) => {
      if (state.currentPost) {
        state.currentPost.status = action.payload;
      }
    },
    updateTitleEditing: (state) => {
      state.isTitleEditing = !state.isTitleEditing;
    },
    updateCurrentPostTitle: (state, action: PayloadAction<string>) => {
      if (state.currentPost) {
        state.currentPost.title = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.isLoading.fetchPostInfo = true;
        state.isError.fetchPostInfo = false;
      })
      .addCase(
        fetchPostInfo.fulfilled,
        (state, action: PayloadAction<PostInterface>) => {
          state.status = "succeeded";
          state.post = action.payload;
          state.isLoading.fetchPostInfo = false;
          state.currentPost = action.payload;
        }
      )
      .addCase(fetchPostInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.isLoading.fetchPostInfo = false;
        state.isError.fetchPostInfo = true;
      })
      .addCase(savePostData.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.isLoading.savePostData = true;
        state.isError.savePostData = false;
      })
      .addCase(
        savePostData.fulfilled,
        (state, action: PayloadAction<PostInterface>) => {
          state.status = "succeeded";
          state.post = action.payload;
          state.isLoading.savePostData = false;
        }
      )
      .addCase(savePostData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.isLoading.savePostData = false;
        state.isError.savePostData = true;
      })
      .addCase(deletePostData.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.isLoading.deletePostData = true;
        state.isError.deletePostData = false;
      })
      .addCase(deletePostData.fulfilled, (state) => {
        state.status = "succeeded";
        state.post = null;
        state.isLoading.deletePostData = false;
      })
      .addCase(deletePostData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.isLoading.deletePostData = false;
        state.isError.deletePostData = true;
      })
      .addCase(generatePostDescriptionData.pending, (state) => {
        state.isLoading.generatePostDescriptionData = true;
        state.isError.generatePostDescriptionData = false;
      })
      .addCase(generatePostDescriptionData.fulfilled, (state) => {
        state.isLoading.generatePostDescriptionData = false;
      })
      .addCase(generatePostDescriptionData.rejected, (state) => {
        state.isLoading.generatePostDescriptionData = false;
        state.isError.generatePostDescriptionData = true;
      })
      .addCase(generatePostImgData.pending, (state) => {
        state.isLoading.generatePostImgData = true;
        state.isError.generatePostImgData = false;
      })
      .addCase(generatePostImgData.fulfilled, (state) => {
        state.isLoading.generatePostImgData = false;
      })
      .addCase(generatePostImgData.rejected, (state) => {
        state.isLoading.generatePostImgData = false;
        state.isError.generatePostImgData = true;
      })
      .addCase(generatePostData.pending, (state) => {
        state.isLoading.generatePostData = true;
        state.isError.generatePostData = false;
      })
      .addCase(generatePostData.fulfilled, (state) => {
        state.isLoading.generatePostData = false;
      })
      .addCase(generatePostData.rejected, (state) => {
        state.isLoading.generatePostData = false;
        state.isError.generatePostData = true;
      });
  },
});

export const selectCurrentPost = (state: RootState) => state.posts.currentPost;
export const selectTitleEditing = (state: RootState) =>
  state.posts.isTitleEditing;
export const selectIsLoading = (state: RootState) => state.posts.isLoading;

export const {
  updateCurrentPost,
  updateCurrentPostDescription,
  updateCurrentPostImg,
  updateCurrentPostStatus,
  updateTitleEditing,
  updateCurrentPostTitle,
} = postSlice.actions;

export default postSlice.reducer;
