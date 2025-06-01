"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const prayerTimes_1 = __importDefault(require("./routes/prayerTimes"));
const islamicCalendar_1 = __importDefault(require("./routes/islamicCalendar"));
const hadith_1 = __importDefault(require("./routes/hadith"));
const getIP_1 = __importDefault(require("./routes/getIP"));
const holidays_1 = __importDefault(require("./routes/holidays"));
// import prisma from './prismaClient'; // Import if you use prisma directly in routes
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)({
    //origin: 'http://localhost:3000' // Allow Next.js frontend
    origin: '*' // Allow Next.js frontend
}));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Islamic Info API Server Running');
});
app.use('/api/prayer-times', prayerTimes_1.default);
app.use('/api/islamic-calendar', islamicCalendar_1.default);
app.use('/api/hadith-of-the-day', hadith_1.default);
app.use('/api/get-ip', getIP_1.default);
app.use("/api/holidays", holidays_1.default); // Mount the holidays route
/*
app.listen(port, () => {
  console.log(`🕌 Express server running at http://localhost:${port}`);
});
*/
module.exports = app;
