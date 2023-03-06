// eslint-disable-next-line import/named
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put} from 'typed-redux-saga';

import {getBlogPostData as getBlogPostDataQuery} from '../../services/backend/queries/post';
import {BlogPostActions} from '../common/reducerActions';
import {handleSagaErrorGlobalAlertBased} from '../common/utils';

export function* getBlogPostData({payload: postId}: PayloadAction<string>): Generator {
  try {
    const blogPost = yield* call(getBlogPostDataQuery, postId);
    yield put(BlogPostActions.updateBlogPostData(blogPost));
  } catch (error) {
    yield put(handleSagaErrorGlobalAlertBased(error));
  }
}
