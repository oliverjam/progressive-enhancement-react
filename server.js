const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.post('/submit', (request, response) => {
    const { body: { isAjax } } = request;
    if (isAjax === 'true') {
      return response.sendStatus(200);
    }
    return app.render(request, response, '/thanks', request.query);
  });

  server.get('*', handle);

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
