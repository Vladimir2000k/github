// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {BlogPostModel} from '../../services/models';
import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../utils/events';

import {BLOG_EVENTS} from './types';

export interface BlogPageState extends EventHandlingState<BLOG_EVENTS> {
  posts: Array<BlogPostModel>;
}

const blogInitialState: BlogPageState = {
  posts: [],
  events: eventsInitialState,
};

export const BLOG_REDUCER_NAME = 'blog';

const blogSlice = createSlice({
  name: BLOG_REDUCER_NAME,
  initialState: blogInitialState,
  reducers: {
    clearBlogPageData: (state) => {
      state.posts = [];
      state.events = eventsInitialState;
    },
    updateBlogPosts: (state, action: PayloadAction<Array<BlogPostModel>>) => {
      state.posts = action.payload;
    },
    ...constructEventHandlingReducers<BLOG_EVENTS>(),
  },
});

export default blogSlice;
