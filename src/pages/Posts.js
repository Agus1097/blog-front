import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from '../components/post/Post';
import NotPost from '../components/utils/NotPost';
import Placeholder from '../components/utils/Placeholder';
import { PUBLIC_POSTS_ENDPOINT } from '../helpers/endpoints';
import '../styles/Jumbotron.css';

export default function Posts() {

  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios.get(PUBLIC_POSTS_ENDPOINT)
      .then(response => {
        setPosts(response.data);
        setFetching(false);
      }).catch(error => {
        setFetching(false);
      })
  }, []);

  return (
    <div>
      <h1 className="jumbotron">Ultimos posts públicos</h1>
      {fetching && <Placeholder></Placeholder>}
      {!fetching && posts.length === 0 && <NotPost text="No hay posts públicos disponibles"></NotPost>}
      <div>
        {posts.map(post => <Post key={post.post_id} post={post} renderControls={false}></Post>)}
      </div>
    </div>
  )
}
