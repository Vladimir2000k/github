import {BlogPostDetailedModel} from '../../services/models';
import {RootState} from '../store';

export const selectBlogPostData = (state: RootState): BlogPostDetailedModel =>
  state.blogPost.blogPost;
