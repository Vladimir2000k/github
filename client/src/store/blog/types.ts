import {BlogPostModel} from '../../services/models';

export enum BLOG_EVENTS {
  ERROR = 'ERROR',
}

export type BlogPosts = Array<BlogPostModel>;
