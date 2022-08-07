import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../config';

export const CommentCreate = ({ postId }: any) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (!content.length) return;
    const COMMENT_URL = `${API_URL}/posts/${postId}/comments`;
    await axios.post(COMMENT_URL, {
      content,
    });

    setContent('');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New comment</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        <button className="btn btn-primary">submit</button>
      </form>
    </div>
  );
};
