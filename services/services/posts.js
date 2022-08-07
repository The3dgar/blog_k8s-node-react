/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());
const EVENT_BUS_SERVICE =
  process.env.EVENT_BUS_SERVICE || 'http://localhost:4005';

const posts = {};

app.get('/api', (_, res) => {
  res.send({ message: 'Welcome to post!' });
});

app.get('/post', (req, res) => {
  res.send(posts);
});

app.post('/post/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  posts[id] = {
    id,
    title: req.body.title,
  };
  console.log('Sending event to event bus');
  await axios
    .post(`${EVENT_BUS_SERVICE}/events`, {
      type: 'PostCreated',
      data: posts[id],
    })
    .catch((e) => console.log(e.message));

  res.status(201).send(posts[id]);
});

app.post('/events', async (req, res) => {
  console.log('Received event from event bus', req.body.type);

  res.sendStatus(200);
});

app.use((req, res)=> {
  console.log("404 -", req.url);
  res.sendStatus(404);
})

const port = process.env.port || 4000;

const server = app.listen(port, () => {
  console.log("update version... v2.0.0");
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
