import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserPosts } from '../actions/postAction';
import Post from '../components/post/Post';
import NotPost from '../components/utils/NotPost';
import Placeholder from '../components/utils/Placeholder';
import '../styles/Jumbotron.css';

export default function UserPosts() {

  const [fetching, setFetching] = useState(false);
  const fetched = useSelector(state => state.auth.posts.fetched);
  const posts = useSelector(state => state.auth.posts.post);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchedPosts() {
      if (!fetched) {
        try {
          setFetching(true);
          await dispatch(getUserPosts());
          setFetching(false);
        } catch (error) {
          toast.error(error.response.data, { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
        }
      }
    }
    fetchedPosts();
  }, [dispatch, fetched]);

  return (
    <div>
      <h1 class="jumbotron">Mis Posts</h1>
      {console.log(fetching)}
      {fetching && <Placeholder></Placeholder>}
      {!fetching && posts.length === 0 && <NotPost text="No hay posts creado por usted"></NotPost>}
      <div>
        {posts.map(post => <Post key={post.post_id} post={post} renderControls={true}></Post>)}
      </div>
    </div>
  )
}
