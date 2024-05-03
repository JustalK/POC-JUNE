/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { Analytics as BaseAnalytics } from '@segment/analytics-node';
import { Analytics } from '@june-so/analytics-node';
import bodyParser from 'body-parser';

const writeKey = 'wpdpi6qyHu0VDkr7';
const analytics = new Analytics(writeKey);
const analyticsSegment = new BaseAnalytics({
  writeKey,
  host: 'https://api.june.so',
  path: '/sdk/batch',
});
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());

/**
 * @example
 * http://localhost:3333/identify
 * {
 *   "id": "eaz56e4az6e4ae",
 *   "email": "jk2@gmail.com",
 *   "name": "Poi"
 * }
 */
app.post('/identify', (req, res) => {
  const { id, email, name } = req.body;
  analytics.identify({
    userId: id,
    traits: {
      email: email,
      name: name,
    },
  });
  res.send({ message: `User identified! ID: ${id} | name: ${name}` });
});

app.post('/segment/identify', (req, res) => {
  const { id, email, name } = req.body;
  analyticsSegment.identify({
    userId: id,
    traits: {
      email: email,
      name: name,
    },
  });
  res.send({
    message: `User identified by Segment! ID: ${id} | name: ${name}`,
  });
});

/**
 * @example
 * http://localhost:3333/track
 * {
 *   "id": "eaz56e4az6e4ae",
 *   "whatever": "This is just a test"
 * }
 */
app.post('/track', (req, res) => {
  const { id } = req.body;
  analytics.track({
    userId: id,
    event: 'TrackAPI',
    properties: req.body,
  });
  res.send({ message: 'API tracked!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
