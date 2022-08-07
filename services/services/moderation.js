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

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Received event from event bus', type);
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post(`${EVENT_BUS_SERVICE}/events`, {
      type: 'CommentModerated',
      data: {
        ...data,
        status,
      },
    }).catch((e) => console.log(e.message));
  }

  res.sendStatus(200);
});

const port = process.env.port || 4003;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
