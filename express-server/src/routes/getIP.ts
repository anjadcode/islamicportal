import { Router, Request, Response } from "express";


export interface LocationData {
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
    query: string;
}


const router = Router();

const EXPRESS_API_URL =
    process.env.NEXT_PUBLIC_EXPRESS_API_URL || "http://localhost:3001";

router.get("/", async (req: Request, res: Response) => {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const ip = await response.json();

        //res.status(200).json({ ip });

        const responseb = await fetch(`http://ip-api.com/json/${ip.ip}`);
        const locationdata: LocationData = await responseb.json();
        res.status(200).json(locationdata);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: "Failed to retrieve IP address", details: message });
    }
});

export default router;
