import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import routes from './routes/index.js';
dotenv.config();
console.log("ENVIRONMENT ", process.env);
const app = express();
connectDB();

app.use(cors({ origin: true }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));


app.use('/api', routes);

// static uploads (dev)
// app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));