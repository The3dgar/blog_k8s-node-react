/**
 * This is only a minimal backend to get started.
 * This is about presentation logic only
 */

import express from 'express';
import cors from 'cors';
import axios from 'axios';

const EVENT_BUS_SERVICE =
  process.env.EVENT_BUS_SERVICE || 'http://localhost:4005';

const app = express();
app.use(cors());
app.use(express.json());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({
      id,
      content,
      status,
    });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const { comments } = posts[postId];
    const comment = comments.find((c) => c.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Received event from event bus', type);
  handleEvent(type, data);

  res.sendStatus(200);
});

const port = process.env.port || 4002;

const server = app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}`);
  try {
    const { data } = await axios.get(`${EVENT_BUS_SERVICE}/events`);

    for (let event of data) {
      console.log('Processing event:', event.type);
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
server.on('error', console.error);
