import {BlogPostModel} from '../../services/models';
import {RootState} from '../store';

export const selectBlogPosts = (state: RootState): Array<BlogPostModel> => state.blog.posts;
