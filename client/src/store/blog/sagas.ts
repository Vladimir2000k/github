import {call, put} from 'typed-redux-saga';

import {getBlogPosts as getBlogPostsQuery} from '../../services/backend/queries/blog';
import {BlogActions} from '../common/reducerActions';
import {handleSagaErrorGlobalAlertBased} from '../common/utils';

export function* getBlogPosts(): Generator {
  try {
    const posts = yield* call(getBlogPostsQuery);
    yield put(BlogActions.updateBlogPosts(posts));
  } catch (error) {
    yield put(handleSagaErrorGlobalAlertBased(error));
  }
}
