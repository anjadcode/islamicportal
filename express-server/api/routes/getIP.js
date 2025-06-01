"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const EXPRESS_API_URL = process.env.NEXT_PUBLIC_EXPRESS_API_URL || "http://localhost:3001";
router.get("/", async (req, res) => {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const ip = await response.json();
        //res.status(200).json({ ip });
        const responseb = await fetch(`http://ip-api.com/json/${ip.ip}`);
        const locationdata = await responseb.json();
        res.status(200).json(locationdata);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: "Failed to retrieve IP address", details: message });
    }
});
exports.default = router;
