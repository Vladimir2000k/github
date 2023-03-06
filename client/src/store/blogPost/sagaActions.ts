import {createAction} from '@reduxjs/toolkit';

export const getBlogPostData = createAction<string>('saga/blogPost/getBlogPostData');
