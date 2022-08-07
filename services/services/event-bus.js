/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const POST_SERVICE = process.env.POST_SERVICE || 'http://localhost:4000';
const COMMENTS_SERVICE =
  process.env.COMMENTS_SERVICE || 'http://localhost:4001';
const QUERY_SERVICE = process.env.QUERY_URL || 'http://localhost:4002';
const MODERATIONS_SERVICE =
  process.env.MODERATIONS_SERVICE || 'http://localhost:4003';

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios
    .post(`${POST_SERVICE}/events`, event)
    .catch((e) => console.log(e.message));
  axios
    .post(`${COMMENTS_SERVICE}/events`, event)
    .catch((e) => console.log(e.message));
  axios
    .post(`${QUERY_SERVICE}/events`, event)
    .catch((e) => console.log(e.message));
  axios
    .post(`${MODERATIONS_SERVICE}/events`, event)
    .catch((e) => console.log(e.message));

  res.sendStatus(200);
});

app.get('/events', (_, res) => {
  res.send(events);
});

const port = process.env.port || 4005;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
