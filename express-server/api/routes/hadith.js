"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const apiResponse = await fetch('https://random-hadith-generator.vercel.app/bukhari/');
        if (!apiResponse.ok)
            throw new Error(`Hadith API Error: ${apiResponse.status}`);
        const data = await apiResponse.json();
        if (data && data.data) {
            res.json(data.data);
        }
        else {
            throw new Error('Hadith data not found in API response');
        }
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: 'Failed to fetch Hadith', details: message });
    }
});
exports.default = router;
