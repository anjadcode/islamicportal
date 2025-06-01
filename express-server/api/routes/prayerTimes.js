"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//const CITY = 'Bogor'; const COUNTRY = 'Indonesia'; 
const METHOD = 2;
router.get('/', async (req, res) => {
    try {
        const today = new Date();
        const dateString = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
        // Extract city and country from query parameters
        const CITY = req.query.city;
        const COUNTRY = req.query.country;
        // Validate inputs
        if (!CITY || !COUNTRY) {
            return res.status(400).json({ error: "City and country parameters are required" });
        }
        const apiResponse = await fetch(`http://api.aladhan.com/v1/timingsByCity/${dateString}?city=${CITY}&country=${COUNTRY}&method=${METHOD}`);
        //const apiResponse = await fetch(`http://api.aladhan.com/v1/timingsByCity/<span class="math-inline">\{dateString\}?city\=</span>{CITY}&country=<span class="math-inline">\{COUNTRY\}&method\=</span>{METHOD}`);
        if (!apiResponse.ok)
            throw new Error(`Aladhan API Error: ${apiResponse.status}`);
        const data = await apiResponse.json();
        if (data.code === 200 && data.data?.timings) {
            res.json(data.data.timings);
        }
        else {
            throw new Error('Prayer times data not found in Aladhan response');
        }
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error fetching prayer times:', message);
        res.status(500).json({ error: 'Failed to fetch prayer times', details: message });
    }
});
exports.default = router;
