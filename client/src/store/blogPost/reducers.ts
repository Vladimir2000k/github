// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {BlogPostDetailedModel} from '../../services/models';
import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../utils/events';

import {BLOG_POST_EVENTS} from './types';

export interface BlogPostPageState extends EventHandlingState<BLOG_POST_EVENTS> {
  blogPost: BlogPostDetailedModel;
}

const blogPostInitialState: BlogPostPageState = {
  blogPost: undefined,
  events: eventsInitialState,
};

export const BLOG_POST_PAGE_REDUCER_NAME = 'blogPost';

const blogPostSlice = createSlice({
  name: BLOG_POST_PAGE_REDUCER_NAME,
  initialState: blogPostInitialState,
  reducers: {
    clearBlogPostPageData: (state) => {
      state.blogPost = undefined;
      state.events = eventsInitialState;
    },
    updateBlogPostData: (state, action: PayloadAction<BlogPostDetailedModel>) => {
      state.blogPost = action.payload;
    },
    ...constructEventHandlingReducers<BLOG_POST_EVENTS>(),
  },
});

export default blogPostSlice;
