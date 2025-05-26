import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        // Fetch JSON data from an external API
        const apiResponse = await fetch("https://api.aladhan.com/v1/specialDays"); // Replace with actual API URL
        if (!apiResponse.ok) throw new Error(`API Error: ${apiResponse.status}`);

        const data = await apiResponse.json();

        // Return the fetched JSON data to the client
        res.status(200).json(data);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: "Failed to fetch holiday data", details: message });
    }
});

export default router;
