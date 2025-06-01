import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import prayerTimesRouter from './routes/prayerTimes';
import islamicCalendarRouter from './routes/islamicCalendar';
import hadithRouter from './routes/hadith';
import getiplocation from './routes/getIP';
import holidays from './routes/holidays';
// import prisma from './prismaClient'; // Import if you use prisma directly in routes

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors({
  //origin: 'http://localhost:3000' // Allow Next.js frontend
  origin: '*' // Allow Next.js frontend
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Islamic Info API Server Running');
});

app.use('/api/prayer-times', prayerTimesRouter);
app.use('/api/islamic-calendar', islamicCalendarRouter);
app.use('/api/hadith-of-the-day', hadithRouter);
app.use('/api/get-ip', getiplocation);
app.use("/api/holidays", holidays); // Mount the holidays route

/*
app.listen(port, () => {
  console.log(`🕌 Express server running at http://localhost:${port}`);
});
*/

module.exports = app;