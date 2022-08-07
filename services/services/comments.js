import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const commentsByPostId = {};

const EVENT_BUS_SERVICE =
  process.env.EVENT_BUS_SERVICE || 'http://localhost:4005';

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  const newComment = { id, content, status: 'pending' };
  comments.push(newComment);

  commentsByPostId[req.params.id] = comments;

  console.log('Sending event to event bus');
  await axios
    .post(`${EVENT_BUS_SERVICE}/events`, {
      type: 'CommentCreated',
      data: {
        ...newComment,
        postId: req.params.id,
      },
    })
    .catch((e) => console.log(e.message));
    
  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Received event from event bus', type);

  if (type === 'CommentModerated') {
    const { id, status, postId } = data;
    const comment = commentsByPostId[postId].find((c) => c.id === id);
    comment.status = status;

    await axios.post(`${EVENT_BUS_SERVICE}/events`, {
      type: 'CommentUpdated',
      data: {
        ...comment,
        postId,
      },
    });
  }

  res.sendStatus(200);
});

const port = process.env.port || 4001;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
