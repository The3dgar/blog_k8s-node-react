import { useEffect, useState } from 'react';
import axios from 'axios';
import { CommentCreate } from './CommentCreate';
import { CommentList } from './CommentList';
import { API_URL } from '../config';

const QUERY_SERVICE = `${API_URL}/posts`;

// Generated by https://quicktype.io

export interface PostQueryInterface {
  id: string;
  title: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  status: 'approved' | 'rejected' | 'pending'
}

export const PostList = () => {
  const [posts, setPosts] = useState<{ [x: string]: PostQueryInterface }>({});

  const fetchPosts = async () => {
    const res = await axios.get(QUERY_SERVICE);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!Object.keys(posts).length)
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  const renderedPosts = Object.values(posts);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts.map((post) => (
        <div
          key={post.id}
          className="card"
          style={{
            width: '30%',
            marginBottom: '20px',
          }}
        >
          <div className="card-body">
            <h3>{post.title}</h3>
            <CommentList  comments={post.comments} />
            <CommentCreate postId={post.id} />
          </div>
        </div>
      ))}
    </div>
  );
};
