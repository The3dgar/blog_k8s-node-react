import { Comment } from './PostList';

interface Props {
  comments: Comment[];
}

export const CommentList = ({ comments }: Props) => {
  return (
    <ul>
      {comments.map((c) => {
        let content = 'awaiting for moderation';
        if (c.status === 'approved') content = c.content;
        if (c.status === 'rejected')
          content = 'this comment has been rejected';

        return <li key={c.id}>{content}</li>;
      })}
    </ul>
  );
};
