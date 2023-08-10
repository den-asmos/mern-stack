import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import path from 'path';
import { router as authRouter } from './routes/auth.routes.js';
import { router as linksRouter } from './routes/links.routes.js';
import { router as redirectRouter } from './routes/redirect.routes.js';

const __dirname = path.resolve();
const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/links', linksRouter);
app.use('/t', redirectRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = config.get('port') || 7000;

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (error) {
    console.log('Server error', error.message);
    process.exit(1);
  }
};

start();
