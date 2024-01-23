import express from 'express';
import routes from './routes.js';

const PORT = 3000;

class App {
  constructor() {
    this.app = express();
    this.app.use((req, res, next) => {
      const allowedOrigins = [
        'http://localhost:8080',
        'http://localhost:3001',
        'http://127.0.0.1:5500',
      ];
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
      res.header(
        'Access-Control-Allow-Methods',
        'POST, GET, PUT, PATCH, OPTIONS, DELETE',
      );
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Acces-Control-Allow-Credentials', true);
      next();
    });
    this.app.use(express.urlencoded({ extended: true, limit: '3mb' }));

    this.middlewares();
    this.routes();
    // this.app.use(errorHandler);
  }

  middlewares() {
    this.app.use(express.json({ limit: '3mb'}));
  }

  routes() {
    this.app.use(routes);
  }
}

const app = new App().app;

app.listen(PORT || 9001, () => console.log(`Listening on port ${PORT}`));

