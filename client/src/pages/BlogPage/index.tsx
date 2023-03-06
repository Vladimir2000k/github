import React, {useCallback, useEffect, useMemo} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import Footer from '../../components/Footer';
import Header from '../../components/LandingHeader';
import LandingPagesContainer from '../../components/LandingPagesContainer';
import LandingPagesContentContainer from '../../components/LandingPagesContentContainer';
import TextBlock, {TEXT_BLOCK_TYPE} from '../../components/uiKit/TextBlock';
import {selectBlogPosts} from '../../store/blog/selectors';
import {BlogActions} from '../../store/common/reducerActions';
import {BlogSagaActions} from '../../store/common/sagaActions';

import HugePost from './components/HugePost';
import SmallPost from './components/SmallPost';

const HeadingText = styled(TextBlock)`
  margin-top: 53px;
  line-height: 40px;
  text-align: center;
`;

const BlogContentContainer = styled.div`
  margin-top: 60px;
  margin-bottom: 53px;
`;

const BlogPostsGridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-row-gap: 40px;
  grid-column-gap: 30px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 40px;
`;

const BlogPage = (): JSX.Element => {
  const posts = useSelector(selectBlogPosts);

  const dispatch = useDispatch();

  const history = useHistory();

  const {t} = useTranslation();

  useEffect(() => {
    dispatch(BlogSagaActions.getBlogPosts());
    return () => {
      BlogActions.clearBlogPageData();
    };
  }, [dispatch]);

  const handleContinueReadingButtonClick = useCallback(
    (postId: number) => {
      history.push(`/blog/${postId}`);
    },
    [history],
  );

  const {hugePost, restPosts} = useMemo(() => {
    const restPosts = [];

    switch (posts.length) {
      case 0:
        return {
          hugePost: null,
          restPosts: null,
        };
      case 1:
        return {
          hugePost: Object.assign({}, posts[0]),
          restPosts: null,
        };
      default:
        Object.assign(restPosts, posts);
        restPosts.splice(0, 1);
        return {
          hugePost: Object.assign({}, posts[0]),
          restPosts,
        };
    }
  }, [posts]);

  return (
    <LandingPagesContainer>
      <Header />
      <LandingPagesContentContainer>
        <HeadingText type={TEXT_BLOCK_TYPE.H1}>{t('blog.pageHeadingText')}</HeadingText>
        <BlogContentContainer>
          {hugePost !== null && (
            <HugePost
              id={hugePost.id}
              key={hugePost.id}
              title={hugePost.title}
              summary={hugePost.summary}
              photo={hugePost.photo}
              views={hugePost.views}
              dateCreated={hugePost.dateCreated}
              handleContinueReadingButtonClick={() => handleContinueReadingButtonClick(hugePost.id)}
            />
          )}
          <BlogPostsGridContainer>
            {restPosts?.length > 0 &&
              restPosts.map(({id, title, summary, photo, views, dateCreated}) => (
                <SmallPost
                  id={id}
                  key={id}
                  title={title}
                  summary={summary}
                  photo={photo}
                  views={views}
                  dateCreated={dateCreated}
                  handleContinueReadingButtonClick={() => handleContinueReadingButtonClick(id)}
                />
              ))}
          </BlogPostsGridContainer>
        </BlogContentContainer>
      </LandingPagesContentContainer>
      <Footer />
    </LandingPagesContainer>
  );
};

export default BlogPage;
