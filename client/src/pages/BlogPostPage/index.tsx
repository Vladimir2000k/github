import React, {useEffect, useMemo} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

import Footer from '../../components/Footer';
import Header from '../../components/LandingHeader';
import LandingPagesContainer from '../../components/LandingPagesContainer';
import LandingPagesContentContainer from '../../components/LandingPagesContentContainer';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../components/uiKit/TextBlock';
import {selectBlogPostData} from '../../store/blogPost/selectors';
import {BlogPostActions} from '../../store/common/reducerActions';
import {BlogPostSagaActions} from '../../store/common/sagaActions';
import MetaData from '../BlogPage/components/MetaData';

const BlogPostPageContentContainer = styled.div`
  align-self: center;
  max-width: 706px;
  margin: 0 auto;
`;

const BlogPostPagePhoto = styled.div<{photo: string}>`
  width: 706px;
  height: 408px;
  margin-top: 53px;
  background-image: url('${(props) => props.photo}');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
`;

const BlogPostPageMetaDataContainer = styled.div`
  margin-top: 30px;
`;

const BlogPostPageHeadingText = styled(TextBlock)`
  margin-top: 20px;
  line-height: 30px;
`;

const BlogPostPageContentText = styled(TextBlock)`
  margin-top: 30px;
  margin-bottom: 53px;
  line-height: 26px;
  white-space: pre-line;
  color: ${(props) => props.theme.colors.primary};
`;

interface BlogPostPageRouteParams {
  blogPostId: string;
}

const BlogPostPage = (): JSX.Element => {
  const post = useSelector(selectBlogPostData);

  const dispatch = useDispatch();

  const {blogPostId} = useParams<BlogPostPageRouteParams>();

  useEffect(() => {
    dispatch(BlogPostSagaActions.getBlogPostData(blogPostId));
    return () => {
      dispatch(BlogPostActions.clearBlogPostPageData());
    };
  }, [dispatch, blogPostId]);

  const postContent = useMemo(() => {
    if (post === undefined) {
      return null;
    } else {
      const {title, photo, dateCreated, content, views} = post;
      return (
        <BlogPostPageContentContainer>
          <BlogPostPagePhoto photo={photo} />
          <BlogPostPageMetaDataContainer>
            <MetaData dateCreated={dateCreated} views={views} />
          </BlogPostPageMetaDataContainer>
          <BlogPostPageHeadingText type={TEXT_BLOCK_TYPE.H3}>{title}</BlogPostPageHeadingText>
          <BlogPostPageContentText type={TEXT_BLOCK_TYPE.P5}>{content}</BlogPostPageContentText>
        </BlogPostPageContentContainer>
      );
    }
  }, [post]);

  return (
    <LandingPagesContainer>
      <Header />
      <LandingPagesContentContainer>{postContent}</LandingPagesContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default BlogPostPage;
